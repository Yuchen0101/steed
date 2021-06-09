import React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AppStyles from "../../AppStyles";
import GameStackScreen from "../../navigation/GameNavigator";
import DashboardStackScreen from "../DashboardNavigator";
import SettingStackScreen from "../SettingNavigator";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

const Tabs = createMaterialBottomTabNavigator();
const TabsScreen = ({user}) => {
  return (
    <Tabs.Navigator
      shifting={true}
      labelStyle={{ fontSize: 12 }}
      activeColor={AppStyles.color.steedWhite}
      barStyle={{
        backgroundColor: AppStyles.color.steedBlue,
        position: "absolute",
        borderTopWidth: 0,
        shadowOpacity: 0.3,
        height:60
      }}
      initialRouteName="GameStackScreen"
    >
      <Tabs.Screen
        name="GameStackScreen"
        component={GameStackScreen}
        options={{
          tabBarLabel: "Game",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="rhombus" color={color} size={26} />
          ),
        }}
      />
      <Tabs.Screen
        name="DashboardStackScreen"
        component={DashboardStackScreen}
        options={{
          tabBarLabel: "Dashboard",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="poll" color={color} size={26} />
          ),
        }}
      />
      <Tabs.Screen
        name="SettingStackScreen"
        component={SettingStackScreen}
        options={{
          tabBarLabel: "Setting",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="cog" color={color} size={26} />
          ),
        }}
      />
    </Tabs.Navigator>
  );
};

export default TabsScreen;
