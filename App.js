import { StatusBar } from "expo-status-bar";
import React from "react";
import App from "./src/screens/App";

export default () =>  {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <App/>
    </>
  );
}
