import React from "react";
import { Input, Button, Avatar } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import ScreenContainer from "../../components/ScreenContainer";
import AppStyles from "../../AppStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Auth from "@aws-amplify/auth";
import { Alert } from "react-native";

export default () => {
  const [userInfo, setUserInfo] = React.useState({
    displayName: "",
    username: "",
    email: "",
  });
  const [loading, setLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [image, setImage] = React.useState(null);

  React.useEffect(() => {
    getImage();
    getUser();
  }, []);

  const getImage = async () => {
    const profilePic = await AsyncStorage.getItem("profilePicUrl");
    if (profilePic) {
      setImage(profilePic);
    }
  };

  const getUser = async () => {
    const user = await Auth.currentUserInfo();
    setUserInfo({
      displayName: user.attributes["custom:display_name"],
      username: user.username,
      email: user.attributes.email,
    });
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      AsyncStorage.setItem("profilePicUrl", result.uri);
      setImage(result.uri);
    }
  };

  const handleOnChangeText = (value, key) => {
    setUserInfo((preState) => ({
      ...preState,
      [key]: value,
    }));
  };

  const handleLoginOnPress = () => {
    setLoading(true);
    Auth.currentAuthenticatedUser()
      .then((user) => {
        return Auth.updateUserAttributes(user, {
          'custom:display_name': userInfo.displayName,
        });
      })
      .then(Alert.alert("Success","Change Saved"))
      .catch((err) => setErrorMessage(err.message))
      .finally(setLoading(false));
  };

  return (
    <ScreenContainer>
      <Avatar
        size="xlarge"
        rounded
        icon={
          !image && {
            name: "plus",
            type: "font-awesome",
            color: AppStyles.color.steedWhite,
          }
        }
        onPress={() => pickImage()}
        containerStyle={{
          backgroundColor: AppStyles.color.steedDarkGrey,
          marginBottom: 30,
        }}
        source={
          image && {
            uri: image,
          }
        }
      />
      <Input
        placeholder={userInfo.displayName}
        label="displayName"
        onChangeText={(value) => handleOnChangeText(value, "displayName")}
      />
      <Input placeholder={userInfo.username} label="username" disabled />
      <Input
        placeholder={userInfo.email}
        label="email"
        disabled
        errorMessage={errorMessage}
      />
      <Button
        title="Save Change"
        type="outline"
        buttonStyle={{ marginTop: 30, paddingLeft: 30, paddingRight: 30 }}
        onPress={() => handleLoginOnPress()}
        loading={loading}
      />
    </ScreenContainer>
  );
};
