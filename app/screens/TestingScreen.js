import React from "react";
import { FlatList, StyleSheet } from "react-native";

import WorkPreviewBox from "../components/WorkPreviewBox";
import Screen from "../components/Screen";
import colors from "../config/colors";

function TestingScreen({ route, navigation }) {
  const listing = route.params.listing;

  return (
    <Screen style={styles.screen}>
      <FlatList
        data={listing}
        renderItem={({ item }) => (
          <WorkPreviewBox
            title={item.title}
            authorIcon={item.authorIcon}
            author={item.author}
            image={{ uri: item.image }}
            imageOnPress={() =>
              navigation.navigate("WorkDetail", {
                authorUid: item.authorUid,
                author: item.author,
                image: item.image,
                authorIcon: item.authorIcon,
                description: item.description,
              })
            }
            authorOnPress={() =>
              navigation.navigate("Profile", {
                authorUid: item.authorUid,
                author: item.author,
                authorIcon: item.authorIcon,
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

export default TestingScreen;
