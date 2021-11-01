// # COMP 4521  #  Wong Lok Tai  20434788   ltwongaa@connect.ust.hk

import React, { useEffect } from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  View,
  FlatList,
  Image,
  TouchableWithoutFeedback,
  Text,
  RefreshControl,
} from "react-native";
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";

import firebase from "firebase";
require("firebase/firestore");
import Screen from "../components/Screen";
import { useState } from "react";
import colors from "../config/colors";
const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

function HomePageScreen({ navigation }) {
  const [followings, setFollowings] = useState([]);
  const [newListing, setNewListing] = useState([]);
  const [heatListing, setHeatListing] = useState([]);
  const [followingListing, setFollowingListing] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    console.log(followings);
    /*
    if (!followings === []) {
      
      firebase
        .firestore()
        .collection("AllWorks")
        .where("authorUid", "in", followings)
        .orderBy("createdAt", "desc")
        .get()
        .then((snapshot) => {
          let works = snapshot.docs.map((doc) => {
            const data = doc.data();
            const id = doc.id;
            return { id, ...data };
          });
          console.log(works);
          setFollowingListing(works);
          
        });
       
    }
    */

    wait(2000).then(() => setRefreshing(false));
    console.log(followingListing);
  }, []);

  useEffect(() => {
    firebase
      .firestore()
      .collection("Followings")
      .doc(firebase.auth().currentUser.uid)
      .collection("followings")
      .get()
      .then((snapshot) => {
        const tempFollowing = [];
        snapshot.forEach((doc) => {
          const Uid = doc.id;
          tempFollowing.push(Uid);
        });
        console.log(tempFollowing);
        setFollowings(tempFollowing);
      });

    console.log(followings);

    firebase
      .firestore()
      .collection("AllWorks")
      .orderBy("createdAt", "desc")
      .get()
      .then((snapshot) => {
        let works = snapshot.docs.map((doc) => {
          const data = doc.data();
          const id = doc.id;
          return { id, ...data };
        });
        //console.log(works);
        setNewListing(works);
      });

    firebase
      .firestore()
      .collection("AllWorks")
      .orderBy("likesCont", "desc")
      .get()
      .then((snapshot) => {
        let works = snapshot.docs.map((doc) => {
          const data = doc.data();
          const id = doc.id;

          return { id, ...data };
        });
        //console.log(works);
        setHeatListing(works);
      });
  }, []);

  return (
    <Screen style={styles.screen}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <TouchableWithoutFeedback
          onPress={() =>
            navigation.navigate("WorkListing", { listing: heatListing })
          }
        >
          <View style={styles.headingContainer}>
            <MaterialCommunityIcons name="fire" color="orange" size={25} />

            <Text style={styles.headingText}>Heat</Text>
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
            data={heatListing}
            renderItem={({ item }) => (
              <View style={styles.box}>
                <TouchableWithoutFeedback
                  style={styles.image}
                  onPress={() =>
                    navigation.navigate("WorkDetail", {
                      image: item.downloadUrl,
                      Uid: item.authorUid,
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

        <TouchableWithoutFeedback
          onPress={() =>
            navigation.navigate("WorkListing", { listing: newListing })
          }
        >
          <View style={styles.headingContainer}>
            <MaterialCommunityIcons name="new-box" color="blue" size={25} />

            <Text style={styles.headingText}>Newest</Text>
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
            data={newListing}
            renderItem={({ item }) => (
              <View style={styles.box}>
                <TouchableWithoutFeedback
                  style={styles.image}
                  onPress={() =>
                    navigation.navigate("WorkDetail", {
                      image: item.downloadUrl,
                      Uid: item.authorUid,
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

        <TouchableWithoutFeedback
          onPress={() =>
            navigation.navigate("FollowingWorkListing", {
              followings: followings,
            })
          }
        >
          <View style={styles.headingContainer}>
            <MaterialCommunityIcons name="cards-heart" color="red" size={25} />

            <Text style={styles.headingText}>Your Follows</Text>
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
            data={followingListing}
            renderItem={({ item }) => (
              <View style={styles.box}>
                <TouchableWithoutFeedback
                  style={styles.image}
                  onPress={() =>
                    navigation.navigate("WorkDetail", {
                      image: item.downloadUrl,
                      Uid: item.authorUid,
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
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 10,
  },
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
  containerGallery: {
    height: Dimensions.get("window").height * 0.35,
    marginBottom: 30,
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
});

export default HomePageScreen;
