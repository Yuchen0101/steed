import React from "react";
import ScreenContainer from "../../components/ScreenContainer";
import { Text, ButtonGroup, Icon } from "react-native-elements";
import { View } from "react-native";
import AppStyles from "../../AppStyles";
import Personal from "./Personal";
import LeaderBoard from "./LeaderBoard";
import Auth from "@aws-amplify/auth";
import { ActivityIndicator } from "react-native";
import { AuthContext } from "../../context";
import {
  ScrollView,
  RefreshControl,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { Dimensions } from "react-native";

export default () => {
  const { authFetch } = React.useContext(AuthContext);

  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [displayName, setDisplayName] = React.useState("Personal");

  const [userProfile, setUserProfile] = React.useState(null);
  const [leaderboard, setLeaderboard] = React.useState(null);
  const [refreshing, setRefreshing] = React.useState(false);

  React.useEffect(() => {
    Auth.currentUserInfo().then(user=>{
      if (user?.attributes["custom:display_name"]) {
        setDisplayName(user?.attributes["custom:display_name"]);
      }
    })
    fetchData();
  }, []);

  const fetchData = () => {
    const p1 = authFetch("GET", "/api/fetch_user_profile").then((res) =>
      setUserProfile(res)
    );
    const p2 = authFetch("GET", "/api/leaderboard").then((res) =>
      setLeaderboard(res)
    );
    return Promise.all([p1, p2]).then(() => "success");
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchData().finally(setRefreshing(false));
  }, []);

  const renderContent = () => {
    if (selectedIndex == 0 && userProfile)
      return <Personal userProfile={userProfile} />;
    if (selectedIndex == 1 && leaderboard)
      return <LeaderBoard leaderboard={leaderboard} />;
    return <ActivityIndicator />;
  };

  const scrollHeight = Dimensions.get("window").height - 60 - 100 - 120;

  return (
    <ScreenContainer>
      <View
        style={{ height: 120, paddingHorizontal: 20, paddingVertical:10}}
      >
        <Text h3>Dashboard </Text>
        <Text style={{ fontSize: 15, margin: 10 }}>
          Explore your ratings and where you stand on the leader board
        </Text>
      </View>
      <View style={{height:scrollHeight}}>
        <ScrollView
          contentContainerStyle={{ alignItems: "center" }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={AppStyles.color.steedGreen}
            />
          }
        >
          <ButtonGroup
            onPress={setSelectedIndex}
            selectedIndex={selectedIndex}
            buttons={[displayName, "Leader Board"]}
            containerStyle={{
              width: 300,
              borderWidth: 0,
              backgroundColor: AppStyles.color.steedDarkBlue,
            }}
            innerBorderStyle={{
              color: AppStyles.color.steedDarkBlue,
              width: 10,
              borderRadius: 10,
            }}
            selectedButtonStyle={{
              backgroundColor: AppStyles.color.steedDarkBlue,
              borderWidth: 2,
              borderColor: AppStyles.color.steedGreen,
            }}
            buttonStyle={{
              backgroundColor: AppStyles.color.steedBlue,
              borderRadius: 10,
            }}
            textStyle={{ color: AppStyles.color.steedDarkGrey }}
            selectedTextStyle={{ color: AppStyles.color.steedGreen }}
          />
          <View style={{marginTop:20}}>
            {renderContent()}
          </View>
        </ScrollView>
      </View>
    </ScreenContainer>
  );
};
