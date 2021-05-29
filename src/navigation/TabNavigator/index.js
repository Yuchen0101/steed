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
      activeTintColor:AppStyles.color.steedWhite,
      style: {
        backgroundColor: AppStyles.color.steedBlue,
        position: 'absolute',
        borderTopWidth: 0,
        shadowOpacity: 0.3,
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
