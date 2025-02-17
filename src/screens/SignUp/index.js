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
import { View, ScrollView } from "react-native";
import { Dimensions } from "react-native";

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

    // username cannot contain space
    if(userInfo.username.indexOf(' ') >= 0) throw Error(`username cannot contains space`);

    // check password policy, Minimum length 8, please include at least one letter and one number
    if(userInfo.password.length <8 )throw Error(`password minimum length is 8`);
    if(!/[a-zA-Z]/g.test(userInfo.password))throw Error(`password include at least one letter`);
    if(!/\d/.test(userInfo.password))throw Error(`password include at least one number`);


    if (userInfo["password"] != userInfo["confirmPassword"])
      throw Error(`password doesn't match`);

    return true;
  };

  const handleLoginOnPress = async () => {
    try {
      checkUserInfo(userInfo);
    } catch (error) {
      setErrorMessage(error.message);
      return;
    }

    try {
       setLoading(true);
       await signUp(userInfo)
       setShowConfirmMessage(true)
    } catch (err) {
      setErrorMessage(err.message)
    } finally{
      setLoading(false)
    }
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

  const scrollHeight = Dimensions.get("window").height - 80;

  return (
    <KeyboardAvoidingView behavior="position" containerStyle={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView>
          <View style={{ alignItems: "center", paddingTop: 20 }}>
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
                marginBottom: 10,
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
            <Text
              style={{
                fontSize: 10,
                textAlign: "left", 
                alignSelf: "stretch",
                marginLeft: 35
              }}
            >
              Username cannot have spaces
            </Text>
            <Input
              placeholder="Enter a username..."
              leftIcon={
                <MaterialCommunityIcons
                  name="account"
                  color="white"
                  size={20}
                />
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
            <Text
              style={{
                fontSize: 10,
                textAlign: "center", 
                alignSelf: "stretch",
              }}
            >
              Minimum length 8, please include at least one letter and one number
            </Text>
            <Input
              placeholder="Enter Password"
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
              buttonStyle={{ paddingHorizontal:30 }}
              onPress={() => handleLoginOnPress()}
              loading={loading}
            />
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
