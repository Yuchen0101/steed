import React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Input, Button } from "react-native-elements";
import { AuthContext } from "../../context";
import Logo from "../../components/Logo";
import { View } from "react-native";
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Auth } from "aws-amplify";

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
      fetch(`https://steed-api.steed-intel.com/api/submit_user_details`, {
        method: "POST",
        headers: {
          Authorization: "eyJraWQiOiJUQjFWcTZxc3NIN20rZGg1cThIazRDZk4wNUdcL1Qrdm4rTVZvZzRBWjNqMD0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIzMTEzYjRjOS05Yjc1LTQ5MzQtODgyZS1iYTUyN2UzMzEzZmUiLCJhdWQiOiIyM2syY3NiM2Q2YzR1NTFlNjZuZDJrdXM0byIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwidG9rZW5fdXNlIjoiaWQiLCJjdXN0b206bm90aWZpY2F0aW9uX3Rva2VuIjoiRXhwb25lbnRQdXNoVG9rZW5bRXFwZGJZS1JVdy1ubDNlT0hWSHVnY10iLCJhdXRoX3RpbWUiOjE2MjQxNzgyMjksImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5hcC1zb3V0aGVhc3QtMi5hbWF6b25hd3MuY29tXC9hcC1zb3V0aGVhc3QtMl90TUp5dzlaUHIiLCJjb2duaXRvOnVzZXJuYW1lIjoiZmVpZmFueiIsImN1c3RvbTpkaXNwbGF5X25hbWUiOiJUZWQgWmhhbmciLCJleHAiOjE2MjQyNjQ2MjksImlhdCI6MTYyNDE3ODIyOSwiZW1haWwiOiJ6ZmVpZmFuMUBnbWFpbC5jb20ifQ.ZlP4930M3qYg6RsbjO-PFK9pYBWXISdUfjASUhsn6Wgbh2Jcwc7Zcnmv2y-UlPhmqtTvL3wnKJD5VKhvklibaIxeqyE4pM3J1vfOzGmM-0i5mnomqoI6cD1lII636uhCHWZ2wIudPOcdIjoZFZNpTq6ipify1ziNo6J20Iap9ZDvXASL2EQJqI8m3NqFXkMPhAMiJLJICo40txHRv20S4_KQltspfV8IHuMqyOxL1-ZXv8PYBmWjL_XMQuu0AJup41eaTrzAloqy6sekQxnjdli5t2SfhLILBAsuXVCu3e0QyMW0ERTcpOLt0aHWIw9zZjVptuVgUwRS2stuF-1AiQ",
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ latitude: -37.8127, longitude: 144.9726 }),
      }).then(
        // set user to jump to hello page
        setUser(user)
      )
    });
  };

  const handleLoginOnPress = async () => {
    setLoading(true);
    try {
      await signIn(username, password);
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
            <Logo width={200} height={200} />
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
