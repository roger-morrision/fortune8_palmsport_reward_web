// DUCKS pattern
import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";
import type { RootState } from "../store";

interface AuthState {
  connected: boolean;
  error: any;
  notifications: Notification[];
  unreadCount: number;
}

export const initialState: AuthState = {
  connected: false,
  error: null,
  notifications: [] as any,
  unreadCount: 0,
} as AuthState;

// Slice
export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    notificationConnected: (state) => {
      state.connected = true;
    },
    notificationDisconnected: (state) => {
      state.connected = false;
    },
    notificationError: (state, action) => {
      state.error = action.payload;
    },
    notificationMessage: (state, action) => {
      state.unreadCount = action.payload.unread;
    },
    notifications: (state, action) => {
      state.notifications = _.chain(action.payload).orderBy(["enrollmentDate"], ["desc"]).value();
    },
    readAllNotifications: (state) => {
      state.unreadCount = 0;
    },
  },
});

// Actions
export const notificationActions = {
  notificationConnected: notificationSlice.actions.notificationConnected,
  notificationDisconnected: notificationSlice.actions.notificationDisconnected,
  notificationError: notificationSlice.actions.notificationError,
  notificationMessage: notificationSlice.actions.notificationMessage,
  notifications: notificationSlice.actions.notifications,
  readAllNotifications: notificationSlice.actions.readAllNotifications,
};

// Selectors
export const selectNotificationSocketConnection = (state: RootState) =>
  state.notification.connected;
export const selectNotificationUnreadCount = (state: RootState) => state.notification.unreadCount;
export const selectNotifications = (state: RootState) => state.notification.notifications;

// Reducer
export default notificationSlice.reducer;
