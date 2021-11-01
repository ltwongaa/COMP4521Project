// # COMP 4521  #  Wong Lok Tai  20434788   ltwongaa@connect.ust.hk

import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import FormikForm from "../components/FormikForm";
import * as yup from "yup";
import firebase from "firebase";
require("firebase/firestore");
require("firebase/firebase-storage");

import Screen from "../components/Screen";
import colors from "../config/colors";
import SubmitButton from "../components/SubmitButton";
import AppFormField from "../components/AppFormField";
import ImagePicker from "../components/ImagePicker";
import { useEffect } from "react";

function ProfileSettingScreen({ navigation }) {
  const [userIcon, setUserIcon] = useState("");
  const [userContact, setUserContact] = useState("");
  const [userAbout, setUserAbout] = useState("");

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
          setUserContact(data.contact);
          setUserAbout(data.about);
        });
      });
  }, []);

  const handleSubmit = async ({ image, contact, about }) => {
    const uri = image[0];
    const childPath =
      "Icons/" +
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
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .collection("userInformation")
        .add({
          downloadUrl,
          contact,
          about,
          changeDate: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then(function () {
          navigation.navigate("PersonalHomePage");
        });
    };
  };

  const validationSchema = yup.object().shape({
    contact: yup.string().label("Contact"),
    about: yup.string().max(255).label("About"),
  });
  return (
    <Screen style={styles.screen}>
      <ScrollView>
        <FormikForm
          initialValues={{
            contact: "",
            about: "",
            image: [],
          }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <View style={styles.container}>
            <Text style={styles.text}>Personal Icon</Text>
            <ImagePicker name="image" />
          </View>
          <View style={styles.aboutContainer}>
            <MaterialCommunityIcons
              name="email-outline"
              size={18}
              color={colors.grey}
            />
            <Text style={styles.title}>Contact</Text>
          </View>
          <AppFormField
            name="contact"
            placeholder={"Contact"}
            defaultValue={userContact}
            autoCaptalize={false}
            autoCorrect={false}
            style={styles.detailContainer}
          />
          <View style={styles.aboutContainer}>
            <MaterialCommunityIcons
              name="comment-outline"
              size={18}
              color={colors.grey}
            />
            <Text style={styles.title}>About Me</Text>
          </View>
          <AppFormField
            name="about"
            placeholder={"About Me"}
            defaultValue={userAbout}
            autoCaptalize={false}
            autoCorrect={false}
            style={styles.detailContainer}
          />
          <SubmitButton
            title="submit"
            color="lightskyblue"
            style={styles.submitButton}
          />
        </FormikForm>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.lightgrey,
  },

  container: {
    paddingTop: 15,
    alignItems: "center",
    backgroundColor: colors.lightgrey,
    marginBottom: 10,
  },
  uploader: {
    borderRadius: 40,
    height: 80,
    width: 80,
    marginBottom: 20,
  },
  text: {
    fontSize: 20,
    color: colors.grey,
  },
  title: {
    paddingLeft: 5,
    color: colors.grey,
    fontSize: 18,
  },
  detailContainer: {
    marginTop: 2,
    marginBottom: 20,
    backgroundColor: colors.white,
    height: 50,
    borderRadius: 0,
    padding: 0,
  },
  content: {
    paddingLeft: 5,
    color: colors.medium,
  },
  aboutContainer: {
    paddingLeft: 5,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
  },
  submitButton: {
    marginTop: 70,
  },
});

export default ProfileSettingScreen;
