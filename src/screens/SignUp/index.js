import React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Input, Button } from "react-native-elements";
import ScreenContainer from "../../components/ScreenContainer";
import { AuthContext } from "../../context";

export default ({navigation}) => {
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
      console.log(error);
      setErrorMessage(error.message);
    }

    console.log(userInfo);
    navigation.push("Hello")
    // setLoading(true);
    // signUp(userInfo).then(navigation.push("SignIn")).catch(setErrorMessage(err.message)).finally(setLoading(false))
  };
  return (
    <ScreenContainer>
      <Input
        placeholder="Enter Display Name... "
        leftIcon={
          <MaterialCommunityIcons name="account-star" color="white" size={20} />
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
        leftIcon={<MaterialCommunityIcons name="key" color="white" size={20} />}
        rightIcon={<MaterialCommunityIcons name={showPassword?"eye-off":"eye"} color="white" size={20} onPress={()=>{setShowPassword((pre)=>!pre)}}/>}
        secureTextEntry={!showPassword}
        onChangeText={(value) => handleOnChangeText(value, "password")}
      />
      <Input
        placeholder="Confirm Password... "
        leftIcon={<MaterialCommunityIcons name="key" color="white" size={20} />}
        rightIcon={<MaterialCommunityIcons name={showPassword?"eye-off":"eye"} color="white" size={20} onPress={()=>{setShowPassword((pre)=>!pre)}}/>}
        secureTextEntry={!showPassword}
        onChangeText={(value) => handleOnChangeText(value, "confirmPassword")}
        errorMessage={errorMessage}
      />
      <Button
        title="Create Account"
        type="outline"
        buttonStyle={{ marginTop: 30, paddingLeft: 30, paddingRight: 30 }}
        onPress={() => handleLoginOnPress()}
        loading={loading}
      />
    </ScreenContainer>
  );
};
