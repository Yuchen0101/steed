import React from "react";
import { View } from "react-native";
import AppStyles from "../../AppStyles";
import ScreenContainer from "../../components/ScreenContainer";
import { ListItem, Icon, Button } from "react-native-elements";
import { ScrollView } from "react-native";
import { Dimensions } from "react-native";
import { Alert } from 'react-native'
import { AuthContext } from "../../context";

export default ({ navigation }) => {
  const {signOut} = React.useContext(AuthContext)
  const list = [
    {
      title: "Profile",
      subtitle:
        "Manage your profile picture, personal details, privacy and account information",
      icon: "person-outline",
      color: AppStyles.color.steedDarkBlue,
      route: "Profile",
    },
    {
      title: "Notification",
      subtitle: "Manage your notification",
      icon: "notifications-none",
      color: AppStyles.color.steedBlue,
      route: "Notification",
    },
    {
      title: "Change Password",
      subtitle: "Change you password",
      icon: "lock",
      color: AppStyles.color.steedDarkGrey,
      route: "ChangePassword",
    }
  ];

  const scrollHeight = Dimensions.get("window").height - 60 - 120;

  return (
    <ScreenContainer style={{ alignItems: "stretch" }}>
      <View style={{height:scrollHeight}}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          {list.map((item, i) => (
            <ListItem
              key={i}
              containerStyle={{
                backgroundColor: item.color,
                height: 120,
              }}
              onPress={() => navigation.push(item.route)}
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
                    marginBottom: 10,
                  }}
                >
                  {item.title}
                </ListItem.Title>
                <ListItem.Subtitle
                  style={{
                    textAlign: "left",
                    fontSize: 15,
                    color: AppStyles.color.steedWhite,
                  }}
                >
                  {item.subtitle}
                </ListItem.Subtitle>
              </ListItem.Content>
              <ListItem.Chevron color="white"/>
            </ListItem>
          ))}

          <ListItem
            containerStyle={{
              backgroundColor: "#ced6f3",
              height: 120,
            }}
            onPress={()=>{
              Alert.alert(
                  ('Logout'),
                  ('Are you sure you want to logout?'),
                  [
                    {
                      text: ('Ok'),
                      onPress: async () => signOut()
                    },
                    {text: ('Cancel'), style: 'cancel'},
                  ],
                  {
                    cancelable: false,
                  },
                );
              }
            }
          >
            <Icon
              name="logout"
              iconStyle={{ color: AppStyles.color.steedWhite }}
            />
            <ListItem.Content>
              <ListItem.Title
                style={{
                  textAlign: "left",
                  fontSize: 20,
                  fontWeight: "bold",
                  color: AppStyles.color.steedWhite,
                  marginBottom: 10,
                }}
              >
                Logout
              </ListItem.Title>
              <ListItem.Subtitle
                style={{
                  textAlign: "left",
                  fontSize: 15,
                  color: AppStyles.color.steedWhite,
                }}
              >
                Logout and go back to Login page
              </ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron color="white"/>
          </ListItem>
        </ScrollView>
      </View>
    </ScreenContainer>
  );
};
