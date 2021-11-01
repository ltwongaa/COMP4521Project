import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";

import WorkPreviewBox from "../components/WorkPreviewBox";
import Screen from "../components/Screen";
import colors from "../config/colors";
import firebase from "firebase";
require("firebase/firestore");

function FollowingWorkListingScreen({ route, navigation }) {
  const [followingListing, setFollowingListing] = useState([]);

  useEffect(() => {
    firebase
      .firestore()
      .collection("AllWorks")
      .where("authorUid", "in", route.params.followings)
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
  }, []);

  return (
    <Screen style={styles.screen}>
      <FlatList
        data={followingListing}
        renderItem={({ item }) => (
          <WorkPreviewBox
            title={item.title}
            authorIcon={{ uri: item.authorIcon }}
            author={item.author}
            image={{ uri: item.downloadUrl }}
            imageOnPress={() =>
              navigation.navigate("WorkDetail", {
                Uid: item.authorUid,
                image: item.downloadUrl,
                title: item.title,
                description: item.description,
                id: item.id,
              })
            }
            authorOnPress={() =>
              navigation.navigate("Profile", {
                Uid: item.authorUid,
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
    padding: 5,
    backgroundColor: colors.light,
  },
});

export default FollowingWorkListingScreen;
