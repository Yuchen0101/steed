import React from "react";
import { LinearProgress, ListItem,Text } from "react-native-elements";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { View } from "react-native";
import AppStyles from "../../AppStyles";


const badgeLevel = {
  0: "Diamond",
  1: "Gold",
  2: "Silver", 
  3: "Bronze",
}

const badgeColor = {
  0: AppStyles.color.badgeDiamond,
  1: AppStyles.color.badgeGold,
  2: AppStyles.color.badgeSilver,
  3: AppStyles.color.badgeBronze,
}

export default ({ badges }) => {
  const list = badges.map((item) => ({
    title: item.name,
    subtitle: item.description,
    progress: item?.progress,
    total: item?.total,
    color: badgeColor[item.level],
    level: badgeLevel[item.level],
    icon: item.icon
  }));
  if(list.length == 0) {
    return <Text style={{marginVertical:20}}>No badges yet! Play games to unlock your badges!</Text>
  }
  return (
      <View>
        {list.map((item, i) => (
          <ListItem
            key={i}
            containerStyle={{
              backgroundColor: AppStyles.color.steedBlue,
              height: 120,
              marginTop: 10,
              marginBottom: 10,
              borderRadius: 10,
            }}
            noIcon={true}
          >
            <MaterialCommunityIcons name={item.icon} color={item.color} size={30} />
            <ListItem.Content>
              <ListItem.Title
                style={{
                  textAlign: "left",
                  fontSize: 17,
                  fontWeight: "bold",
                  // color: AppStyles.color.steedGreen,
                  color: item.color,
                  marginBottom: 5,
                }}
              >
                {item.title} - {item.level}
              </ListItem.Title>
              <ListItem.Subtitle
                style={{
                  textAlign: "left",
                  fontSize: 13,
                  // color: AppStyles.color.steedGreen,
                  color: item.color,
                  marginBottom: 15,
                }}
              >
                {item.subtitle}
              </ListItem.Subtitle>
              {item.progress && (
                <>
                  <LinearProgress
                    variant="determinate"
                    color={AppStyles.color.steedGreen}
                    value={item.progress / item.total}
                  />
                  <ListItem.Subtitle
                    style={{
                      textAlign: "right",
                      alignSelf: 'stretch',
                      fontSize: 13,
                      marginEnd: 20,
                      color: AppStyles.color.steedGreen,
                      marginBottom: 2,
                      marginTop: 2,
                    }}
                  >
                    {`${item.progress} / ${item.total}`}
                  </ListItem.Subtitle>
                </>
              )}
            </ListItem.Content>
          </ListItem>
        ))}
      </View>
  );
};
