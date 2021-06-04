import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SignIn from "../../screens/SignIn";
import SignUp from "../../screens/SignUp";
import Hello from "../../screens/Hello";
import Logo from "../../components/Logo";
import ForgetPassword from "../../screens/ForgetPassword";


const AuthStack = createStackNavigator();

const AuthStackScreen = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerTitle: () => <Logo />,
        headerBackTitle: "Back",
        headerTitleAlign: "center"
      }}
    >
      <AuthStack.Screen
        name="Hello"
        component={Hello}
      />
      <AuthStack.Screen name="SignIn" component={SignIn} />
      <AuthStack.Screen name="SignUp" component={SignUp} />
      <AuthStack.Screen name="ForgetPassword" component={ForgetPassword} />
    </AuthStack.Navigator>
  );
};

export default AuthStackScreen;
