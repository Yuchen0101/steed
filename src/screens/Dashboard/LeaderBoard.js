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

export default ({leaderboard}) => {
  const rankingMonth = leaderboard.current_month
  const rankingAll = leaderboard.overall
  const rankingAccuracy = leaderboard.accuracy

  const buttons = ["Monthly", "All Time", "Accuracy"];
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [ranking, setRanking] = React.useState(rankingMonth);
  const handleOnPress = (idx) => {
    setSelectedIndex(idx);
    if (idx==0){
      setRanking(rankingMonth)
    }else if (idx==1){
      setRanking(rankingAll)
    }else{
      setRanking(rankingAccuracy)
    }
  };
  

  return (
    <ScrollView>
      <View style={{ alignItems: "center" }}>
        <ButtonGroup
          onPress={handleOnPress}
          selectedIndex={selectedIndex}
          buttons={buttons}
          containerStyle={{ width: 250, borderWidth: 0 }}
          innerBorderStyle={{ color: AppStyles.color.steedDarkBlue, width: 10 }}
          selectedButtonStyle={{
            backgroundColor: AppStyles.color.steedDarkBlue,
          }}
          buttonStyle={{
            backgroundColor: AppStyles.color.steedDarkBlue,
          }}
          textStyle={{
            color: AppStyles.color.steedDarkGrey,
            fontWeight: "bold",
            fontSize: 15
          }}
          selectedTextStyle={{
            color: AppStyles.color.steedWhite,
            textDecorationLine: "underline",
          }}
        />
        <View style={{ width: Dimensions.get("window").width - 30, marginBottom:10}}>
          <Text style={{textAlign:"center"}}>
            Check the leaderboard to see where you stand based on past predictions
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
            Score
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
