import React from 'react';
import { View } from 'react-native';
import { Icon, Text } from "react-native-elements";

import AppStyles from "../../AppStyles";

export const IconWithText = ({ icon, text, title }) => {
    return (
        <View
            style={{
            flexDirection: "row",
            alignItems: "center",
            }}
        >
        {
            icon && <Icon name={icon} size={18} color={AppStyles.color.steedDarkGrey} />
        }
        {
            !icon && <Text style={{marginRight: 6}}>|</Text>
        }
        {
            title && (
                <Text
                    style={{
                    marginRight: 2,
                    color: AppStyles.color.steedDarkGrey,
                    }}
                >
                    {title}
                </Text>
            )
        }
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

export const getPropertySummary = (property) => ([
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
      text: property.carspaces,
    },
    {
      icon: null,
      text: property.propertyType
    },
]);

export const getLandSummary = (property) => ([
    {
        icon: "crop-square",
        title: "Land Size:",
        text: property.landArea?property.landArea:"N/A",
    },
    {
        icon: "crop-square",
        title: "Area Size:",
        text: property.buildingArea?property.buildingArea:"N/A",
    },
]);