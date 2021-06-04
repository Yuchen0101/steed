import React from "react";
import { Dimensions, View } from "react-native";
import { Text, Button } from "react-native-elements";
import AppStyles from "../../AppStyles";
import ScreenContainer from "../../components/ScreenContainer";
import Carousel from "react-native-snap-carousel";
import PropertyCard from "./PropertyCard";

const CustomCarousel = () => {
  const exampleItems = [
    {
      propertyType: "House",
      bathrooms: 2,
      bedrooms: 4,
      carSpaces: 6,
      address: "3 Castlebar Road, Lockleys SA 5032",
      short_address: "Lockleys SA 5032",
      sold_date: "07/07/2020",
      short_sold_date: "May 2020",
      areaSize: 861,
      landsize: 570,
      headline: "Magnificent Estate Metres from the Beach",
      summaryDescription:
        "On approximately 800 sqm, this welcoming period home, beautifully maintained and set in mature gardens, offers relaxed family living in a tightly-held precinct close to the Yarra, walking paths and primary and secondary schools.",
      min_price: 1000000,
      max_price: 1200000,
      photos: [
        {
          imageType: "Property",
          advertId: 2016914242,
          date: "2021-04-21T00:35:22.05Z",
          fullUrl:
            "https://bucket-api.domain.com.au/v1/bucket/image/2016914242_1_1_210406_051501-w3901-h2600",
          rank: 1,
        },
      ],
    },
    {
      propertyType: "House",
      bathrooms: 2,
      bedrooms: 4,
      carSpaces: 6,
      address: "3 Castlebar Road, Lockleys SA 5032",
      short_address: "Lockleys SA 5032",
      sold_date: "07/07/2020",
      short_sold_date: "May 2020",
      areaSize: 861,
      landsize: 570,
      headline: "Magnificent Estate Metres from the Beach",
      summaryDescription:
        "On approximately 800 sqm, this welcoming period home, beautifully maintained and set in mature gardens, offers relaxed family living in a tightly-held precinct close to the Yarra, walking paths and primary and secondary schools.",
      min_price: 1000000,
      max_price: 1200000,
      photos: [
        {
          imageType: "Property",
          advertId: 2016914242,
          date: "2021-04-21T00:35:22.05Z",
          fullUrl:
            "https://bucket-api.domain.com.au/v1/bucket/image/2016914242_1_1_210406_051501-w3901-h2600",
          rank: 1,
        },
      ],
    },
    {
      propertyType: "House",
      bathrooms: 2,
      bedrooms: 4,
      carSpaces: 6,
      address: "3 Castlebar Road, Lockleys SA 5032",
      short_address: "Lockleys SA 5032",
      sold_date: "07/07/2020",
      short_sold_date: "May 2020",
      areaSize: 861,
      landsize: 570,
      headline: "Magnificent Estate Metres from the Beach",
      summaryDescription:
        "On approximately 800 sqm, this welcoming period home, beautifully maintained and set in mature gardens, offers relaxed family living in a tightly-held precinct close to the Yarra, walking paths and primary and secondary schools.",
      min_price: 1000000,
      max_price: 1200000,
      photos: [
        {
          imageType: "Property",
          advertId: 2016914242,
          date: "2021-04-21T00:35:22.05Z",
          fullUrl:
            "https://bucket-api.domain.com.au/v1/bucket/image/2016914242_1_1_210406_051501-w3901-h2600",
          rank: 1,
        },
      ],
    },
  ];

  const [activeIndex, setActiveIndex] = React.useState(0);
  const [carouselItems, setCarouselItems] = React.useState(exampleItems);
  const ref = React.useRef(null);

  const renderItem = React.useCallback(
    ({ item, index }) => <PropertyCard property={item} />,
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

export default ({ navigation }) => {
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
    </ScreenContainer>
  );
};
