import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AppStyles from "../../AppStyles";
import GameStackScreen from "../../navigation/GameNavigator";
import ProfileStackScreen from "../../navigation/ProfileNavigator";

const Tabs = createBottomTabNavigator();
const TabsScreen = () => (
  <Tabs.Navigator
    tabBarOptions={{ 
      showLabel: false, 
      inactiveTintColor: AppStyles.color.steedWhte,
      activeTintColor: AppStyles.color.steedGreen,
      inactiveBackgroundColor: AppStyles.color.steedBlue,
      activeBackgroundColor: AppStyles.color.steedDarkBlue,
      style: {
        backgroundColor: AppStyles.color.steedDarkBlue,
        position: 'absolute',
        borderTopWidth: 0,
      }
     }
    }
  >
    <Tabs.Screen
      name="GameStackScreen"
      component={GameStackScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="rhombus" color={color} size={size} />
        ),
      }}
    />
    <Tabs.Screen
      name="ProfileStackScreen"
      component={ProfileStackScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="account" color={color} size={size} />
        ),
      }}
    />
  </Tabs.Navigator>
);

export default TabsScreen;
