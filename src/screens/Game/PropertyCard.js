import React from "react";
import { View, ActivityIndicator } from "react-native";
import { Icon, Text, Image } from "react-native-elements";
import { Button } from "react-native-elements/dist/buttons/Button";
import AppStyles from "../../AppStyles";

export default ({ property }) => {
  const propertySummary = [
    {
      icon: "king-bed",
      text: property.bedrooms,
    },
    {
      icon: "bathtub",
      text: property.bathrooms,
    },
    {
      icon: "directions-car",
      text: property.carSpaces,
    },
    {
      icon: null,
      text: property.propertyType
    },
  ];

  const landSummary = [
    {
      icon: "crop-square",
      title: "Land Size:",
      text: property.bedrooms,
    },
    {
      icon: "crop-square",
      title: "Area Size:",
      text: property.bathrooms,
    },
  ];

  return (
    <View style={{ alignItems: "center" }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Icon name="event" />
        <Text>{`Sold on ${property.short_sold_date}`}</Text>
      </View>
      <View
        style={{
          marginVertical: 10,
        }}
      >
        <Image
          source={{
            uri: property.photos[0].fullUrl,
          }}
          style={{ width: 200, height: 150 }}
          PlaceholderContent={<ActivityIndicator />}
          containerStyle={{borderRadius:5, borderColor:AppStyles.color.steedDarkGrey, borderLeftWidth:1}}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          marginVertical: 10,
          paddingHorizontal: 5,
        }}
      >
        {propertySummary.map((item, idx) => (
          <IconWithText key={idx} icon={item.icon} text={item.text} />
        ))}
      </View>
      <Text style={{fontWeight:"600"}}>{property.short_address}</Text>
      <View
        style={{
          flexDirection: "row",
          marginVertical: 10,
          paddingHorizontal: 5,
        }}
      >
        {landSummary.map((item, idx) => (
          <IconWithText key={idx} {...item} />
        ))}
      </View>
    </View>
  );
};

const IconWithText = ({ icon, text, title }) => {
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
      {!icon && (
        <Text
          style={{
            marginRight: 6,
          }}
        >
          |
        </Text>
      )}
      {title && (
        <Text
          style={{
            marginRight: 2,
            color: AppStyles.color.steedDarkGrey,
          }}
        >
          {title}
        </Text>
      )}
      <Text
        style={{
          marginLeft: 2,
          marginRight: 8,
          fontWeight:"600"
        }}
      >
        {text}
      </Text>
    </View>
  );
};
