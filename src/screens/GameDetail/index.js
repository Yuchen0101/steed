import React, { useState, useMemo, useCallback } from "react";
import { View, Animated, Alert, StyleSheet, Dimensions, ScrollView } from "react-native";
import Swiper from 'react-native-swiper';
import { Button, Text, Image } from "react-native-elements";
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import { Slider } from "@miblanchard/react-native-slider";

import { useAuthContext } from "../../context";
import { useHouseContext } from '../Game/houseContext';
import { IconWithText, getPropertySummary } from '../Game/IconWithText';

import AppStyles from "../../AppStyles";

const styles = StyleSheet.create({
  container: {
    padding: 15,
    marginTop: 15,
    display: "flex",
    alignItems: "center",
  },
  // header container
  infoContainer: {
    marginBottom: 35,
    display: "flex",
    alignItems: "center",
  },
  address: {
    fontSize: 19,
    fontWeight: "bold",
    marginBottom: 30,
  },
  swiper: {
    height: 160,
    width: 280,
    marginBottom: 5,
  },
  image: {
    width: 280,
    height: 155,
    alignSelf: "center",
    borderRadius: 18,
    marginBottom: 25
  },
  // description container
  descContainer: {
    width: "80%",
    marginBottom: 30
  },
  headline: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "left"
  },
  description: {
    fontSize: 10,
    lineHeight: 12,
    textAlign: "left",
    color: "darkgrey",
  },
  guessContainer: {
    width: 330,
    marginBottom: 15,
    display: "flex",
    alignItems: "center",
  },
  countdown: {
    marginBottom: 25
  },
  sliderContainer: {},
  tipText: {
    alignSelf: "flex-start"
  },
  range: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  rangeValue: {
    fontSize: 10
  },
  button: {
    width: 120,
    height: 45,
    backgroundColor: AppStyles.color.steedGreen,
    marginTop: 15
  },
  buttonTitle: {
    color: AppStyles.color.steedDarkBlue,
    fontSize: 17
  },
});

const guessStyles = StyleSheet.create({
  container: {
    width: 330,
  },
  thumb: {
      alignItems: "center",
      backgroundColor: "white",
      height: 65,
      width: 2,
  },
  track: {
    height: 50,
    borderColor: "#fff",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderRightWidth: 0,
    borderLeftWidth: 0
  },
});

// timeElapsed
let pre = -1;
const UrgeWithPleasureComponent = ({ onComplete }) => {
  return (
    <CountdownCircleTimer
      isPlaying
      duration={20}
      size={80}
      strokeWidth={2}
      colors={[
        [AppStyles.color.steedGreen, 0.4],
        ['#F7B801', 0.4],
        ['#A30000', 0.2],
      ]}
      onComplete={() => onComplete()}
      renderAriaTime={({ elapsedTime }) => {
        const time = parseInt(elapsedTime);
        if (time !== pre) {
          pre = time;
        }
      }}
    >
      {({ remainingTime, animatedColor }) => (
        <Animated.View style={{ color: animatedColor }}>
          <View>
            {/* <Text style={{marginBottom: 3}}>Remaining</Text> */}
            <Text>{remainingTime}s</Text>
            {/* <Text style={{marginTop: 3}}>seconds</Text> */}
          </View>
        </Animated.View>
      )}
    </CountdownCircleTimer>
  );
}

export default ({ navigation, route }) => {

  const { id } = route.params;
  const { carouselItems } = useHouseContext();
  const { authFetch } = useAuthContext();
  const houseDetail = carouselItems.filter(item => item._id === id)[0];

  // price
  const [value, setValue] = useState(5);
  const propertySummary = useMemo(() => getPropertySummary(houseDetail), []);
  const scrollHeight = useMemo(() => Dimensions.get("window").height - 140, []);

  const CustomThumb = useCallback(() => {
    return <View style={guessStyles.thumb}></View>
  }, []);

  const onGuessPress = () => {
    authFetch("POST", "/api/make_prediction", {
      'prop_id': id,
      'prediction': value,
    }).then((res) => {
      navigation.replace("GameResult", {...res, duration: pre, id});
    }).catch(() => {
      Alert.alert(
        "Error",
        "Make predication failed",
        [
          {
            text: "Try later",
            onPress: () => console.log("Try later pressed")
          }
        ]
      );
    });
  }

  return (
    <View style={{...styles.container, height: scrollHeight}}>
      <ScrollView contentContainerStyle={{alignItems: 'center'}}>
        <View style={styles.infoContainer}>
          <Text style={styles.address}>{houseDetail.address}</Text>
          <View style={styles.swiper}>
            <Swiper loop={false}>
              {
                houseDetail.media.map(item => {
                  return (
                    <View style={styles.image}>
                      <Image
                        source={{uri: item.url}}
                        style={styles.image}
                      />
                    </View>
                  )
                })
              }
            </Swiper>
          </View>
          <View
            style={{
              flexDirection: "row",
              paddingHorizontal: 5,
            }}
          >
            {propertySummary.map((item, idx) => (
              <IconWithText key={idx} icon={item.icon} text={item.text} />
            ))}
          </View>
        </View>
        <View style={styles.descContainer}>
          <Text style={styles.headline}>{houseDetail.headline}</Text>
          <Text style={styles.description}>{houseDetail.summaryDescription}</Text>
        </View>
        <View style={styles.guessContainer}>
          <View style={styles.countdown}>
            <UrgeWithPleasureComponent onComplete={onGuessPress} />
          </View>
          <View>
            <View style={{marginBottom: 15}}>
              <Text style={{...styles.tipText, fontSize: 12}}>Enter House Sold Price</Text>
              <Text style={{...styles.tipText, fontSize: 10, fontStyle: 'italic'}}>(slide left-right)</Text>
            </View>
            <Slider
              animateTransition
              containerStyle={guessStyles.container}
              renderThumbComponent={CustomThumb}
              trackStyle={guessStyles.track}
              maximumTrackTintColor={AppStyles.color.steedDarkBlue}
              minimumTrackTintColor={AppStyles.color.transparentGreen}
              maximumValue={10}
              minimumValue={1}
              step={1}
              value={value}
              onValueChange={value => setValue(value)}
            />
          </View>
          <View style={styles.range}>
            <Text style={styles.rangeValue}>1</Text>
            <Text style={styles.rangeValue}>{value}</Text>
            <Text style={styles.rangeValue}>10</Text>
          </View>
        </View>
        <View>
          <Button
            title="PUNT!"
            buttonStyle={styles.button}
            titleStyle={styles.buttonTitle}
            onPress={onGuessPress}
            />
        </View>
      </ScrollView>
    </View>
  );
};
