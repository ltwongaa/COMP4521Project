// # COMP 4521  #  Wong Lok Tai  20434788   ltwongaa@connect.ust.hk

import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import colors from "../config/colors";

function AppButton({ title, onPress, color = "primary", style }) {
  return (
    <TouchableOpacity
      style={[styles.button, style, { backgroundColor: colors[color] }]}
      onPress={onPress}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    width: "100%",
    marginVertical: 10,
  },
  text: {
    color: colors.black,
    fontSize: 18,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
});
export default AppButton;
