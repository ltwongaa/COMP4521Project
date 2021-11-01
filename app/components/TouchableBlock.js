// # COMP 4521  #  Wong Lok Tai  20434788   ltwongaa@connect.ust.hk

import React from "react";
import { View, Text, StyleSheet, TouchableHighlight } from "react-native";

import colors from "../config/colors";

function TouchableBlock({ title, onPress }) {
  return (
    <TouchableHighlight style={styles.touchableHighlight} onPress={onPress}>
      <View style={styles.container}>
        <Text style={styles.text}>{title}</Text>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    padding: 20,
    backgroundColor: colors.white,
    marginBottom: 1,
    marginTop: 1,
  },
  text: {
    fontSize: 20,
    color: "black",
  },
  touchableHighlight: {
    backgroundColor: colors.grey,
  },
});

export default TouchableBlock;
