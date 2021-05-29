import React from "react";
import Amplify, { Auth } from "aws-amplify";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AuthStackScreen from "../../navigation/AuthNavigator";
import TabsScreen from "../../navigation/TabNavigator";
import { ThemeProvider } from "react-native-elements";
import AppStyles from "../../AppStyles";

Amplify.configure({
  region: "ap-southeast-2",
  userPoolId: "ap-southeast-2_sXiWBvAxg",
  userPoolWebClientId: "3rc1perp9ida931u347nt1tjcu",
});

const RootStack = createStackNavigator();
const RootStackScreen = () => (
  <RootStack.Navigator headerMode="none">
    <RootStack.Screen name="AuthStackScreen" component={AuthStackScreen} />
    <RootStack.Screen name="TabsScreen" component={TabsScreen} />
  </RootStack.Navigator>
);

const theme = {
  Input: {
    inputStyle: { color: "white" },
  },
  Button: {
    titleStyle: {
      color: AppStyles.color.steedGreen,
    },
    buttonStyle: {
      borderColor: AppStyles.color.steedGreen
    },
  },
};

export default () => {
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <RootStackScreen />
      </NavigationContainer>
    </ThemeProvider>
  );
};
