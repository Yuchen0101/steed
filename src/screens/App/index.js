import React from "react";
import Amplify, { Auth } from "aws-amplify";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AuthStackScreen from "../../navigation/AuthNavigator";
import TabsScreen from "../../navigation/TabNavigator";
import { ThemeProvider } from "react-native-elements";
import AppStyles from "../../AppStyles";
import Loading from "../../components/Loading";
import { AuthContext } from "../../context";

Amplify.configure({
  region: "ap-southeast-2",
  userPoolId: "ap-southeast-2_tMJyw9ZPr",
  userPoolWebClientId: "23k2csb3d6c4u51e66nd2kus4o",
});

const RootStack = createStackNavigator();
const RootStackScreen = ({ user }) => (
  <RootStack.Navigator headerMode="none">
    {user ? (
      <RootStack.Screen name="TabsScreen" component={TabsScreen}/>
    ) : (
      <RootStack.Screen name="AuthStackScreen" component={AuthStackScreen} />
    )}
    {/* <RootStack.Screen name="AuthStackScreen" component={AuthStackScreen} /> */}
    {/* <RootStack.Screen name="TabsScreen" component={TabsScreen} /> */}
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
        borderRadius: 10,
      },
    },
    Text: {
      style: {
        color: AppStyles.color.steedLigthGrey,
        textAlign: "center",
      },
    },
    Icon: {
      color: AppStyles.color.steedWhite,
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
      signUp: (userInfo) =>
        Auth.signUp({
          username: userInfo.username,
          password: userInfo.password,
          attributes: {
            email: userInfo.email,
            'custom:display_name': userInfo.displayName,
          },
        }).then((res) => console.log(res)),
    };
  }, []);

  React.useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then((user) => {
        setUser({ user });
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
        <NavigationContainer
          theme={{
            ...DarkTheme,
            colors: {
              background: AppStyles.color.steedDarkBlue,
              text: AppStyles.color.steedGreen,
              primary: AppStyles.color.steedGreen,
            },
          }}
        >
          <RootStackScreen user={user} />
        </NavigationContainer>
      </ThemeProvider>
    </AuthContext.Provider>
  );
};
