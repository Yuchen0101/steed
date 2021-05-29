import React from "react";
import { Button, Text } from "react-native";
import ScreenContainer from "../../components/ScreenContainer";

export default ({ navigation }) => (
  <ScreenContainer>
    <Button title="Login" onPress={() => navigation.push("SignIn")}/>
    <Button title="Don't have an account? Sign Up" onPress={() => navigation.push("SignUp")}/>
  </ScreenContainer>
);
