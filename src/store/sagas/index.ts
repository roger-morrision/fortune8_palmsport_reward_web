import { all, fork } from "redux-saga/effects";
import appInitSaga from "./app.sagas";
import authWatcherSaga from "./auth.sagas";
import lobbyWatcherSaga from "./lobby.sagas";
import walletSocketWatcherSaga from "./wallet.socket.sagas";
import notificationSocketWatcherSaga from "./notification.socket.sagas";
import soundWatcherSaga from "./sound.sagas";
import idleWatcherSaga from "./idle.sagas";
import sessionWatcherSaga from "./session.sagas";
import storageWatcherSaga from "./storage.sagas";

export default function* rootSaga() {
  yield all([
    fork(appInitSaga),
    fork(authWatcherSaga),
    fork(lobbyWatcherSaga),
    fork(soundWatcherSaga),
    fork(walletSocketWatcherSaga),
    fork(notificationSocketWatcherSaga),
    fork(idleWatcherSaga),
    fork(sessionWatcherSaga),
    fork(storageWatcherSaga),
  ]);
}
