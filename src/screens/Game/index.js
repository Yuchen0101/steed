import React, { useMemo, useEffect} from "react";
import { View, ScrollView, Dimensions, StyleSheet } from "react-native";
import { Text, Button} from "react-native-elements";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { ActivityIndicator } from "react-native-paper";

import AppStyles from "../../AppStyles";
import { useHouseContext } from './houseContext';
import CustomCarousel from './CustomCarousel';
import ActionButton from 'react-native-action-button';

const WELCOME_TITLE = 'Welcome';
const WELCOME_CONTENT = 'The following properties have been selected for you based on your user profile.'
  + ' Tap one to start playing!';

const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: AppStyles.color.steedDarkBlue,
  },
});

export default ({
  navigation,
  route,
}) => {

  const {
    isFetching,
    carouselItems,
    fetchItems,
    setPropType
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
        <View style={{marginVertical:20}}>
          <Text h3>{WELCOME_TITLE}</Text>
          <Text
            style={{
              color: AppStyles.color.steedDarkGrey,
              textAlign: "justify",
              paddingHorizontal: 20,
              marginTop:10, 
              fontSize: 15
            }}
          >
            {WELCOME_CONTENT}
          </Text>
        </View>
        <CustomCarousel carouselItems={carouselItems} showLoading={isFetching} />
        {/* <Button
          title="Redeal"
          buttonStyle={{
            backgroundColor: AppStyles.color.steedGreen,
            width: 120,
          }}
          titleStyle={{ color: AppStyles.color.steedDarkBlue, fontSize: 15 }}
          containerStyle={{ marginTop: 30 }}
          onPress={() => fetchItems()}
        ></Button> */}
      </ScrollView>
      
      <View style={{flex:1, flexDirection:"row", backgroundColor: AppStyles.color.steedDarkBlue, marginBottom:130}}>
        {/* Rest of the app comes ABOVE the action button component !*/}
        <ActionButton buttonColor={AppStyles.color.steedGreen} icon={
          <MaterialCommunityIcons name="refresh" size={30} color={AppStyles.color.steedDarkGrey}/>
        }>
          <ActionButton.Item buttonColor='#9FC7FC' title="House" onPress={() => {fetchItems("house")}}>
            <MaterialCommunityIcons name="home-outline" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#3498db' title="Apartment" onPress={() => {fetchItems("apartment")}}>
            <MaterialCommunityIcons name="home-modern" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#1abc9c' title="All Types" onPress={() => {fetchItems("all")}}>
            <MaterialCommunityIcons name="home-city-outline" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
      </View>
    </View>
  );
};
