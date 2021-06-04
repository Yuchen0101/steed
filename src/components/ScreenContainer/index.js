import React from "react";
import { StyleSheet, SafeAreaView, ScrollView } from "react-native";

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: "center",
    alignItems: "center"
  },
});

const ScreenContainer = ({ children, style }) => (
  <SafeAreaView style={{ ...styles.container, ...style }}>
  {children}
  </SafeAreaView>
);

export default ScreenContainer;
