import React, { useMemo } from "react";
import { View, ScrollView, Dimensions } from "react-native";
import { Text, Button } from "react-native-elements";
import { ActivityIndicator } from "react-native-paper";

import AppStyles from "../../AppStyles";
import { useHouseContext } from './houseContext';
import CustomCarousel from './CustomCarousel';

const WELCOME_TITLE = 'Welcome';
const WELCOME_CONTENT = 'We have curated a list of properties that may be of high interest to you.'
  + 'Swipe through the cards to see which one catches your interest and then click to predict the last sold price';

export default ({
  navigation,
  route,
}) => {

  const {
    isFetching,
    carouselItems,
    fetchItems
  } = useHouseContext();
  const scrollHeight = useMemo(() => Dimensions.get("window").height - 140, []);

  if(isFetching) {
    return (
      <View style={{height:scrollHeight, justifyContent:"center"}}>
        <ActivityIndicator/>
      </View>
    );
  }

  return (
    <View style={{height: scrollHeight}}>
      <ScrollView contentContainerStyle={{alignItems: 'center'}}>
        <View>
          <Text h3>{WELCOME_TITLE}</Text>
          <Text
            style={{
              color: AppStyles.color.steedDarkGrey,
              textAlign: "justify",
              paddingHorizontal: 20,
            }}
          >
            {WELCOME_CONTENT}
          </Text>
        </View>
        <CustomCarousel carouselItems={carouselItems} showLoading={isFetching} />
        <Button
          title="Redeal"
          buttonStyle={{
            backgroundColor: AppStyles.color.steedGreen,
            width: 120,
          }}
          titleStyle={{ color: AppStyles.color.steedDarkBlue, fontSize: 15 }}
          containerStyle={{ marginTop: 15 }}
          onPress={() => fetchItems()}
        ></Button>
      </ScrollView>
    </View>
  );
};
