import React from "react";
import { Dimensions, ScrollView, View } from "react-native";
import { Text } from "react-native-elements";
import { ButtonGroup } from "react-native-elements/dist/buttons/ButtonGroup";
import AppStyles from "../../AppStyles";

const ScoreItem = ({ rank, title, value }) => (
  <View style={{ flexDirection: "row", marginBottom: 10 }}>
    <Text style={{ flex: 1 }}>{rank}</Text>
    <Text style={{ flex: 2 }}>{title}</Text>
    <Text style={{ flex: 2 }}>{value}</Text>
  </View>
);

export default () => {
  const rankingMonth = [
    {
      name: "Warren HuanM",
      score: "11,980",
    },
    {
      name: "Joe Blogsn",
      score: "9,810",
    },
    {
      name: "Eddy MerckY",
      score: "9,918",
    },
    {
      name: "Peter Sagaj",
      score: "78,120",
    },
    {
      name: "Dinesh Krishnaj",
      score: "15,919",
    },
    {
      name: "Jayden Vef",
      score: "19.927",
    },
  ];
  const rankingAll = [
    {
      name: "Peter Sagaj",
      score: "78,120",
    },
    {
      name: "Dinesh Krishnaj",
      score: "15,919",
    },
    {
      name: "Jayden Vef",
      score: "19.927",
    },
    {
      name: "Warren HuanM",
      score: "11,980",
    },
    {
      name: "Joe Blogsn",
      score: "9,810",
    },
    {
      name: "Eddy MerckY",
      score: "9,918",
    },
  ];

  const buttons = ["Month", "All Time"];
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [ranking, setRanking] = React.useState(rankingMonth);
  const handleOnPress = (idx) => {
    setSelectedIndex(idx);
    setRanking(idx==0?rankingMonth:rankingAll)
  };

  return (
    <ScrollView>
      <View style={{ alignItems: "center" }}>
        <ButtonGroup
          onPress={handleOnPress}
          selectedIndex={selectedIndex}
          buttons={buttons}
          containerStyle={{ width: 150, borderWidth: 0 }}
          innerBorderStyle={{ color: AppStyles.color.steedDarkBlue, width: 10 }}
          selectedButtonStyle={{
            backgroundColor: AppStyles.color.steedDarkBlue,
          }}
          buttonStyle={{
            backgroundColor: AppStyles.color.steedDarkBlue,
          }}
          textStyle={{
            color: AppStyles.color.steedDarkGrey,
          }}
          selectedTextStyle={{
            color: AppStyles.color.steedWhite,
            textDecorationLine: "underline",
          }}
        />
        <View style={{ width: Dimensions.get("window").width - 30, marginBottom:10}}>
        <Text style={{textAlign:"left"}}>
        You will be given your accuracy result immediately and a consolidated score and leader board positioning on where you stand based on your past predictions.
        </Text>
        </View>


      </View>
      <View
        style={{
          marginVertical: 10,
          paddingVertical: 10,
          borderRadius: 20,
          width: Dimensions.get("window").width - 16,
        }}
      >
        <View style={{ flexDirection: "row", marginBottom: 10 }}>
          <Text
            style={{
              flex: 1,
              color: AppStyles.color.steedGreen,
              fontWeight: "bold",
            }}
          >
            Rank
          </Text>
          <Text
            style={{
              flex: 2,
              color: AppStyles.color.steedGreen,
              fontWeight: "bold",
            }}
          >
            Analyst Leader
          </Text>
          <Text
            style={{
              flex: 2,
              color: AppStyles.color.steedGreen,
              fontWeight: "bold",
            }}
          >
            Points Earned
          </Text>
        </View>

        {ranking.map((item, idx) => (
          <ScoreItem
            key={idx}
            rank={idx + 1}
            title={item.name}
            value={item.score}
          />
        ))}
      </View>
    </ScrollView>
  );
};
