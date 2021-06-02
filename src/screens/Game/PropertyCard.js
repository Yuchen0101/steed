import React from "react";
import { View, ActivityIndicator } from "react-native";
import { Icon, Text, Image } from "react-native-elements";
import { Button } from "react-native-elements/dist/buttons/Button";
import AppStyles from "../../AppStyles";

export default () => {
  const propertySummary = [
    {
      icon: "king-bed",
      text: "2",
    },
    {
      icon: "bathtub",
      text: "4",
    },
    {
      icon: "directions-car",
      text: "6",
    },
    {
      icon: null,
      text: "Apartment",
    },
  ];

  const iconNames = ["fireplace", "deck"];

  return (
    <View style={{ alignItems: "center"}}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Icon name="event" />
        <Text>Sold on May 2020</Text>
      </View>
      <View
        style={{
          marginVertical: 10,
        }}
      >
        <Image
          source={{
            uri: "https://bucket-api.domain.com.au/v1/bucket/image/2016914242_1_1_210406_051501-w3901-h2600",
          }}
          style={{ width: 200, height: 150 }}
          PlaceholderContent={<ActivityIndicator />}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          marginVertical: 10,
          backgroundColor: AppStyles.color.steedWhite,
          paddingHorizontal: 5,
        }}
      >
        {propertySummary.map((item, idx) => (
          <IconWithText key={idx} icon={item.icon} text={item.text} />
        ))}
      </View>
      <Text style={{ textAlign: "left" }}>Toorak, vic 3142</Text>
      <View
        style={{
          flexDirection: "row",
          marginVertical: 10,
          paddingHorizontal: 5,
        }}
      >
        {iconNames.map((item, key) => (
          <Icon key={key} name={item} style={{ marginRight: 10 }} />
        ))}
      </View>
    </View>
  );
};

const IconWithText = ({ icon, text }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      {icon && (
        <Icon name={icon} size={18} color={AppStyles.color.steedDarkGrey} />
      )}
      <Text
        style={{
          marginLeft: 2,
          marginRight: 10,
          color: AppStyles.color.steedDarkGrey,
        }}
      >
        {text}
      </Text>
    </View>
  );
};
