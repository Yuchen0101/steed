import React, { useEffect } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Input, Button, Avatar, Text } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import ScreenContainer from "../../components/ScreenContainer";
import { AuthContext } from "../../context";
import AppStyles from "../../AppStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View } from "react-native";
import Logo from "../../components/Logo";
import Auth from "@aws-amplify/auth";

export default ({ navigation }) => {
  // const { signUp } = React.useContext(AuthContext);
  const [userInfo, setUserInfo] = React.useState({
    oldPassword: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  const handleOnChangeText = (value, key) => {
    setUserInfo((preState) => ({
      ...preState,
      [key]: value,
    }));
  };

  const checkUserInfo = (userInfo) => {
    const requiredFileds = ["oldPassword", "password", "confirmPassword"];
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

    console.log(userInfo);
    setLoading(true);
    Auth.currentAuthenticatedUser()
      .then((user) => {
        return Auth.changePassword(user, userInfo.oldPassword, userInfo.password);
      })
      .then((data) => console.log(data))
      .catch((err) => setErrorMessage(err.message)).finally(setLoading(false))
  };

  return (
    <ScreenContainer>
      <View style={{ marginVertical: 20 }}>
        <Logo height={200} width={200} />
      </View>
      <Input
        placeholder="Enter Old Password... "
        leftIcon={<MaterialCommunityIcons name="key" color="white" size={20} />}
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
        onChangeText={(value) => handleOnChangeText(value, "oldPassword")}
      />

      <Input
        placeholder="Enter Password... "
        leftIcon={<MaterialCommunityIcons name="key" color="white" size={20} />}
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
        leftIcon={<MaterialCommunityIcons name="key" color="white" size={20} />}
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
        onChangeText={(value) => handleOnChangeText(value, "confirmPassword")}
        errorMessage={errorMessage}
      />
      <Button
        title="Reset Password"
        type="outline"
        buttonStyle={{ marginTop: 30, paddingLeft: 30, paddingRight: 30 }}
        onPress={() => handleLoginOnPress()}
        loading={loading}
      />
    </ScreenContainer>
  );
};
