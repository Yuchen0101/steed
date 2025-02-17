import React, { useState, useMemo, useCallback } from "react";
import {
  View,
  Animated,
  Alert,
  StyleSheet,
  Dimensions,
  ScrollView,
} from "react-native";
// import Swiper from "react-native-swiper";
import Swiper from 'react-native-swiper/src';
import { Button, Text, Image } from "react-native-elements";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import { Slider } from "@miblanchard/react-native-slider";

import { useAuthContext } from "../../context";
import { useHouseContext } from "../Game/houseContext";
import {
  IconWithText,
  getDetailPropertySummary,
  getLandSummary,
} from "../Game/IconWithText";

import AppStyles from "../../AppStyles";
import { ActivityIndicator } from "react-native";
import { numberWithCommas, toPrice } from '../../utils';

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    marginTop: 15,
  },
  // header container
  infoContainer: {
    marginBottom: 10,
    display: "flex",
    alignItems: "center",
  },
  address: {
    fontSize: 13,
    fontWeight: null,
    marginBottom: 10,
    fontWeight: "bold"
  },
  swiper: {
    height: 250,
    width: "100%",
    marginBottom: 5,
  },
  image: {
    width: "100%",
    height: 250,
    alignSelf: "center",
    borderRadius: 2,
    marginBottom: 25,
  },
  // description container
  descContainer: {
    width: "90%",
    marginBottom: 10,
  },
  headline: {
    fontSize: 17,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "left",
  },
  description: {
    fontSize: 10,
    lineHeight: 12,
    textAlign: "left",
    color: "darkgrey",
  },
  houseFeatures: {
    marginTop: 5,
    fontSize: 11,
    lineHeight: 12,
    textAlign: "center",
    color: "lightgrey",
    fontWeight: "bold"
  },
  guessContainer: {
    marginTop:10,
    width: "100%",
    marginBottom: 40,
    // display: "flex",
    alignItems: "center",
    justifyContent: 'center'
  },
  countdown: {
    marginBottom: 10,
    justifyContent: "flex-start",
    marginTop: 5,
    marginHorizontal: 40
  },
  sliderContainer: {},
  tipText: {
    alignSelf: "flex-start",
  },
  rangeValue: {
    fontSize: 12,
    paddingHorizontal: 20
  },
  range: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
  button: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 1,
    borderColor: AppStyles.color.steedGreen,
    backgroundColor: AppStyles.color.steedGreen,
    marginTop: 5,
    marginBottom: 10,
    marginHorizontal: 40
  },
  buttonTitle: {
    color: AppStyles.color.steedDarkBlue,
    fontSize: 17,
  },
});

const guessStyles = StyleSheet.create({
  container: {
    width: 330,
  },
  thumb: {
    alignItems: "center",
    backgroundColor: "white",
    height: 60,
    width: 8,
  },
  track: {
    height: 45,
    borderColor: "#fff",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderRightWidth: 0,
    borderLeftWidth: 0,
  },
});

// timeElapsed
let pre = -1;
const UrgeWithPleasureComponent = ({ onComplete }) => {
  return (
    <CountdownCircleTimer
      isPlaying
      duration={20}
      size={70}
      strokeWidth={8}
      colors={[
        [AppStyles.color.steedGreen, 0.4],
        ["#F7B801", 0.4],
        ["#A30000", 0.2],
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
            <Text style={{ fontSize: 20 }}>{remainingTime}</Text>
            {/* <Text style={{marginTop: 3}}>seconds</Text> */}
          </View>
        </Animated.View>
      )}
    </CountdownCircleTimer>
  );
};

export default ({ navigation, route }) => {
  const { id } = route.params;
  const { carouselItems } = useHouseContext();
  const { authFetch } = useAuthContext();
  const houseDetail = carouselItems.filter((item) => item._id === id)[0];
  // price
  const [value, setValue] = useState(
    parseInt((houseDetail.min_price + houseDetail.max_price) / 2)
  );
  const propertySummary = useMemo(() => getDetailPropertySummary(houseDetail), []);
  const landSummary = useMemo(() => getLandSummary(houseDetail), []);

  const scrollHeight = useMemo(() => Dimensions.get("window").height - 140, []);
  const CustomThumb = useCallback(() => {
    return <View style={guessStyles.thumb}></View>;
  }, []);

  const onGuessPress = () => {
    authFetch("POST", "/api/make_prediction", {
      prop_id: id,
      prediction: value,
    })
      .then((res) => {
        navigation.replace("GameResult", { ...res, duration: pre, value, id });
      })
      .catch(() => {
        Alert.alert("Error", "Make predication failed", [
          {
            text: "Try later",
            onPress: () => console.log("Try later pressed"),
          },
        ]);
      });
  };

  return (
    <View style={{ ...styles.container, height: scrollHeight }}>
      <ScrollView contentContainerStyle={{ alignItems: "center" }}>
        <View style={styles.swiper}>
          <Swiper loop={true}>
            {houseDetail.media.map((item, idx) => {
              return (
                <View style={styles.image} key={idx}>
                  <Image source={{ uri: item.url }} style={styles.image} PlaceholderContent={<ActivityIndicator />} />
                </View>
              );
            })}
          </Swiper>
        </View>
        <View style={styles.infoContainer}>

          <Text style={styles.address}>{houseDetail.address}</Text>

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
          <View
            style={{
              flexDirection: "row",
              marginTop: 10,
              paddingHorizontal: 5,
              marginBottom: 10
            }}
          >
            {landSummary.map((item, idx) => (
              <IconWithText key={idx} {...item} />
            ))}
          </View>

          <View style={styles.descContainer}>
            <Text style={styles.headline}>{houseDetail.headline}</Text>
            <Text style={styles.description}>
              {houseDetail.summaryDescription}
            </Text>
            <Text style={styles.houseFeatures}>
              {houseDetail.features}
            </Text>
          </View>


        </View>



      </ScrollView>

      <View style={styles.guessContainer}>
        <View>
          <View style={{ marginBottom: 15 }}>
            {/* <Text style={{ ...styles.tipText, fontSize: 12 }}>
              Enter House Sold Price
            </Text>
            <Text
              style={{ ...styles.tipText, fontSize: 10, fontStyle: "italic" }}
            >
              (slide left-right)
            </Text> */}
            <Text style={{ fontSize: 15, fontWeight: "bold" }}>${toPrice(value)}</Text>
          </View>
          <Slider
            animateTransition
            containerStyle={guessStyles.container}
            renderThumbComponent={CustomThumb}
            trackStyle={guessStyles.track}
            maximumTrackTintColor={AppStyles.color.steedDarkBlue}
            minimumTrackTintColor={AppStyles.color.transparentGreen}
            maximumValue={parseInt(houseDetail.max_price)}
            minimumValue={parseInt(houseDetail.min_price)}
            step={1000}
            value={value}
            onValueChange={(value) => {
              setValue(value[0]);
            }}
          />
        </View>
        <View style={styles.range}>
          <Text style={styles.rangeValue}>
            ${toPrice(parseInt(houseDetail.min_price))}
          </Text>
          {/* <Text style={styles.rangeValue}>{value}</Text> */}
          <Text style={styles.rangeValue}>
            ${toPrice(parseInt(houseDetail.max_price))}
          </Text>
        </View>

        <View style={{ flexDirection: "row", marginBottom: 0, marginTop: 0 }}>
          <View style={styles.countdown} >
            <UrgeWithPleasureComponent onComplete={onGuessPress} />
          </View>
          <View>
            <Button
              title="PUNT!"
              buttonStyle={styles.button}
              titleStyle={styles.buttonTitle}
              onPress={onGuessPress}
            />
          </View>
        </View>

      </View>

    </View>
  );
};
