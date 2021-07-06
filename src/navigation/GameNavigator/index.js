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
  const [carouselItems, setCarouselItems] = useState([]);
  const [removedList, setRemovedList] = useState([]);
  const [propType, setPropType] = useState("all")

  const fetchItems = useCallback((propType) => {
    setIsFetching(true);
    authFetch("POST", "/api/get_properties", {
      prop_type: propType
    }).then((res) => {
        const list = res.matched;
        const filteredList = list.filter(item => !removedList.includes(item._id));
        setCarouselItems(filteredList);
      }
    ).catch(() => {
      console.log('fetch failed');
    }).finally(() => {
      setIsFetching(false);
    });
  },[])

  useEffect(() => {
    setIsFetching(true);
    const filteredList = carouselItems.filter(item => !removedList.includes(item._id));
    setCarouselItems(filteredList);
    setIsFetching(false);
  }, [removedList]);

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    if (carouselItems.length === 0) {
      fetchItems();
    }
  }, [carouselItems]);

  const houseContext = useMemo(() => ({
    isFetching,
    carouselItems,
    fetchItems,
    setPropType,
    removedList,
    setRemovedList,
  }), [isFetching, carouselItems, fetchItems, setPropType, removedList, setRemovedList]);

  return (
    <HouseContext.Provider value={houseContext}>
      <GameStack.Navigator
        screenOptions={{
          headerTitle: () => <Logo />,
          headerTitleAlign: "center",
          headerLeft: ()=> null
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
