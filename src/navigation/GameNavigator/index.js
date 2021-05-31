import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Logo from "../../components/Logo";
import Game from "../../screens/Game";
import GameDetail from "../../screens/GameDetail";

const GameStack = createStackNavigator();

const GameStackScreen = () => (
  <GameStack.Navigator
    screenOptions={{
      headerTitle: () => <Logo />,
      headerTitleAlign: "center",
    }}
  >
    <GameStack.Screen name="Game" component={Game} />
    <GameStack.Screen name="GameDetail" component={GameDetail} />
  </GameStack.Navigator>
);

export default GameStackScreen;
