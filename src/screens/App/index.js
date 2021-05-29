import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthStackScreen from "../../navigation/AuthNavigator";
import TabsScreen from "../../navigation/TabNavigator";

export default () => (
  <NavigationContainer>
    {/* <AuthStackScreen /> */}
    <TabsScreen/>
  </NavigationContainer>
);
