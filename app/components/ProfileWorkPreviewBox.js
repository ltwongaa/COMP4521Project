// # COMP 4521  #  Wong Lok Tai  20434788   ltwongaa@connect.ust.hk

import React from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Text,
  Dimensions,
} from "react-native";

import colors from "../config/colors";

function ProfileWorkPreviewBox({ title, image, imageOnPress }) {
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={imageOnPress}>
        <Image style={styles.image} source={image} />
      </TouchableWithoutFeedback>
      <View style={styles.detailContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    backgroundColor: colors.white,
    marginBottom: 0,
    overflow: "hidden",
  },
  image: {
    width: Dimensions.get("window").width * 0.33,
    height: Dimensions.get("window").height * 0.33,
  },
  detailContainer: {
    alignItems: "center",
    width: Dimensions.get("window").width * 0.33,
  },
  title: {},
  author: {
    color: colors.secondary,
    fontWeight: "bold",
  },
});

export default ProfileWorkPreviewBox;
