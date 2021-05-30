import React from "react";
import { Button } from "react-native";
import ScreenContainer from "../../components/ScreenContainer";
import { AuthContext } from "../../context";

export default () => {
  const { signOut } = React.useContext(AuthContext);
  return (
    <ScreenContainer>
      <Button title="logout" onPress={()=>signOut()}></Button>
    </ScreenContainer>
  );
};