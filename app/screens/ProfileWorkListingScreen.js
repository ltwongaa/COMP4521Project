// # COMP 4521  #  Wong Lok Tai  20434788   ltwongaa@connect.ust.hk

import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import firebase from "firebase";
require("firebase/firestore");

import colors from "../config/colors";
import Screen from "../components/Screen";
import ProfileWorkPreviewBox from "../components/ProfileWorkPreviewBox";

function ProfileWorkListingScreen({ route, navigation }) {
  const [listing, setListing] = useState([]);

  useEffect(() => {
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
  }, []);

  return (
    <Screen style={styles.screen}>
      <FlatList
        contentContainerStyle={{ alignSelf: "flex-start" }}
        numColumns={3}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        data={listing}
        renderItem={({ item }) => (
          <ProfileWorkPreviewBox
            title={item.title}
            image={{ uri: item.downloadUrl }}
            imageOnPress={() =>
              navigation.navigate("WorkDetail", {
                image: item.downloadUrl,
                Uid: route.params.Uid,
                title: item.title,
                description: item.description,
                id: item.id,
              })
            }
          />
        )}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    alignItems: "center",

    backgroundColor: colors.light,
  },
});

export default ProfileWorkListingScreen;
