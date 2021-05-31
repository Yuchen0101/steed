import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AppStyles from "../../AppStyles";
import Profile from "../../screens/Profile";

const DashboardStack = createStackNavigator();

const DashboardStackScreen = () => (
  <DashboardStack.Navigator
    screenOptions={{
      headerTitle: () => (
        <MaterialCommunityIcons
          name="home"
          color={AppStyles.color.steedGreen}
          size={30}
        />
      ),
      headerTitleAlign: "center",
    }}
  >
    <DashboardStack.Screen name="Profile" component={Profile} />
  </DashboardStack.Navigator>
);

export default DashboardStackScreen;
