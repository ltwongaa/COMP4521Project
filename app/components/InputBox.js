// # COMP 4521  #  Wong Lok Tai  20434788   ltwongaa@connect.ust.hk

import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../config/colors";

function InputBox({
  placeholder,
  iconName,
  style,
  defaultValue,
  ...textInputProps
}) {
  return (
    <View style={[styles.Container, style]}>
      {iconName && <MaterialCommunityIcons size={25} name={iconName} />}
      <TextInput
        style={styles.input}
        placeholderTextColor={colors.mediun}
        placeholder={placeholder}
        {...textInputProps}
      >
        {defaultValue}
      </TextInput>
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    backgroundColor: colors.light,
    borderRadius: 25,
    flexDirection: "row",
    padding: 15,
    marginVertical: 10,
  },
  input: { marginLeft: 10, paddingLeft: 10, width: "100%" },
});

export default InputBox;
