import React, { useCallback, useMemo } from "react";
import { View, ActivityIndicator, TouchableWithoutFeedback } from "react-native";
import { Icon, Text, Image } from "react-native-elements";
import { useNavigation } from '@react-navigation/native';
import { IconWithText, getPropertySummary, getLandSummary } from './IconWithText';

import AppStyles from "../../AppStyles";

export default ({ property }) => {

  const propertySummary = useMemo(() => getPropertySummary(property), [property]);
  const landSummary = useMemo(() => getLandSummary(property), [property]);

  const navigation = useNavigation();
  const onPress = useCallback(() => {
    navigation.navigate('GameDetail', {id: property.propertyType});
  }, []);

  return (
    <TouchableWithoutFeedback onPress={onPress}>
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
          {
            landSummary.map((item, idx) => <IconWithText key={idx} {...item} />)
          }
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
