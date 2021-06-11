import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Logo from "../../components/Logo";
import Game from "../../screens/Game";
import GameDetail from "../../screens/GameDetail";
import GameResult from '../../screens/GameResult';

import {HouseContext} from '../../screens/Game/houseContext';

const GameStack = createStackNavigator();

const GameStackScreen = () => (
  <HouseContext.Provider value={678}>
    <GameStack.Navigator
      screenOptions={{
        headerTitle: () => <Logo />,
        headerTitleAlign: "center",
      }}
    >
      <GameStack.Screen name="Game" component={Game} />
      <GameStack.Screen name="GameDetail" component={GameDetail} />
      <GameStack.Screen name="GameResult" component={GameResult} />
    </GameStack.Navigator>
  </HouseContext.Provider>
);

export default GameStackScreen;
