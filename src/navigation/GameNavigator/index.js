import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AppStyles from "../../AppStyles";
import Game from "../../screens/Game";
import GameDetail from "../../screens/GameDetail";

const GameStack = createStackNavigator();

const GameStackScreen = () => (
  <GameStack.Navigator
    screenOptions={{
      headerTitle: () => (
        <MaterialCommunityIcons
          name="home"
          color={AppStyles.color.steedGreen}
          size="30px"
        />
      ),
      headerTitleAlign: "center",
      headerTransparent: true,
      headerTintColor: AppStyles.color.steedGreen,
    }}
  >
    <GameStack.Screen name="Game" component={Game} />
    <GameStack.Screen name="GameDetail" component={GameDetail} />
  </GameStack.Navigator>
);

export default GameStackScreen;
