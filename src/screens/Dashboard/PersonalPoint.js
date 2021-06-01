import React from "react";
import { Text } from "react-native-elements";
import { Dimensions, ScrollView, View } from "react-native";
import AppStyles from "../../AppStyles";
import { BarChart } from "react-native-chart-kit";

const ScoreItem = ({ value, title }) => (
  <View style={{ flexDirection: "row", marginBottom:10}}>
    <View style={{flex:1, textAlign:"left"}}></View>
    <Text style={{flex:1, textAlign:"left", fontWeight:"bold",  fontSize:15, color:AppStyles.color.steedGreen}}>{value}</Text>
    <Text style={{flex:4}}>{title}</Text>
  </View>
);

export default () => {
  const points_hist = {
    highest_points: 509,
    average_points: 300,
    total_redeemed: 459,
    hist: [345, 509, 102, 342, 230, 120, 349],
  };

  return (
    <ScrollView>
       <View style={{backgroundColor:AppStyles.color.steedBlue, marginVertical:10, paddingVertical:10, borderRadius:20}}>
      <BarChart
        data={{
          labels: ["M", "T", "W", "T", "F", "S", "S"],
          datasets: [
            {
              data: points_hist.hist,
            },
          ],
        }}
        width={Dimensions.get("window").width - 16}
        height={250}
        showValuesOnTopOfBars={true}
        withInnerLines={false}
        withHorizontalLabels={false}
        chartConfig={{
          backgroundGradientFromOpacity: 0,
          backgroundGradientToOpacity: 0,
          fillShadowGradientOpacity: 1,
          decimalPlaces: 0,
          barPercentage: 1,
          color: () => AppStyles.color.steedGreen,
          style: {
            borderRadius: 16,
          },
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16,
          paddingRight: 5,
        }}
      />
      <ScoreItem value={points_hist.total_redeemed} title="Total Challenges Joined" />
      <ScoreItem value={points_hist.highest_points} title="Highest Points per Day" />
      <ScoreItem value={points_hist.average_points} title="Average Points per Day" />
    </View>

    </ScrollView>
  );
};
