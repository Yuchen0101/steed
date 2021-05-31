import React from 'react'
import { createStackNavigator } from "@react-navigation/stack";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import SignIn from "../../screens/SignIn";
import SignUp from "../../screens/SignUp";
import Hello from "../../screens/Hello";
import AppStyles from "../../AppStyles";
import { View } from 'react-native';

const AuthStack = createStackNavigator();

const AuthStackScreen = () => {
  return (
      <AuthStack.Navigator
      screenOptions={{
        headerTitle: () => (
          <MaterialCommunityIcons
            name="home"
            color={AppStyles.color.steedGreen}
            size={30}
          />
        ),
        headerBackTitle:"Back",
        headerTitleAlign: "center",
      }}
    >
      <AuthStack.Screen
        name="Hello"
        component={Hello}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen name="SignIn" component={SignIn} />
      <AuthStack.Screen name="SignUp" component={SignUp} />
    </AuthStack.Navigator>    
  );
};

export default AuthStackScreen;
