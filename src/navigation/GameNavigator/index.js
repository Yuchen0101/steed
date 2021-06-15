import React, { useMemo, useContext, useState, useEffect, useCallback } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Logo from "../../components/Logo";
import Game from "../../screens/Game";
import GameDetail from "../../screens/GameDetail";
import GameResult from '../../screens/GameResult';
import { AuthContext } from "../../context";
import { HouseContext } from '../../screens/Game/houseContext';
import { exampleItems } from '../../screens/Game/mockData'

const GameStack = createStackNavigator();

const GameStackScreen = () => {

  const { authFetch } = useContext(AuthContext);

  const [isFetching, setIsFetching] = useState(false);
  const [carouselItems, setCarouselItems] = useState(exampleItems);

  const fetchItems = useCallback(() => {
    setIsFetching(true);
    authFetch("GET", "/api/get_properties").then((res) => {
        console.log('12345', res.matched);
        setIsFetching(false);
        // TODO: 给每个卡片增加一个disabled属性
        setCarouselItems(res.matched);
      }
    );
  }, []);

  useEffect(() => {
    fetchItems();
  }, []);

  const houseContext = useMemo(() => ({
    isFetching,
    carouselItems,
    fetchItems
  }), [isFetching, carouselItems, fetchItems]);

  return (
    <HouseContext.Provider value={houseContext}>
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
};

export default GameStackScreen;
