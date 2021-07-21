import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Logo from "../../components/Logo";
import Interest from "../../screens/Interest";

const InterestStack = createStackNavigator();

const InterestStackScreen = ({ navigation }) => {
  return (
    <InterestStack.Navigator
      screenOptions={{
        headerTitle: () => <Logo />,
        headerTitleAlign: "center"
      }}
    >
      <InterestStack.Screen name="Interest" component={Interest} />
    </InterestStack.Navigator>
  );
}

export default InterestStackScreen;
