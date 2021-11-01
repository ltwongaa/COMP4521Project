// # COMP 4521  #  Wong Lok Tai  20434788   ltwongaa@connect.ust.hk

import React from "react";
import { FlatList, StyleSheet } from "react-native";

import WorkPreviewBox from "../components/WorkPreviewBox";
import Screen from "../components/Screen";
import colors from "../config/colors";

function WorkListingScreen({ route, navigation }) {
  const listing = route.params.listing;

  return (
    <Screen style={styles.screen}>
      <FlatList
        data={listing}
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

export default WorkListingScreen;
