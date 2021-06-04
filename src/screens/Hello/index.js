import React from "react";
import { View } from "react-native";
import Carousel from "react-native-snap-carousel";
import { Icon, Text, Button } from "react-native-elements";
import AppStyles from "../../AppStyles";
import ScreenContainer from "../../components/ScreenContainer";
import Logo from "../../components/Logo";

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

export default ({ navigation }) => {

  return (
    <ScreenContainer>
      <Text h3 style={{ marginTop: 10 }}>
        Welcome to Steed Punt
      </Text>
      <Text h4 style={{ color: AppStyles.color.steedDarkGrey }}>
        The Game of House Value Predictions
      </Text>
      <Text
        h5
        style={{
          color: AppStyles.color.steedDarkGrey,
          marginTop: 30,
          fontStyle: "italic",
        }}
      >
        Swipe left to see how this game works.
      </Text>
      <CustomCarousel />
      <Button
        buttonStyle={{ width: 350, marginBottom: 10, marginTop: 30 }}
        type="outline"
        title="Login"
        onPress={() => navigation.push("SignIn")}
      />
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <Button
          buttonStyle={{ width: 170, margin: 5, backgroundColor:"#d53035", color:AppStyles.color.steedWhite}}
          titleStyle={{ fontSize: 10 }}
          icon={
            <Icon
              name="google"
              size={15}
              color="white"
              type="material-community"
            />
          }
          title="continue with Google"
        />
        <Button
          buttonStyle={{ width: 170, margin: 5, color:AppStyles.color.steedWhite}}
          titleStyle={{ fontSize: 10 }}
          title="continue with Facebook"
          icon={
            <Icon
              name="facebook"
              size={15}
              color="white"
              type="material-community"
            />
          }
        />
      </View>
      <Button
        type="solid"
        title="Don't have an account? Sign Up"
        onPress={() => navigation.push("SignUp")}
        buttonStyle={{
          backgroundColor: AppStyles.color.steedBlue,
          shadowOpacity: 1,
          marginTop: 10,
          width: 350
        }}
        titleStyle={{ color: AppStyles.color.steedLigthGrey }}
      />
    </ScreenContainer>
  );
};
