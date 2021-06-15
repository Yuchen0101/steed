import React from 'react';
import { View, Dimensions } from 'react-native';
import Carousel from "react-native-snap-carousel";
import { ActivityIndicator } from "react-native-paper";
import PropertyCard from "./PropertyCard";
import AppStyles from "../../AppStyles";

const renderItem = ({ item, index }) => <PropertyCard property={item} />;

export default ({carouselItems, showLoading}) => {

    const [activeIndex, setActiveIndex] = React.useState(0);
    const ref = React.useRef(null);
  
    // if(!showLoading) {
    //   return <View style={{height:350, justifyContent:"center"}}><ActivityIndicator/></View>
    // }
  
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