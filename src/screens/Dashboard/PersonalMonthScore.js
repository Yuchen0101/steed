import React from "react";
import { Text } from "react-native-elements";
import { View } from "react-native";
import AppStyles from "../../AppStyles";

const ScoreCard = ({ title, context }) => {
  return (
    <View
      style={{
        width: 100,
        height: 80,
        borderWidth: 2,
        borderRadius: 10,
        borderColor: AppStyles.color.steedGreen,
        paddingLeft: 10,
        paddingTop: 10,
      }}
    >
      <Text
        style={{
          textAlign: "left",
          alignSelf: "stretch",
          fontWeight: "bold",
          color: AppStyles.color.steedGreen,
        }}
      >
        {title}
      </Text>
      <Text
        style={{
          textAlign: "left",
          alignSelf: "stretch",
          fontSize: 12,
          color: AppStyles.color.steedGreen,
        }}
      >
        {context}
      </Text>
    </View>
  );
};

export default () => {
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
    <View
      style={{
        backgroundColor: AppStyles.color.steedBlue,
        margin: 10,
        padding: 15,
        paddingTop: 30,
        paddingBottom: 30,
        borderRadius: 10,
        marginTop: 20,
      }}
    >
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        {monthScores.map((item, idx) => (
          <ScoreCard key={idx} title={item.title} context={item.context} />
        ))}
      </View>
      <Text style={{ marginTop: 30, marginBottom: 10, fontStyle: "italic" }}>
        All Time
      </Text>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        {monthScores.map((item, idx) => (
          <ScoreCard key={idx} title={item.title} context={item.context} />
        ))}
      </View>
    </View>
  );
};
