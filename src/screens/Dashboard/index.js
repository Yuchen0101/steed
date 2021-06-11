import React from "react";
import ScreenContainer from "../../components/ScreenContainer";
import { Text, ButtonGroup } from "react-native-elements";
import { View } from "react-native";
import AppStyles from "../../AppStyles";
import Personal from "./Personal";
import LeaderBoard from "./LeaderBoard";
import Auth from "@aws-amplify/auth";
import { ActivityIndicator } from "react-native";
export default ({navigation}) => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [displayName, setDisplayName] = React.useState(null);

  React.useEffect(() => {
    Auth.currentUserInfo().then((user) => {
      if (user?.attributes["custom:display_name"]) {
        setDisplayName(user?.attributes["custom:display_name"]);
      } else {
        setDisplayName("personal");
      }
    });
  }, [navigation]);

  if (!displayName) {
    // console.log(displayName)
    return <ActivityIndicator />;
  }

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
        buttons={[displayName, "Leader Board"]}
        containerStyle={{
          width: 300,
          borderWidth: 0,
          backgroundColor: AppStyles.color.steedDarkBlue,
        }}
        innerBorderStyle={{
          color: AppStyles.color.steedDarkBlue,
          width: 10,
          borderRadius: 10,
        }}
        selectedButtonStyle={{
          backgroundColor: AppStyles.color.steedDarkBlue,
          borderWidth: 2,
          borderColor: AppStyles.color.steedGreen,
        }}
        buttonStyle={{
          backgroundColor: AppStyles.color.steedBlue,
          borderRadius: 10,
        }}
        textStyle={{ color: AppStyles.color.steedDarkGrey }}
        selectedTextStyle={{ color: AppStyles.color.steedGreen }}
      />
      {selectedIndex == 0 ? <Personal /> : <LeaderBoard />}
    </ScreenContainer>
  );
};
