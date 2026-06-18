import { API_WEBSOCKET_URL } from "@/src/constants/Config";
import { eventChannel, EventChannel } from "@redux-saga/core";
import { call, cancel, fork, put, select, take } from "redux-saga/effects";
import { Socket } from "socket.io-client";

// Slice
import { sleep } from "@/src/common/utils/validation-helper";
import { authActions, selectAuthLoggedIn, selectedAuthToken } from "../slices/auth.slice";
import { lobbyActions } from "../slices/lobby.slice";
import { notificationActions } from "../slices/notification.slice";

// Define Action Type
interface SocketEventAction {
  type: string;
  payload?: any;
  error?: string;
}

// WebSocket connection function
function connectSocket(sessionToken: any): WebSocket {
  const ws = new WebSocket(
    `${API_WEBSOCKET_URL}/ws/notifications?accessToken=${sessionToken}&app=REWARD`,
  );

  return ws;
}

// Create event channel with proper typing
function createSocketChannel(ws: any): EventChannel<SocketEventAction> {
  return eventChannel((emit) => {
    // Handle connection open
    ws.onopen = () => {
      emit({ type: "notification/notificationConnected" });
    };

    // Handle messages
    ws.onmessage = (event: any) => {
      emit({ type: "notification/notificationMessage", payload: JSON.parse(event.data) });
    };

    // Handle errors
    ws.onerror = (error: any) => {
      console.error("WebSocket Error:", error);
      emit({ type: "notification/notificationError", payload: error });
    };

    // Handle connection close
    ws.onclose = (event: any) => {
      console.log("WebSocket Disconnected", event.reason);
      emit({ type: "notification/notificationDisconnected" });
    };

    return () => {
      ws.close();
    };
  });
}

// WebSocket saga with proper typing
function* handleWebSocketConnection(): Generator<any, void, SocketEventAction> {
  const isLoggedIn = yield select(selectAuthLoggedIn);
  const sessionToken = yield select(selectedAuthToken);

  if (!isLoggedIn || !sessionToken) return;

  let retryCount = 0;
  let socket: Socket | any;
  let socketChannel: any | null = null;

  while (retryCount < 5) {
    try {
      socket = yield call(connectSocket, sessionToken);
      socketChannel = yield call(createSocketChannel, socket);
      while (true) {
        const action: SocketEventAction = yield take(socketChannel); // 🔥 Fix: TypeScript now recognizes action type
        yield put(action);
      }
    } catch (error) {
      yield put(notificationActions.notificationError(error));

      // Exponential backoff for reconnection
      const delayTime = Math.min(2 ** retryCount * 1000, 30000);
      yield call(sleep, delayTime);

      retryCount += 1;
    } finally {
      if (socketChannel) {
        socketChannel.close();
      }
    }
  }

  yield put(notificationActions.notificationDisconnected());
}

// Saga to watch for token updates and user login/logout
function* watchAuthState(): Generator<any, void, any> {
  let socketTask: any;

  while (true) {
    yield take([
      authActions.refreshToken.type,
      lobbyActions.lobbyRequest.type,
      authActions.logout.type,
    ]);

    if (socketTask) {
      yield cancel(socketTask);
    }

    const isLoggedIn = yield select(selectAuthLoggedIn);
    const sessionToken = yield select(selectedAuthToken);

    if (isLoggedIn && sessionToken) {
      socketTask = yield fork(handleWebSocketConnection);
    }
  }
}

export default watchAuthState;
