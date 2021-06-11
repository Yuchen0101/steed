import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Logo from "../../components/Logo";
import Dashboard from "../../screens/Dashboard";

const DashboardStack = createStackNavigator();

const DashboardStackScreen = ({ navigation }) => {
  return (
    <DashboardStack.Navigator
      screenOptions={{
        headerTitle: () => <Logo />,
        headerTitleAlign: "center"
      }}
    >
      <DashboardStack.Screen name="Profile" component={Dashboard} />
    </DashboardStack.Navigator>
  );
}

export default DashboardStackScreen;
