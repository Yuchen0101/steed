import React, { useCallback, useState, useMemo } from "react";
import { View, ScrollView, StyleSheet, Alert, Dimensions, Image } from "react-native";
import { Button, Text } from 'react-native-elements';
import ScreenContainer from "../../components/ScreenContainer";
import AppStyles from "../../AppStyles";
import { SelectMultipleButton, SelectMultipleGroupButton } from "react-native-selectmultiple-button";



const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    marginTop: 15,
    alignItems: "center"
  },
  scrollContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 30,
    width:"95%"
  },
  header: {
    height: 90,
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  image: {
    resizeMode: "contain",
    height: 330,
    width: 330
  },
  buttonContainer: {
    marginTop: 20,
    marginBottom: 120,
    flexDirection: "row", 
  },
  backButton: {
    width: 150,
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: AppStyles.color.steedGreen,
    backgroundColor: AppStyles.color.steedGreen,
    marginBottom: 5, 
    marginHorizontal:10
  }
})

const textStyle = StyleSheet.create({
  intro: {
    marginTop: 10,
    color: AppStyles.color.steedDarkGrey,
    fontSize: 14
  },
  state: {
    padding: 10,
    textAlign: "left",
    fontSize: 19,
    color: AppStyles.color.steedGreen,
    fontWeight: "bold"
  },
  buttonTitle: {
    color: AppStyles.color.steedDarkBlue
  }
})



export default ({ navigation }) => {
  const onClick = () => {
    console.log(selectedValues);
    navigation.navigate('Game');
  }
  const selectedIds = [0, 1, 2, 3, 4];
  const [selectedValues, setSelectedValues] = useState(["Southern Metro", "Western Metro", "Northern Metro", "South Eastern Metro", "Eastern Metro"]);
  const multipleGroupData = [
    { value: "Southern Metro" },
    { value: "Western Metro" },
    { value: "Northern Metro" },
    { value: "South Eastern Metro" },
    { value: "Eastern Metro" },
    { value: "Regional" },
  ];
  
  const scrollHeight = Dimensions.get("window").height - 340;

  return (
    <ScreenContainer>
      <View style={styles.header}>
        <Text h3>Select Interests</Text>
        <Text style={textStyle.intro}>
          Select Property areas that is of interest to you.
        </Text>
      </View>
      <View style={{ height: scrollHeight}}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
        >
          <Text style={textStyle.state}>Victoria, Melbourne Region</Text>
          <SelectMultipleGroupButton
            defaultSelectedIndexes={selectedIds}
            containerViewStyle={{ justifyContent: "center" }}
            highLightStyle={{
              borderColor: "gray",
              backgroundColor: "transparent",
              textColor: "gray",
              borderTintColor: AppStyles.color.steedGreen,
              backgroundTintColor: "transparent",
              textTintColor: AppStyles.color.steedGreen
            }}
            onSelectedValuesChange={selectedValues =>
              setSelectedValues(selectedValues)
            }
            group={multipleGroupData}
          />
          <View style={{alignItems: "center"}}>
            <Image 
              style={styles.image}
              source={require('../../../assets/vic_regions.png')}
            />
          </View>

        </ScrollView>
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title='Near me'
          titleStyle={textStyle.buttonTitle}
          type='outline'
          buttonStyle={styles.backButton}
          onPress={onClick}
        />
        <Button
          title="Save Changes"
          titleStyle={textStyle.buttonTitle}
          type="outline"
          buttonStyle={styles.backButton}
          onPress={onClick}
        />
      </View>
    </ScreenContainer>


  );
};