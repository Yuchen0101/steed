import React from "react";
import { Button, Text } from "react-native";
import ScreenContainer from "../../components/ScreenContainer";

export default ({navigation}) => (
  <ScreenContainer>
    <Text>sign up page</Text>
    <Button title="Create Account" onPress={() => navigation.push("Notification")}/>
  </ScreenContainer>
);
