import { StatusBar } from "expo-status-bar";
import App from "./src/screens/App";
import * as Notifications from "expo-notifications";
import React from "react";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default () => {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <App />
    </>
  );
};
