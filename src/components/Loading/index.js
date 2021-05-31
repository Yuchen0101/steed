import React from "react";
import { View, StyleSheet,ActivityIndicator } from "react-native";
import { Text } from 'react-native-elements';
import AppStyles from "../../AppStyles";


import Logo from "../Logo";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

const Loading = () => (
  <View style={styles.container}>
   <Logo height={120} width={120}/>
   <ActivityIndicator size="small" color={AppStyles.color.steedGreen} />
  </View>
);

export default Loading;
