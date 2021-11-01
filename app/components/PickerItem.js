// # COMP 4521  #  Wong Lok Tai  20434788   ltwongaa@connect.ust.hk

import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";

function PickerItem({ item, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.text}>{item.label}</Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  text: {
    padding: 20,
  },
});

export default PickerItem;
