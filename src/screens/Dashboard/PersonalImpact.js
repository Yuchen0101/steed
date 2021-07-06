import React from "react";
import { Text } from "react-native-elements";
import { Dimensions, ScrollView, View } from "react-native";
import AppStyles from "../../AppStyles";
import { PieChart } from "react-native-chart-kit";
import { Divider } from "react-native-elements/dist/divider/Divider";

const ScoreItem = ({ value, title }) => (
  <View style={{ flexDirection: "row", marginBottom: 10 }}>
    <View style={{ flex: 1 }}></View>
    <Text
      style={{
        flex: 1,
        textAlign: "left",
        fontWeight: "bold",
        fontSize: 15,
        color: AppStyles.color.steedGreen,
      }}
    >
      {value}
    </Text>
    <Text style={{ flex: 1, textAlign: "left" }}>{title}</Text>
    <View style={{ flex: 1 }}></View>
  </View>
);

export default ({ impact }) => {
  const colors = ["#83a7ea", "#8892b0", "#ffffff","#1ee665","#eae783","#f352c1"];
  const pieData = Object.keys(impact).map((k, i) => {
    return {
      name: k,
      population: impact[k],
      color: colors[i],
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    };
  });

  if(pieData.length == 0){

    return <Text style={{marginVertical:20}}>No Impact yet! Play games to unlock your summary!</Text>
  }
  return (
    <View>
      <View
        style={{
          backgroundColor: AppStyles.color.steedBlue,
          paddingVertical: 10,
          borderRadius: 20,
        }}
      >
        <Text>Your Challenges</Text>
        <PieChart
          data={pieData}
          width={Dimensions.get("window").width - 16}
          height={220}
          chartConfig={{
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
        />
        <Divider
          style={{
            backgroundColor: AppStyles.color.steedLightGrey,
            height: 1,
            marginHorizontal: 30,
            marginVertical: 15,
          }}
        />
        <View>
          {pieData.map((el, idx) => (
            <ScoreItem ksy={idx} value={el.population} title={el.name} />
          ))}
        </View>
      </View>
    </View>
  );
};
