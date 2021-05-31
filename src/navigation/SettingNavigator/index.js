import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AppStyles from "../../AppStyles";
import Notification from "../../screens/Notification";
import SettingList from "../../screens/SettingList";
import Profile from "../../screens/Profile";
import Interest from "../../screens/Interest";

const SettingStack = createStackNavigator();

const SettingStackScreen = () => (
  <SettingStack.Navigator
    initialRouteName="SettingList"
    screenOptions={{
      headerTitle: () => (
        <MaterialCommunityIcons
          name="home"
          color={AppStyles.color.steedGreen}
          size={30}
        />
      ),
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
