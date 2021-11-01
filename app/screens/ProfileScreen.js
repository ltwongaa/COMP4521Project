// # COMP 4521  #  Wong Lok Tai  20434788   ltwongaa@connect.ust.hk

import React, { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import firebase from "firebase";
require("firebase/firestore");

import Screen from "../components/Screen";
import ScrollViewBox from "../components/ScrollViewBox";
import colors from "../config/colors";

function ProfileScreen({ navigation, route }) {
  const [userIcon, setUserIcon] = useState("");
  const [userContact, setUserContact] = useState("");
  const [userAbout, setUserAbout] = useState("");
  const [userName, setUserName] = useState("");
  const [listing, setListing] = useState([]);
  const [followStatus, setFollowStatus] = useState(false);

  useEffect(() => {
    firebase
      .firestore()
      .collection("Followings")
      .doc(firebase.auth().currentUser.uid)
      .collection("followings")
      .where("Uid", "==", route.params.Uid)
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.docs.length > 0) setFollowStatus(true);
      });

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
          setUserContact(data.contact);
          setUserAbout(data.about);
        });

        firebase
          .firestore()
          .collection("Works")
          .doc(route.params.Uid)
          .collection("userWorks")
          .orderBy("createdAt", "asc")
          .get()
          .then((snapshot) => {
            const internalListing = [];
            snapshot.forEach((doc) => {
              const data = doc.data();
              data.id = doc.id;
              internalListing.push(data);
            });
            setListing(internalListing);
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
  }, []);

  const onFollowPress = () => {
    firebase
      .firestore()
      .collection("Followings")
      .doc(firebase.auth().currentUser.uid)
      .collection("followings")
      .doc(route.params.Uid)
      .set({ Uid: route.params.Uid });

    console.log("followed");
    setFollowStatus(true);
  };

  const onUnfollowPress = () => {
    firebase
      .firestore()
      .collection("Followings")
      .doc(firebase.auth().currentUser.uid)
      .collection("followings")
      .doc(route.params.Uid)
      .delete();

    console.log("unfollowed");
    setFollowStatus(false);
  };

  return (
    <Screen>
      <View style={styles.screenextender} />
      <View style={styles.profileContainer}>
        {userIcon ? (
          <Image style={styles.icon} source={{ uri: userIcon }} />
        ) : (
          <Image
            style={styles.icon}
            source={require("../assets/noImage.jpg")}
          />
        )}
        <View>
          {userName ? (
            <Text style={styles.userName}>{userName}</Text>
          ) : (
            <Text style={styles.userName}>Unfound</Text>
          )}
          {!(route.params.Uid === firebase.auth().currentUser.uid) ? (
            <TouchableWithoutFeedback
              onPress={followStatus ? onUnfollowPress : onFollowPress}
            >
              {followStatus ? (
                <Text style={styles.follow}>Unfollow</Text>
              ) : (
                <Text style={styles.follow}>Follow</Text>
              )}
            </TouchableWithoutFeedback>
          ) : (
            <Text style={styles.follow}></Text>
          )}
        </View>
      </View>
      <View style={styles.container}>
        <MaterialCommunityIcons name="email-outline" size={18} />
        <Text style={styles.title}>Contact Me</Text>
      </View>
      <View style={styles.detailContainer}>
        {userContact ? (
          <Text style={styles.content}>{userContact}</Text>
        ) : (
          <Text style={styles.content}></Text>
        )}
      </View>
      <View style={styles.container}>
        <MaterialCommunityIcons name="comment-outline" size={18} />
        <Text style={styles.title}>About Me</Text>
      </View>
      <View style={styles.detailContainer}>
        {userAbout ? (
          <Text style={styles.content}>{userAbout}</Text>
        ) : (
          <Text style={styles.content}></Text>
        )}
      </View>

      <TouchableWithoutFeedback
        onPress={() =>
          navigation.navigate("ProfileWorkList", {
            Uid: route.params.Uid,
          })
        }
      >
        <View style={styles.headingContainer}>
          <Text style={styles.headingText}>My works</Text>
          <View style={styles.moreContainer}>
            <Text style={styles.more}>More</Text>
            <AntDesign name="right" style={styles.rightIcon} size={25} />
          </View>
        </View>
      </TouchableWithoutFeedback>
      <View style={styles.containerGallery}>
        <FlatList
          numColumns={1}
          horizontal={true}
          data={listing}
          renderItem={({ item }) => (
            <View style={styles.box}>
              <TouchableWithoutFeedback
                style={styles.image}
                onPress={() =>
                  navigation.navigate("WorkDetail", {
                    image: item.downloadUrl,
                    Uid: route.params.Uid,
                    description: item.description,
                    title: item.title,
                    id: item.id,
                  })
                }
              >
                <Image
                  style={styles.image}
                  source={{ uri: item.downloadUrl }}
                />
              </TouchableWithoutFeedback>
            </View>
          )}
        />
      </View>
    </Screen>
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
    //paddingTop: Constants.statusBarHeight,
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
  follow: {
    color: colors.lightskyblue,
    fontSize: 15,
  },
  container: {
    paddingLeft: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    paddingLeft: 5,

    fontSize: 18,
  },
  detailContainer: {
    marginBottom: 10,
  },
  content: {
    paddingLeft: 5,
    color: colors.medium,
  },
  box: {
    backgroundColor: colors.white,
    flexDirection: "row",
    marginRight: 5,
  },
  image: {
    borderRadius: 15,
    width: Dimensions.get("window").width * 0.35,
    height: Dimensions.get("window").height * 0.35,
    marginRight: 10,
  },
  headingContainer: {
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 5,
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
});

export default ProfileScreen;
