import React from "react";
import { LinearProgress, Icon, ListItem } from "react-native-elements";
import { View } from "react-native";
import AppStyles from "../../AppStyles";
import { ScrollView } from "react-native-gesture-handler";

export default ({ badges }) => {
  const list = badges.map((item) => ({
    title: item.name,
    subtitle: item.description,
    accuracy: item?.accuracy,
    color: item.achieved
      ? AppStyles.color.steedGreen
      : AppStyles.color.steedWhite,
    date: item.date,
  }));

  return (
      <ScrollView>
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
            <Icon name="local-police" iconStyle={{ color: item.color }} />
            <ListItem.Content>
              <ListItem.Title
                style={{
                  textAlign: "left",
                  fontSize: 15,
                  fontWeight: "bold",
                  color: item.color,
                  marginBottom: 5,
                }}
              >
                {item.title}
              </ListItem.Title>
              <ListItem.Subtitle
                style={{
                  textAlign: "left",
                  fontSize: 13,
                  color: item.color,
                  marginBottom: 5,
                }}
              >
                {item.subtitle}
              </ListItem.Subtitle>
              {item.accuracy && (
                <>
                  <ListItem.Subtitle
                    style={{
                      textAlign: "left",
                      fontSize: 13,
                      color: item.color,
                      marginBottom: 5,
                    }}
                  >
                    {`${item.accuracy} Accuracy  |  ${item.date}`}
                  </ListItem.Subtitle>
                  <LinearProgress
                    variant="determinate"
                    color={item.color}
                    value={item.accuracy}
                  />
                </>
              )}
            </ListItem.Content>
          </ListItem>
        ))}
      </ScrollView>
  );
};
