import React from "react";
import { LinearProgress, Icon, ListItem } from "react-native-elements";
import { View } from "react-native";
import AppStyles from "../../AppStyles";
import { ScrollView } from "react-native-gesture-handler";

export default () => {
  const list = [
    {
      title: "The Toorak King",
      subtitle: "Highest accuracy on Toorak homes",
      accuracy: 0.87,
    },
    {
      title: "Sydney Savvy",
      subtitle: "No one prediction Sydney homes like you",
      accuracy: 0.97,
    }
  ];

  return (
    <ScrollView>
      <View style={{ marginTop: 10 }}>
        {list.map((item, i) => (
          <ListItem
            key={i}
            containerStyle={{
              backgroundColor: AppStyles.color.steedBlue,
              height: 100,
              marginBottom: 10,
              borderRadius: 10,
            }}
            noIcon={true}
          >
            <Icon
              name="local-police"
              iconStyle={{ color: AppStyles.color.steedGreen }}
            />
            <ListItem.Content>
              <ListItem.Title
                style={{
                  textAlign: "left",
                  fontSize: 15,
                  fontWeight: "bold",
                  color: AppStyles.color.steedGreen,
                  marginBottom:5
                }}
              >
                {item.title}
              </ListItem.Title>
              <ListItem.Subtitle
                style={{
                  textAlign: "left",
                  fontSize: 13,
                  color: AppStyles.color.steedGreen,
                  marginBottom:5
                }}
              >
                {item.subtitle}
              </ListItem.Subtitle>
              <ListItem.Subtitle
                style={{
                  textAlign: "left",
                  fontSize: 13,
                  color: AppStyles.color.steedLigthGrey,
                  marginBottom:5
                }}
              >
                {`${item.accuracy} Accuracy` }
              </ListItem.Subtitle>
              <LinearProgress variant="determinate" color={AppStyles.color.steedGreen} value={item.accuracy}/>
            </ListItem.Content>
          </ListItem>
        ))}
      </View>
    </ScrollView>
  );
};
