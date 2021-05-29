import React from "react";
import { View, StyleSheet, Text } from "react-native";
import AppStyles from "../../AppStyles";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:AppStyles.color.steedDarkBlue
  }
});

const Loading = ({ children }) => (
  <View style={styles.container}><Text>Loading</Text></View>
);

export default Loading