import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Notification from "../../screens/Notification";
import SettingList from "../../screens/SettingList";
import Profile from "../../screens/Profile";
import Interest from "../../screens/Interest";
import Logo from "../../components/Logo";

const SettingStack = createStackNavigator();

const SettingStackScreen = () => (
  <SettingStack.Navigator
    initialRouteName="SettingList"
    screenOptions={{
      headerTitle: () => <Logo />,
      headerBackTitle: "Back",
      headerTitleAlign: "center",
    }}
  >
    <SettingStack.Screen name="SettingList" component={SettingList} />
    <SettingStack.Screen name="Profile" component={Profile} />
    <SettingStack.Screen name="Notification" component={Notification} />
    <SettingStack.Screen name="Interest" component={Interest} />
  </SettingStack.Navigator>
);

export default SettingStackScreen;
