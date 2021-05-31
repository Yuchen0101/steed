import React from "react";
import { Input, Button, Avatar } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import ScreenContainer from "../../components/ScreenContainer";
import { AuthContext } from "../../context";
import AppStyles from "../../AppStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView } from "react-native-gesture-handler";
import Auth from "@aws-amplify/auth";

export default ({ navigation }) => {
  const { signUp } = React.useContext(AuthContext);
  const [userInfo, setUserInfo] = React.useState({
    displayName: "",
    username: "",
    email: "",
  });
  const [showPassword, setShowPassword] = React.useState(false);
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
      displayName: user?.attributes.displayName
        ? user?.attributes.displayName
        : user.username,
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
        onChangeText={(value) => handleOnChangeText(value, "email")}
        disabled
      />
      <Button
        title="Create Account"
        type="outline"
        buttonStyle={{ marginTop: 30, paddingLeft: 30, paddingRight: 30 }}
        onPress={() => handleLoginOnPress()}
        loading={loading}
        disabled
      />
    </ScreenContainer>
  );
};
