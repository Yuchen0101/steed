import React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Input, Button, Text } from "react-native-elements";
import ScreenContainer from "../../components/ScreenContainer";
import Auth from "@aws-amplify/auth";

const SendConfirmation = ({ setforgetPasswordEmail }) => {
  const [loading, setLoading] = React.useState(false);
  const [email, setEmail] = React.useState("");

  const handleOnPress = () => {
    setLoading(true);
    Auth.forgotPassword(email)
      .then((data) => {
        setforgetPasswordEmail(email);
      })
      .catch((data) => console.log(data))
      .finally(setLoading(false));
  };

  return (
    <>
      <Input
        placeholder="Enter your email"
        leftIcon={
          <MaterialCommunityIcons name="email" color="white" size={20} />
        }
        onChangeText={(value) => setEmail(value)}
      />
      <Button
        title="Reset password"
        type="outline"
        buttonStyle={{ paddingHorizontal: 30 }}
        loading={loading}
        onPress={() => handleOnPress()}
      />
    </>
  );
};

const ResetPassword = ({ navigation, email }) => {
  const [errorMessage, setErrorMessage] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  const [code, setCode] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const checkPassword = () => {
    if (password != confirmPassword) throw Error("password do not match!");
  };
  const handleOnPress = () => {
    checkPassword();
    setLoading(true);
    Auth.forgotPasswordSubmit(email, code, password)
      .then((data) => {
        navigation.push("SignIn")
      })
      .catch((err) => console.log(err))
      .finally(setLoading(false));
  };

  return (
    <>
      <Input
        placeholder="Enter your confirmation code"
        leftIcon={
          <MaterialCommunityIcons name="email" color="white" size={20} />
        }
        onChangeText={(value) => setCode(value)}
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
        onChangeText={setPassword}
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
        onChangeText={setConfirmPassword}
        errorMessage={errorMessage}
      />
      <Button
        title="Change password"
        type="outline"
        buttonStyle={{ paddingHorizontal: 30 }}
        loading={loading}
        onPress={() => handleOnPress()}
      />
    </>
  );
};

export default ({ navigation }) => {
  const [forgetPasswordEmail, setforgetPasswordEmail] = React.useState(null);
  return (
    <ScreenContainer>
      {forgetPasswordEmail == null && (
        <SendConfirmation setforgetPasswordEmail={setforgetPasswordEmail} />
      )}
      {forgetPasswordEmail && <ResetPassword email={forgetPasswordEmail} navigation={navigation}/>}
    </ScreenContainer>
  );
};
