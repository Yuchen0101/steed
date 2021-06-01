import React from "react";
import { Text, ButtonGroup, Icon } from "react-native-elements";
import { View } from "react-native";
import AppStyles from "../../AppStyles";
import PersonalBadge from "./PersonalBadge";
import PersonalMonthScore from "./PersonalMonthScore";
import PersonalPoint from "./PersonalPoint";
import PersonalImpact from "./PersonalImpact";

const IconButton = ({ iconName, buttontitle }) => (
  <View style={{ height: 40 }}>
    <Icon name={iconName} color={AppStyles.color.steedGreen} />
    <Text>{buttontitle}</Text>
  </View>
);

const renderPersonal = (idx) => {
  if (idx == 0) return <PersonalMonthScore />;
  if (idx == 1) return <PersonalPoint />;
  if (idx == 2) return <PersonalBadge />;
  if (idx == 3) return <PersonalImpact/>
};

export default () => {
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const component1 = () => (
    <IconButton buttontitle="Month" iconName="insights" />
  );
  const component2 = () => (
    <IconButton buttontitle="Point" iconName="emoji-events" />
  );
  const component3 = () => (
    <IconButton buttontitle="Badges" iconName="military-tech" />
  );
  const component4 = () => <IconButton buttontitle="Impact" iconName="star" />;

  const buttons = [
    { element: component1 },
    { element: component2 },
    { element: component3 },
    { element: component4 },
  ];

  const [monthScores, setMonthScores] = React.useState([
    {
      title: "12,000",
      context: "Total Points Earned",
    },
    {
      title: "9th",
      context: "Leader Board Position",
    },
    {
      title: "91.4%",
      context: "Average Accuracy",
    },
  ]);
  return (
    <View style={{ marginTop: 10 }}>
      <ButtonGroup
        onPress={setSelectedIndex}
        selectedIndex={selectedIndex}
        buttons={buttons}
        containerStyle={{
          height: 60,
          width: 350,
          borderWidth: 0,
          backgroundColor: AppStyles.color.steedDarkBlue,
        }}
        innerBorderStyle={{ color: AppStyles.color.steedDarkBlue, width: 10 }}
        selectedButtonStyle={{
          backgroundColor: AppStyles.color.steedDarkBlue,
          borderWidth: 2,
          borderColor: AppStyles.color.steedGreen,
          color: AppStyles.color.steedGreen,
        }}
        buttonStyle={{
          backgroundColor: AppStyles.color.steedDarkGrey,
          borderRadius: 10,
        }}
        textStyle={{ color: AppStyles.color.steedGreen }}
      />
      <View>{renderPersonal(selectedIndex)}</View>
    </View>
  );
};
