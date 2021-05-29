import React, { useEffect, useState } from 'react'
import { createStackNavigator } from "@react-navigation/stack";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import SignIn from "../../screens/SignIn";
import SignUp from "../../screens/SignUp";
import Hello from "../../screens/Hello";
import Notification from "../../screens/Notification";
import AppStyles from "../../AppStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Auth from "@aws-amplify/auth";
import Loading from '../../components/Loading';


const AuthStack = createStackNavigator();

const AuthStackScreen = ({navigation}) => {
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    const key = async () => {
      try {
        const credentials = await AsyncStorage.getItem("auth")
        if (credentials) {
          const {username, password} = credentials;
          const user = await Auth.signIn(username, password)
          setLoading(false);
          user && navigation.push("TabsScreen")
        }
      } catch (err) {
        console.log('error', err);
      } finally{
        setLoading(false);
      }
    };
    key();
  }, []); // eslint-disable-line

  if(loading) return <Loading/>
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
        headerTitleAlign: "center",
        headerTransparent: true,
        headerTintColor: AppStyles.color.steedGreen,
      }}
    >
      {/* <AuthStack.Screen
        name="Hello"
        component={Hello}
        options={{ headerShown: false }}
      /> */}
      <AuthStack.Screen name="SignIn" component={SignIn} />
      <AuthStack.Screen name="SignUp" component={SignUp} />
      <AuthStack.Screen name="Notification" component={Notification} />
    </AuthStack.Navigator>
  );
};

export default AuthStackScreen;
