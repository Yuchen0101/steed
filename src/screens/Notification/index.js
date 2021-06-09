import React from "react";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import { Text, Icon, Button } from "react-native-elements";
import ScreenContainer from "../../components/ScreenContainer";
import AppStyles from "../../AppStyles";
import Auth from "@aws-amplify/auth";
import { AuthContext } from "../../context";
import { Alert } from "react-native";

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to enable notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token;
}

export default () => {
  const { signOut } = React.useContext(AuthContext);

  const [loading, setLoading] = React.useState(false);
  const [token, setToken] = React.useState(null);

  React.useEffect(() => {
    Auth.currentUserInfo().then((user) => {
      if (!user) {
        signOut();
      }
      if(user.attributes["custom:notification_token"] && user.attributes["custom:notification_token"] != ""){
        setToken(user.attributes["custom:notification_token"]);
      }
    });
  }, []);

  const handleOnPress = async () => {
    if (!token) {
      const token = await registerForPushNotificationsAsync();
      setLoading(true);

      Auth.currentAuthenticatedUser()
        .then((user) => {
          return Auth.updateUserAttributes(user, {
            "custom:notification_token": token
          });
        })
        .then(setToken(token))
        .catch(err=>console.log(err))
        .finally(setLoading(false));
    }
    else{
      Auth.currentAuthenticatedUser()
      .then((user) => {
        return Auth.updateUserAttributes(user, {
          "custom:notification_token": "",
        });
      })
      .then(setToken(null))
      .finally(setLoading(false));
    }
  };

  return (
    <ScreenContainer>
      <Icon
        name="notifications"
        size={80}
        color={AppStyles.color.steedGreen}
        containerStyle={{ marginVertical: 20 }}
      />
      <Text h3 style={{ color: AppStyles.color.steedGreen }}>
        Notifications
      </Text>
      <Text style={{ marginHorizontal: 15, marginVertical: 20, fontSize: 15 }}>
        Notifications are important to help us keep you engaged and aware of all
        the ways you can improve your prediction superpowers
      </Text>
      <Button
        title={token ? "Disable Notification" : "Enable Notification"}
        type="outline"
        style={{ marginTop: 40 }}
        onPress={handleOnPress}
        loading={loading}
      ></Button>
    </ScreenContainer>
  );
};
