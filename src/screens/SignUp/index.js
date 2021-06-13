import React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Input, Button, Avatar, Text } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import ScreenContainer from "../../components/ScreenContainer";
import { AuthContext } from "../../context";
import AppStyles from "../../AppStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { View } from "react-native";

export default ({ navigation }) => {
  const { signUp } = React.useContext(AuthContext);
  const [userInfo, setUserInfo] = React.useState({
    displayName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [image, setImage] = React.useState(null);
  const [showConfirmMessage, setShowConfirmMessage] = React.useState(false);

  React.useEffect(() => {
    getImage();
  }, []);

  const getImage = async () => {
    const profilePic = await AsyncStorage.getItem("profilePicUrl");
    if (profilePic) {
      setImage(profilePic);
    }
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

  const checkUserInfo = (userInfo) => {
    const requiredFileds = [
      "displayName",
      "username",
      "email",
      "password",
      "confirmPassword",
    ];
    requiredFileds.forEach((filed) => {
      if (!userInfo[filed]) throw Error(`${filed} is required...`);
    });

    if (userInfo["password"] != userInfo["confirmPassword"])
      throw Error(`password doesn't match`);

    return true;
  };

  const handleLoginOnPress = () => {
    try {
      checkUserInfo(userInfo);
    } catch (error) {
      setErrorMessage(error.message);
      return;
    }

    setLoading(true);
    signUp(userInfo)
      .then(setShowConfirmMessage(true))
      .catch((err) => setErrorMessage(err.message))
      .finally(setLoading(false));
  };

  if (showConfirmMessage)
    return (
      <ScreenContainer style={{ flex: 1, justifyContent: "center" }}>
        <Text
          style={{
            padding: 20,
            fontSize: 20,
          }}
        >
          A verification link has been sent to your email, please have a check
        </Text>
        <Button
          title="Go to Login"
          type="outline"
          onPress={() => navigation.goBack()}
        ></Button>
      </ScreenContainer>
    );
  return (
    <KeyboardAvoidingView behavior="position" containerStyle={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{alignItems:"center", paddingTop:20}}>
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
              marginBottom: 20,
            }}
            source={
              image && {
                uri: image,
              }
            }
          />
          <Input
            placeholder="Enter Display Name... "
            leftIcon={
              <MaterialCommunityIcons
                name="account-star"
                color="white"
                size={20}
              />
            }
            onChangeText={(value) => handleOnChangeText(value, "displayName")}
          />
          <Input
            placeholder="Enter Username... "
            leftIcon={
              <MaterialCommunityIcons name="account" color="white" size={20} />
            }
            onChangeText={(value) => handleOnChangeText(value, "username")}
          />
          <Input
            placeholder="Enter Email... "
            leftIcon={
              <MaterialCommunityIcons name="email" color="white" size={20} />
            }
            onChangeText={(value) => handleOnChangeText(value, "email")}
          />
          <Input
            placeholder="Enter Password... "
            leftIcon={
              <MaterialCommunityIcons name="key" color="white" size={20} />
            }
            rightIcon={
              <MaterialCommunityIcons
                name={showPassword ? "eye-off" : "eye"}
                color="white"
                size={20}
                onPress={() => {
                  setShowPassword((pre) => !pre);
                }}
              />
            }
            secureTextEntry={!showPassword}
            onChangeText={(value) => handleOnChangeText(value, "password")}
          />
          <Input
            placeholder="Confirm Password... "
            leftIcon={
              <MaterialCommunityIcons name="key" color="white" size={20} />
            }
            rightIcon={
              <MaterialCommunityIcons
                name={showPassword ? "eye-off" : "eye"}
                color="white"
                size={20}
                onPress={() => {
                  setShowPassword((pre) => !pre);
                }}
              />
            }
            secureTextEntry={!showPassword}
            onChangeText={(value) =>
              handleOnChangeText(value, "confirmPassword")
            }
            errorMessage={errorMessage}
          />

          <Button
            title="Create Account"
            type="outline"
            buttonStyle={{ marginTop: 30, paddingLeft: 30, paddingRight: 30 }}
            onPress={() => handleLoginOnPress()}
            loading={loading}
          />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
