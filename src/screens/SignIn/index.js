import React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Input, Button } from "react-native-elements";
import { AuthContext } from "../../context";
import Logo from "../../components/Logo";
import { View, Image } from "react-native";
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Auth } from "aws-amplify";
import * as Location from 'expo-location';
import { Platform } from 'react-native';
import { Alert } from "react-native";

export default ({ navigation }) => {
  const { setUser } = React.useContext(AuthContext);
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);

  const signIn = (username, password) => {
    return Auth.signIn(username, password).then((user) => {
      // update user detail
      // set user to jump to hello page
      setUser(user);
    });
  };

  const handleLoginOnPress = async () => {
    // get location
    setLoading(true);

    //login
    try {
      await signIn(username, password);
      navigation.navigate('Interest');
    } catch (err) {
      if (err?.message) {
        setErrorMessage(err?.message);
      } else {
        setErrorMessage("Invalid username or password");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView behavior="position" containerStyle={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ alignItems: "center" }}>
          <View style={{ marginVertical: 40 }}>
            <Image source={require('../../../assets/splash_logo.png')}/>
          </View>
          <Input
            placeholder="Enter Email or Username... "
            leftIcon={
              <MaterialCommunityIcons name="account" color="white" size={20} />
            }
            onChangeText={(value) => setUsername(value)}
          />
          <Input
            placeholder="Enter Password... "
            leftIcon={
              <MaterialCommunityIcons name="key" color="white" size={20} />
            }
            secureTextEntry={!showPassword}
            onChangeText={(value) => setPassword(value)}
            errorMessage={errorMessage}
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
          />

          <Button
            title="Forgot password? Click Here"
            type="clear"
            buttonStyle={{ marginTop: 0 }}
            titleStyle={{ textDecorationLine: "underline", fontSize: 15 }}
            onPress={() => navigation.push("ForgetPassword")}
          />

          <Button
            title="Login"
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
