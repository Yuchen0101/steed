import React from "react";
import { View } from "react-native";
import AppStyles from "../../AppStyles";
import ScreenContainer from "../../components/ScreenContainer";
import { ListItem, Icon } from "react-native-elements";

export default ({ navigation }) => {
  const list = [
    {
      title: "Profile",
      subtitle:
        "Manage your profile picture, personal details, privacy and account information",
      icon: "person-outline",
      color: AppStyles.color.steedDarkBlue,
      route:"Profile"
    },
    {
      title: "Interests",
      subtitle:
        "Update your interests across the 17 UN sustainable development goals",
      icon: "favorite-border",
      color: AppStyles.color.steedBlue,
      route:"Interest"
    },
    {
      title: "Notification",
      subtitle: "Manage your notification",
      icon: "notifications-none",
      color: AppStyles.color.steedDarkGrey,
      route:"Notification"
    },
  ];

  return (
    <ScreenContainer
      style={{ alignItems: "stretch", justifyContent: "flex-start" }}
    >
      <View style={{ marginTop: 30}}>
        {list.map((item, i) => (
          <ListItem
            key={i}
            containerStyle={{
              backgroundColor: item.color,
              height: 150,
            }}
            onPress={()=>navigation.push(item.route)}
          >
            <Icon
              name={item.icon}
              iconStyle={{ color: AppStyles.color.steedWhite }}
            />
            <ListItem.Content>
              <ListItem.Title
                style={{
                  textAlign: "left",
                  fontSize: 20,
                  fontWeight: "bold",
                  color: AppStyles.color.steedWhite,
                  marginBottom:10
                }}
              >
                {item.title}
              </ListItem.Title>
              <ListItem.Subtitle style={{ textAlign: "left", fontSize: 15 ,color: AppStyles.color.steedWhite}}>
                {item.subtitle}
              </ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
        ))}
      </View>
    </ScreenContainer>
  );
};
