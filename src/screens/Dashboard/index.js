import React from "react";
import ScreenContainer from "../../components/ScreenContainer";
import { Text, ButtonGroup } from "react-native-elements";
import { View } from "react-native";
import AppStyles from "../../AppStyles";
import Personal from "./Personal";
export default () => {
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const buttons = ["Personal", "Leader Board"];
  return (
    <ScreenContainer>
      <View style={{ width: 300 }}>
        <Text h3>Dashboard</Text>
        <Text style={{ fontSize: 15, margin: 10 }}>
          Explore your ratings and where you stand on the leader board
        </Text>
      </View>
      <ButtonGroup
        onPress={setSelectedIndex}
        selectedIndex={selectedIndex}
        buttons={buttons}
        containerStyle={{ width: 300, borderWidth: 0}}
        innerBorderStyle={{ color: AppStyles.color.steedDarkBlue, width: 10 }}
        selectedButtonStyle={{
          backgroundColor: AppStyles.color.steedDarkBlue,
          borderWidth: 2,
          borderColor: AppStyles.color.steedGreen,
          color:AppStyles.color.steedGreen,
        }}
        buttonStyle={{
          backgroundColor: AppStyles.color.steedBlue,
          color: AppStyles.color.steedLigthGrey,
        }}
        textStyle={{color:AppStyles.color.steedGreen}}
      />
      <Personal/>
    </ScreenContainer>
  );
};
