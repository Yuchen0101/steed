import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AppStyles from "../../AppStyles";
import Profile from "../../screens/Profile";

const ProfileStack = createStackNavigator();

const ProfileStackScreen = () => (
  <ProfileStack.Navigator
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
    <ProfileStack.Screen name="Profile" component={Profile} />
  </ProfileStack.Navigator>
);

export default ProfileStackScreen;
