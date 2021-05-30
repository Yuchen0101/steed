import React from "react";
import Amplify, { Auth } from "aws-amplify";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AuthStackScreen from "../../navigation/AuthNavigator";
import TabsScreen from "../../navigation/TabNavigator";
import { ThemeProvider } from "react-native-elements";
import AppStyles from "../../AppStyles";
import Loading from "../../components/Loading";
import { AuthContext } from "../../context";

Amplify.configure({
  region: "ap-southeast-2",
  userPoolId: "ap-southeast-2_sXiWBvAxg",
  userPoolWebClientId: "3rc1perp9ida931u347nt1tjcu",
});



const RootStack = createStackNavigator();
const RootStackScreen = ({ user }) => (
  <RootStack.Navigator headerMode="none">
    {user ? (
      <RootStack.Screen name="TabsScreen" component={TabsScreen} />
    ) : (
      <RootStack.Screen name="AuthStackScreen" component={AuthStackScreen} />
    )}
  </RootStack.Navigator>
);

export default () => {
  const theme = {
    Input: {
      inputStyle: { color: "white" },
    },
    Button: {
      titleStyle: {
        color: AppStyles.color.steedGreen,
      },
      buttonStyle: {
        borderColor: AppStyles.color.steedGreen,
      },
    },
  };

  const [isLoading, setIsLoading] = React.useState(true);
  const [user, setUser] = React.useState(null);

  const authContext = React.useMemo(() => {
    return {
      signIn: (username, password) =>
        Auth.signIn(username, password).then((user) => {
          setUser(user);
          return user;
        }),
      signOut: () =>
        Auth.signOut().then((data) => {
          setUser(null);
          return data;
        }),
    };
  }, []);

  React.useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then((user) => {
        setUser(user);
      })
      .catch(() => {
        setUser(null);
      })
      .finally(setIsLoading(false));
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <AuthContext.Provider value={authContext}>
      <ThemeProvider theme={theme}>
        <NavigationContainer>
          <RootStackScreen user={user} />
        </NavigationContainer>
      </ThemeProvider>
    </AuthContext.Provider>
  );
};
