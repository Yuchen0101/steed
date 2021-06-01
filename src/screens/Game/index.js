import React from "react";
import {View} from "react-native"
import { Icon, Text, Button } from "react-native-elements";
import AppStyles from "../../AppStyles";
import ScreenContainer from "../../components/ScreenContainer";
import Carousel from "react-native-snap-carousel";

const CustomCarousel = () => {
  const exampleItems = [
    {
      title: "1. we create the challenges:",
      text: "The Steed Punt app creates challenges for you to participate in",
    },
    {
      title: "2. You predict the sale price:",
      text: "You answer by predicting the last sold prices. The properties will be recently sold. Every challenge you pick will have a clock you play against. Submit your punt and get instant results",
    },
    {
      title: "3. You get Rewarded:",
      text: "You will be given your result immediately with a consolidated score and leaderboard position vs other players. Earn mor points to win prizes.",
    },
  ];

  const [activeIndex, setActiveIndex] = React.useState(0);
  const [carouselItems, setCarouselItems] = React.useState(exampleItems);
  const ref = React.useRef(null);

  const renderItem = React.useCallback(
    ({ item, index }) => (
      <View
        style={{
          backgroundColor: AppStyles.color.steedBlue,
          borderRadius: 15,
          height: 300,
          padding: 40,
          marginLeft: 25,
          marginRight: 25,
        }}
      >
        <Text
          h4
          style={{
            textAlign: "left",
            marginBottom: 20,
            color: AppStyles.color.steedGreen,
          }}
        >
          {item.title}
        </Text>
        <Text
          style={{ textAlign: "left", color: AppStyles.color.steedDarkGrey }}
        >
          {item.text}
        </Text>
      </View>
    ),
    []
  );

  return (
    <View style={{ height: 300, marginTop: 10, marginBottom: 10 }}>
      <Carousel
        layout="default"
        ref={ref}
        data={carouselItems}
        sliderWidth={400}
        itemWidth={380}
        renderItem={renderItem}
        onSnapToItem={(index) => setActiveIndex(index)}
      />
    </View>
  );
};

export default () => {
  const welTitle = "Welcome Warren";
  const welContent =
    "We have curated a list of properties that may be of high interest to you. Swipe through the cards to see which one catches your interest and then click to predict the last sold price";
  return (
    <ScreenContainer>
      <View>
        <Text h3>{welTitle}</Text>
        <Text style={{color: AppStyles.color.steedDarkGrey, textAlign:"justify", paddingHorizontal:20}}>{welContent}</Text>
      </View>
      <CustomCarousel/>
    </ScreenContainer>
  );
};
