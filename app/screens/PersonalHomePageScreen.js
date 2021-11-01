// # COMP 4521  #  Wong Lok Tai  20434788   ltwongaa@connect.ust.hk

import React from "react";
import Constants from "expo-constants";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import firebase from "firebase";
require("firebase/firestore");

import colors from "../config/colors";
import TouchableBlock from "../components/TouchableBlock";
import { useState } from "react";
import { useEffect } from "react";

function PersonalHomePageScreen({ navigation }) {
  const [userName, setUserName] = useState("");
  const [userIcon, setUserIcon] = useState("");
  const logOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };
  useEffect(() => {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .collection("userInformation")
      .orderBy("changeDate", "desc")
      .limit(1)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          const data = doc.data();
          setUserIcon(data.downloadUrl);
        });
      });

    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          setUserName(snapshot.data().username);
          console.log(snapshot.data().username);
        }
      });
  }, []);

  const testlist = [
    {
      name: "ltwongaa",
      icon: require("../assets/testingpic1.jpg"),
    },
  ];
  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        Vertical
        style={{ flex: 1, backgroundColor: colors.lightgrey }}
      >
        <View style={styles.screenextender} />
        <View style={styles.profileContainer}>
          {!userIcon ? (
            <Image
              style={styles.icon}
              source={require("../assets/noImage.jpg")}
            />
          ) : (
            <Image style={styles.icon} source={{ uri: userIcon }} />
          )}
          <View>
            <Text style={styles.userName}>{userName}</Text>
            <TouchableWithoutFeedback
              onPress={() =>
                navigation.navigate("Profile", {
                  Uid: firebase.auth().currentUser.uid,
                })
              }
            >
              <Text style={styles.viewProfile}>view your profile</Text>
            </TouchableWithoutFeedback>
          </View>
        </View>

        <TouchableBlock
          title={"Your Works"}
          onPress={() =>
            navigation.navigate("ProfileWorkList", {
              Uid: firebase.auth().currentUser.uid,
            })
          }
        />
        <TouchableBlock
          title={"Liked Works"}
          onPress={() => navigation.navigate("LikedWorks")}
        />
        <View style={styles.separator} />

        <TouchableBlock
          title={"Profile Setting"}
          onPress={() => navigation.navigate("ProfileSetting")}
        />
        <TouchableBlock title={"Log out"} onPress={logOut} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screenextender: {
    backgroundColor: colors.medium,
    height: Dimensions.get("window").height,
    position: "absolute",
    top: -Dimensions.get("window").height,
    left: 0,
    right: 0,
  },
  profileContainer: {
    paddingTop: Constants.statusBarHeight,
    alignItems: "center",
    flexDirection: "row",
    padding: 15,
    backgroundColor: colors.medium,
    marginBottom: 30,
  },
  icon: {
    height: 70,
    width: 70,
    borderRadius: 35,
    marginRight: 15,
  },
  userName: {
    color: colors.white,
    fontSize: 20,
  },
  viewProfile: {
    color: colors.lightskyblue,
    fontSize: 15,
  },
  separator: { height: 70 },
});

export default PersonalHomePageScreen;
