import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import ImageUploader from "./ImageUploader";

function ImagePickerList({
  imageUris = [],
  onRemoveImage,
  onAddImage,
  containerStyle,
}) {
  return (
    <View style={styles.container}>
      {imageUris.map((uri) => (
        <View key={uri} style={styles.image}>
          <ImageUploader
            imageUri={uri}
            onChangeImage={() => onRemoveImage(uri)}
            containerStyle={containerStyle}
          />
        </View>
      ))}
      <ImageUploader onChangeImage={(uri) => onAddImage(uri)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get("window").height * 0.52,
    overflow: "hidden",
  },
});

export default ImagePickerList;
