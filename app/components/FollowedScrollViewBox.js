// # COMP 4521  #  Wong Lok Tai  20434788   ltwongaa@connect.ust.hk

import React from "react";
import {
  View,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

import colors from "../config/colors";

function ScrollViewBox({ title, data, authorIcon, authorIconStyle, author }) {
  return (
    <>
      <TouchableWithoutFeedback onPress={() => console.log({ title })}>
        <View style={styles.headingContainer}>
          {authorIcon && <Image style={authorIconStyle} source={authorIcon} />}
          <Text style={styles.headingText}>{author}</Text>
          <View style={styles.moreContainer}>
            <Text style={styles.more}>More</Text>
            <AntDesign name="right" style={styles.rightIcon} size={25} />
          </View>
        </View>
      </TouchableWithoutFeedback>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
      >
        {data.map((item) => (
          <View key={item.id} style={styles.box}>
            <TouchableWithoutFeedback
              style={styles.image}
              onPress={() => {
                console.log(item);
              }}
            >
              <Image style={styles.image} source={item.image} />
            </TouchableWithoutFeedback>
          </View>
        ))}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  headingContainer: {
    alignItems: "center",
    flexDirection: "row",
  },
  headingText: {
    fontSize: 20,
  },
  moreContainer: {
    position: "absolute",
    end: 0,
    flexDirection: "row",
    alignItems: "center",
  },
  more: {
    fontSize: 18,
    color: colors.lightskyblue,
    marginRight: 5,
  },
  rightIcon: { color: colors.lightskyblue },
  box: {
    backgroundColor: colors.white,
    flexDirection: "row",
  },
  image: {
    borderRadius: 15,
    width: Dimensions.get("window").width * 0.35,
    height: Dimensions.get("window").height * 0.35,
    marginRight: 10,
  },
  scrollView: {
    height: Dimensions.get("window").height * 0.35,
    marginBottom: 30,
  },
});

export default ScrollViewBox;
