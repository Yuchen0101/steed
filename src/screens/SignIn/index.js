import React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Input, Button } from "react-native-elements";
import ScreenContainer from "../../components/ScreenContainer";
import { AuthContext } from "../../context";
import Logo from "../../components/Logo";
import { View } from "react-native";



export default ({ navigation }) => {
  const { signIn } = React.useContext(AuthContext);
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const handleLoginOnPress = async () => {
    setLoading(true);
    try {
      await signIn(username, password);
    } catch (err) {
      if(err?.message){
        setErrorMessage(err?.message)
      }else{
        setErrorMessage("Invalid usernmae or password")
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <ScreenContainer>
      <View style={{marginVertical:40}}>
        <Logo width={200} height={200}/>
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
        leftIcon={<MaterialCommunityIcons name="key" color="white" size={20} />}
        secureTextEntry={true}
        onChangeText={(value) => setPassword(value)}
        errorMessage={errorMessage}
      />

      <Button
        title="Forgot password? Click Here"
        type="clear"
        buttonStyle={{ marginTop: 0 }}
        titleStyle={{textDecorationLine:"underline", fontSize:15}}
        onPress={()=>navigation.push("ForgetPassword")}
      />

      <Button
        title="Login"
        type="outline"
        buttonStyle={{ marginTop: 30, paddingLeft: 30, paddingRight: 30 }}
        onPress={() => handleLoginOnPress()}
        loading={loading}
      />
    </ScreenContainer>
  );
};
