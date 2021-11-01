// # COMP 4521  #  Wong Lok Tai  20434788   ltwongaa@connect.ust.hk

import React from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Text,
} from "react-native";

import colors from "../config/colors";

function WorkPreviewBox({
  author,
  authorIcon,
  title,
  image,
  imageOnPress,
  authorOnPress,
}) {
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={imageOnPress}>
        <Image style={styles.image} source={image} />
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={authorOnPress}>
        <View style={styles.detailContainer}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.authorDetailContainer}>
            {authorIcon && (
              <Image source={authorIcon} style={styles.authorIcon} />
            )}
            <Text style={styles.author}>{author}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    backgroundColor: colors.white,
    marginBottom: 20,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 500,
  },
  detailContainer: {
    padding: 20,
  },
  title: {
    marginBottom: 7,
  },
  authorDetailContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  authorIcon: {
    borderRadius: 15,
    height: 30,
    width: 30,
    marginRight: 10,
  },
  author: {
    color: colors.secondary,
    fontWeight: "bold",
  },
});

export default WorkPreviewBox;
