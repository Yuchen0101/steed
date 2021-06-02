import React from "react";
import { Dimensions, View } from "react-native";
import { Text, Button } from "react-native-elements";
import AppStyles from "../../AppStyles";
import ScreenContainer from "../../components/ScreenContainer";
import Carousel from "react-native-snap-carousel";
import PropertyCard from "./PropertyCard";

const CustomCarousel = () => {
  const exampleItems = [{}, {}, {}];

  const [activeIndex, setActiveIndex] = React.useState(0);
  const [carouselItems, setCarouselItems] = React.useState(exampleItems);
  const ref = React.useRef(null);

  const renderItem = React.useCallback(
    ({ item, index }) => <PropertyCard />,
    []
  );

  return (
    <View style={{ marginTop: 10, marginBottom: 10, height: 350 }}>
      <Carousel
        layout="default"
        ref={ref}
        data={carouselItems}
        sliderWidth={Dimensions.get("window").width - 20}
        itemWidth={300}
        renderItem={renderItem}
        onSnapToItem={(index) => setActiveIndex(index)}
        slideStyle={{
          backgroundColor: AppStyles.color.steedBlue,
          paddingTop: 20,
          paddingBottom: 50,
          borderRadius: 20,
        }}
      />
    </View>
  );
};

export default ({navigation}) => {
  const welTitle = "Welcome";
  const welContent =
    "We have curated a list of properties that may be of high interest to you. Swipe through the cards to see which one catches your interest and then click to predict the last sold price";
  return (
    <ScreenContainer>
      <View>
        <Text h3>{welTitle}</Text>
        <Text
          style={{
            color: AppStyles.color.steedDarkGrey,
            textAlign: "justify",
            paddingHorizontal: 20,
          }}
        >
          {welContent}
        </Text>
      </View>
      <CustomCarousel />
      <Button
        title="Redeal"
        buttonStyle={{
          backgroundColor: AppStyles.color.steedGreen,
          width: 120,
        }}
        titleStyle={{ color: AppStyles.color.steedDarkBlue, fontSize: 15 }}
        containerStyle={{ marginTop: 15 }}
      ></Button>
      <Button
        title="Start"
        buttonStyle={{
          backgroundColor: AppStyles.color.steedGreen,
          width: 120,
        }}
        titleStyle={{ color: AppStyles.color.steedDarkBlue, fontSize: 15 }}
        containerStyle={{ marginTop: 15 }}
        onPress={()=>navigation.push("GameDetail")}
      ></Button>
    </ScreenContainer>
  );
};
