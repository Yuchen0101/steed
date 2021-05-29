import React from "react";
import { View, StyleSheet } from "react-native";
import AppStyles from "../../AppStyles";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:AppStyles.color.steedDarkBlue
  }
});

const ScreenContainer = ({ children }) => (
  <View style={styles.container}>{children}</View>
);

export default ScreenContainer