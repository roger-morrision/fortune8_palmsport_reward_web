// DUCKS pattern
import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface AuthState {
  connected: boolean;
  error: any;
  message: any;
}

export const initialState: AuthState = {
  connected: false,
  error: null,
  message: {},
} as AuthState;

// Slice
export const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    socketConnected: (state) => {
      state.connected = true;
    },
    socketDisconnected: (state) => {
      state.connected = false;
    },
    socketError: (state, action) => {
      state.error = action.payload;
    },
    socketMessage: (state, action) => {
      state.message = action.payload;
    },
  },
});

// Actions
export const socketActions = {
  socketConnected: socketSlice.actions.socketConnected,
  socketDisconnected: socketSlice.actions.socketDisconnected,
  socketError: socketSlice.actions.socketError,
  socketMessage: socketSlice.actions.socketMessage,
};

// Selectors
export const selectSocketConnection = (state: RootState) => state.socket.connected;

// Reducer
export default socketSlice.reducer;
