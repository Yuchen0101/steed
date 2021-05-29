import React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Input, Button } from "react-native-elements";
import ScreenContainer from "../../components/ScreenContainer";
import { StyleSheet } from "react-native";
import AppStyles from "../../AppStyles";


export default () => {
  return (
    <ScreenContainer>
      <Input
        placeholder="Enter Email or Username... "
        leftIcon={
          <MaterialCommunityIcons name="account" color="white" size={20} />
        }
        
        // onChangeText={(value) => this.setState({ comment: value })}
      />
      <Input
        placeholder="Enter Password... "
        leftIcon={<MaterialCommunityIcons name="key" color="white" size={20} />}
        secureTextEntry={true}
        
        // onChangeText={(value) => this.setState({ comment: value })}
      />
      <Button title="Forgot password? Click Here" type="clear" buttonStyle={{marginTop: 0}}/>

      <Button title="Login" type="outline" buttonStyle={{marginTop: 30, paddingLeft:30, paddingRight:30}}/>
    </ScreenContainer>
  );
};
