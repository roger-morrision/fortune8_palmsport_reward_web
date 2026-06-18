import { combineReducers } from "@reduxjs/toolkit";
import auth from "./slices/auth.slice";
import forgot from "./slices/forgot.slice";
import games from "./slices/games.slice";
import lobby from "./slices/lobby.slice";
import settings from "./slices/settings.slice";
import signup from "./slices/signup.slice";
import sound from "./slices/sound.slice";
import user from "./slices/user.slice";
import socket from "./slices/wallet.slice";
import notification from "./slices/notification.slice";

const reducer = combineReducers({
  auth,
  settings,
  forgot,
  signup,
  lobby,
  user,
  sound,
  games,
  socket,
  notification,
}); // ADD SLICES HERE

export default reducer;
