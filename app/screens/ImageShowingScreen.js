// # COMP 4521  #  Wong Lok Tai  20434788   ltwongaa@connect.ust.hk

import React from "react";
import { Image, StyleSheet } from "react-native";

import Screen from "../components/Screen";
import colors from "../config/colors";

function ImageShowingScreen({ route }) {
  return (
    <Screen style={styles.screen}>
      <Image style={styles.image} source={route.params.image} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.lightgrey,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});

export default ImageShowingScreen;
