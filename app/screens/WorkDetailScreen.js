// # COMP 4521  #  Wong Lok Tai  20434788   ltwongaa@connect.ust.hk

import React, { useEffect, useState } from "react";
import {
  Image,
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import firebase from "firebase";
require("firebase/firestore");

import Screen from "../components/Screen";
import colors from "../config/colors";
import { set } from "react-native-reanimated";

function WorkDetailScreen({ route, navigation }) {
  const [like, setLike] = useState(false);
  console.disableYellowBox = true;
  const [userIcon, setUserIcon] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    firebase
      .firestore()
      .collection("users")
      .doc(route.params.Uid)
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
      .doc(route.params.Uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          setUserName(snapshot.data().username);
          console.log(snapshot.data().username);
        }
      });

    firebase
      .firestore()
      .collection("AllWorks")
      .doc(route.params.id)
      .collection("likes")
      .where("uid", "==", firebase.auth().currentUser.uid)
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.docs.length > 0) setLike(true);
      });
  }, []);

  const onLikePress = () => {
    const userWorks = firebase
      .firestore()
      .collection("AllWorks")
      .doc(route.params.id);

    userWorks
      .collection("likes")
      .doc(firebase.auth().currentUser.uid)
      .set({ uid: firebase.auth().currentUser.uid })
      .then(() => {
        userWorks.update({
          likesCont: firebase.firestore.FieldValue.increment(1),
        });
      });

    firebase
      .firestore()
      .collection("Works")
      .doc(firebase.auth().currentUser.uid)
      .collection("userLikedWorks")
      .doc(route.params.id)
      .set({
        image: route.params.image,
        Uid: route.params.Uid,
        description: route.params.description,
        title: route.params.title,
        id: route.params.id,
        likedAt: firebase.firestore.FieldValue.serverTimestamp(),
      });

    console.log("liked");
    setLike(true);
  };
  const onDislikePress = () => {
    const userWorks = firebase
      .firestore()
      .collection("AllWorks")
      .doc(route.params.id);

    userWorks
      .collection("likes")
      .doc(firebase.auth().currentUser.uid)
      .delete()
      .then(() => {
        userWorks.update({
          likesCont: firebase.firestore.FieldValue.increment(-1),
        });
      });

    firebase
      .firestore()
      .collection("Works")
      .doc(firebase.auth().currentUser.uid)
      .collection("userLikedWorks")
      .doc(route.params.id)
      .delete();

    console.log("disliked");
    setLike(false);
  };

  return (
    <Screen>
      <ScrollView>
        <View>
          <TouchableWithoutFeedback
            onPress={() =>
              navigation.navigate("ImageShowing", {
                image: { uri: route.params.image },
              })
            }
          >
            <Image style={styles.image} source={{ uri: route.params.image }} />
          </TouchableWithoutFeedback>
          <View style={styles.detailContainer}>
            <Text style={styles.title}>{route.params.title}</Text>
            <TouchableWithoutFeedback
              style={styles.heart}
              onPress={like ? onDislikePress : onLikePress}
            >
              {like ? (
                <MaterialCommunityIcons
                  style={styles.heart}
                  name="heart"
                  size={60}
                  color="red"
                />
              ) : (
                <MaterialCommunityIcons
                  style={styles.heart}
                  name="heart"
                  size={60}
                  color={colors.white}
                />
              )}
            </TouchableWithoutFeedback>
            <View style={styles.authorDetailContainer}>
              <TouchableWithoutFeedback
                onPress={() =>
                  navigation.navigate("Profile", {
                    Uid: route.params.Uid,
                  })
                }
              >
                <Image source={{ uri: userIcon }} style={styles.authorIcon} />
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback
                onPress={() =>
                  navigation.navigate("Profile", {
                    Uid: route.params.Uid,
                  })
                }
              >
                <Text style={styles.author}>{userName}</Text>
              </TouchableWithoutFeedback>
            </View>
          </View>
          <View style={styles.descriptionContainer}>
            <Text style={styles.description}>{route.params.description}</Text>
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
}
const styles = StyleSheet.create({
  image: {
    width: "100%",
    // Without height undefined it won't work
    height: undefined,
    // figure out your image aspect ratio
    aspectRatio: 135 / 135,
  },
  detailContainer: {
    padding: 20,
    backgroundColor: colors.lightgrey,
  },
  title: {
    fontSize: 24,
    fontWeight: "500",
  },
  descriptionContainer: {
    marginTop: 2,
    padding: 10,
    width: "100%",
    backgroundColor: colors.lightgrey,
  },
  description: {
    color: colors.grey,
    fontSize: 20,
    marginVertical: 10,
  },
  authorDetailContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  authorIcon: {
    borderRadius: 20,
    height: 40,
    width: 40,
    marginRight: 10,
  },
  author: {
    fontSize: 18,
    color: colors.lightskyblue,
    fontWeight: "bold",
  },
  heart: { position: "absolute", top: 20, end: 10 },
});
export default WorkDetailScreen;
