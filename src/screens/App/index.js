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
import * as WebBrowser from 'expo-web-browser';
// import config from 'aws-exports';
import { Linking } from 'react-native';



const oauth = {
  domain: 'steed.auth.ap-southeast-2.amazoncognito.com',
  scope: ['phone', 'email', 'profile', 'openid', 'aws.cognito.signin.user.admin'],
  redirectSignIn: 'housepunt://', // expo go ip, need change to steedapp when deploy
  redirectSignOut: 'housepunt://', // expo go ip, need change to steedapp when deploy
  responseType: 'code',
  urlOpener: async (url, redirectUrl) => {
    const { type, url: newUrl } = await WebBrowser.openAuthSessionAsync(url, redirectUrl, {
        showTitle: false,
        enableUrlBarHiding: true,
        enableDefaultShare: false,
        ephemeralWebSession: false,
    });
    if (type === 'success') {
        Linking.openURL(newUrl);
    }
}

};

Amplify.configure({
  region: "ap-southeast-2",
  userPoolId: "ap-southeast-2_tMJyw9ZPr",
  userPoolWebClientId: "23k2csb3d6c4u51e66nd2kus4o",
  oauth: oauth,
});

const RootStack = createStackNavigator();
const RootStackScreen = ({ user }) => (
  <RootStack.Navigator headerMode="none">
    {/* <RootStack.Screen name="TabsScreen" component={TabsScreen} /> */}
    {user ? (
      <RootStack.Screen name="TabsScreen" component={TabsScreen} />
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
        color: AppStyles.color.steedLightGrey,
        textAlign: "center",
      },
    },
    Icon: {
      color: AppStyles.color.steedWhite,
    },
  };

  const [isLoading, setIsLoading] = React.useState(true);
  const [user, setUser] = React.useState(null);
  const [showInterest, setShowInterest] = React.useState(false);

  const authContext = React.useMemo(() => {

    return {
      showInterest,
      setShowInterest,
      setUser: (user)=>setUser(user),
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
            "custom:display_name": userInfo.displayName,
          },
        }),
      authFetch: (method, url, body) =>
        Auth.currentSession()
          .then((session) => {
            return session?.idToken?.jwtToken;
          })
          .then((token) =>
            fetch(`https://steed-api.steed-intel.com${url}`, {
              method: method,
              headers: {
                Authorization: token,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(body),
            })
              .then((response) => response.json())
              .catch((error) => console.log(error))
          ),
    };
  }, [showInterest]);

  React.useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then((user) => {
        setShowInterest(false)
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
