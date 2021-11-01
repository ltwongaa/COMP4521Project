import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import firebase from "firebase";
require("firebase/firestore");

import colors from "../config/colors";
import Screen from "../components/Screen";
import ProfileWorkPreviewBox from "../components/ProfileWorkPreviewBox";

function LikedWorkListingScreen({ route, navigation }) {
  const [listing, setListing] = useState([]);

  useEffect(() => {
    firebase
      .firestore()
      .collection("Works")
      .doc(firebase.auth().currentUser.uid)
      .collection("userLikedWorks")
      .orderBy("likedAt", "asc")
      .get()
      .then((snapshot) => {
        const internalListing = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
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
            image={{ uri: item.image }}
            imageOnPress={() =>
              navigation.navigate("WorkDetail", {
                image: item.image,
                Uid: item.Uid,
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

export default LikedWorkListingScreen;
