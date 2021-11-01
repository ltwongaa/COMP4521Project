// # COMP 4521  #  Wong Lok Tai  20434788   ltwongaa@connect.ust.hk

import React, { useEffect } from "react";
import { useState } from "react";
import { Dimensions, Platform, StyleSheet, View } from "react-native";
import * as yup from "yup";

import firebase from "firebase";
require("firebase/firestore");
require("firebase/firebase-storage");

import Screen from "../components/Screen";
import colors from "../config/colors";
import AppFormField from "../components/AppFormField";
import SubmitButton from "../components/SubmitButton";
import FormikForm from "../components/FormikForm";
import AppFormPicker from "../components/AppFormPicker";
import CategoryPickerItem from "../components/CategoryPickerItem";
import ImagePicker from "../components/ImagePicker";

function WorkAddingScreen({ navigation }) {
  const [userName, setUserName] = useState("");
  const [userIcon, setUserIcon] = useState("");
  const likesCont = 0;
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

  const handleSubmit = async ({ image, category, title, description }) => {
    const uri = image[0];
    const childPath =
      "work/" +
      firebase.auth().currentUser.uid +
      "/" +
      Math.random().toString(36);

    const response = await fetch(uri);
    const blob = await response.blob();

    const task = firebase.storage().ref().child(childPath).put(blob);

    const taskProgress = (snapshot) => {};

    const taskError = (snapshot) => {};

    const taskComplete = () => {
      task.snapshot.ref.getDownloadURL().then((snapshot) => {
        saveWorkData(snapshot);
      });
    };
    task.on("state_changed", taskProgress, taskError, taskComplete);
    const saveWorkData = (downloadUrl) => {
      firebase
        .firestore()
        .collection("Works")
        .doc(firebase.auth().currentUser.uid)
        .collection("userWorks")
        .add({
          author: userName,
          authorIcon: userIcon,
          authorUid: firebase.auth().currentUser.uid,
          downloadUrl,
          category,
          title,
          description,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          likesCont,
        });
      firebase
        .firestore()
        .collection("AllWorks")
        .add({
          author: userName,
          authorIcon: userIcon,
          authorUid: firebase.auth().currentUser.uid,
          downloadUrl,
          category,
          title,
          description,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then(function () {
          navigation.navigate("HomePage");
        });
    };
  };
  const validationSchema = yup.object().shape({
    image: yup.array().min(1, "Please Upload an image"),
    category: yup.object().required().nullable().label("Category"),
    title: yup.string().required().min(1).label("Title"),
    description: yup.string().max(255).label("Description"),
  });
  const categories = [
    { label: "Interior Design", value: 1 },
    { label: "Furniture", value: 2 },
    { label: "Decoration", value: 3 },
  ];
  return (
    <Screen style={styles.screen}>
      <View style={styles.container}></View>
      <FormikForm
        initialValues={{
          image: [],
          category: null,
          title: "",
          description: "",
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <ImagePicker name="image" />
        <AppFormPicker
          items={categories}
          name="category"
          numberOfColumns={1}
          PickerItemComponent={CategoryPickerItem}
          placeholder="Category"
          width="50%"
        />
        <AppFormField
          name="title"
          placeholder={"Title"}
          autoCaptalize
          autoCorrect={false}
          style={styles.InputBox}
        />
        <AppFormField
          name="description"
          placeholder={"Description"}
          autoCaptalize="none"
          autoCorrect={false}
          style={styles.InputBox}
        />
        <SubmitButton
          style={styles.appButton}
          title={"Post"}
          color="lightgrey"
        />
      </FormikForm>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingLeft: Platform.OS === "android" ? "5%" : "10%",
    backgroundColor: colors.lightsteelblue,
  },
  container: {},
  InputBox: {
    marginBottom: 10,
    width: Dimensions.get("window").width * 0.8,
  },
  appButton: {
    width: "90%",
  },
});

export default WorkAddingScreen;
