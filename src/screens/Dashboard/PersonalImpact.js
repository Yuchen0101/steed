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

export default ({impact}) => {
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
          data={[
            {
              name: "House",
              population: impact.house,
              color: "rgba(131, 167, 234, 1)",
              legendFontColor: "#7F7F7F",
              legendFontSize: 15,
            },
            {
              name: "Townhouse",
              population: impact.townhouse,
              color: "#8892b0",
              legendFontColor: "#7F7F7F",
              legendFontSize: 15,
            },
            {
              name: "Unit",
              population: impact.unit,
              color: "#ffffff",
              legendFontColor: "#7F7F7F",
              legendFontSize: 15,
            },
          ]}
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
            backgroundColor: AppStyles.color.steedLigthGrey,
            height: 1,
            marginHorizontal: 30,
            marginVertical: 15,
          }}
        />
        <View>
          <ScoreItem value={impact.house} title="House" />
          <ScoreItem value={impact.townhouse} title="Townhouse" />
          <ScoreItem value={impact.unit} title="Unit" />
        </View>
      </View>
    </View>
  );
};
