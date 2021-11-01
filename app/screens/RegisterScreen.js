// # COMP 4521  #  Wong Lok Tai  20434788   ltwongaa@connect.ust.hk

import React, { useState } from "react";
import { Dimensions, StyleSheet, Text } from "react-native";
import * as yup from "yup";
import * as firebase from "firebase";

import Screen from "../components/Screen";
import ErrorMessage from "../components/ErrorMessage";
import AppFormField from "../components/AppFormField";
import SubmitButton from "../components/SubmitButton";
import FormikForm from "../components/FormikForm";

function RegisterScreen(props) {
  const [RegisterFailed, setRegisterFailed] = useState(false);
  const [RegisterSuccess, setRegisterSuccess] = useState(false);

  const validationSchema = yup.object().shape({
    username: yup.string().required().label("Username"),
    email: yup.string().required().email().label("Email"),
    password: yup.string().required().min(6).label("Password"),
  });

  const handleSubmit = ({ email, password, username }) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        firebase
          .firestore()
          .collection("users")
          .doc(firebase.auth().currentUser.uid)
          .set({
            username,
            email,
          });
        setRegisterFailed(false);
        setRegisterSuccess(true);
        console.log(result);
      })
      .catch((error) => {
        setRegisterFailed(true);
        setRegisterSuccess(false);
        console.log(error);
      });
  };

  return (
    <Screen style={styles.screen}>
      <FormikForm
        initialValues={{
          username: "",
          password: "",
          email: "",
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <AppFormField
          name="username"
          iconName="account-box"
          placeholder={"Username"}
          autoCaptalize="none"
          autoCorrect={false}
          style={styles.container}
        />
        <AppFormField
          name="email"
          iconName="email"
          placeholder={"Email"}
          autoCaptalize="none"
          autoCorrect={false}
          style={styles.container}
          keyboardType="email-address"
          textContentType="emailAddress"
        />
        <AppFormField
          name="password"
          iconName="lock"
          placeholder={"Password"}
          autoCaptalize="none"
          autoCorrect={false}
          secureTextEntry={true}
          textContentType="password"
          style={styles.container}
        />
        <ErrorMessage
          error="Email has been Registered"
          visible={RegisterFailed}
        />
        {RegisterSuccess && <Text>Registered Finished</Text>}
        <SubmitButton
          title="Register"
          style={styles.button}
          color="lightskyblue"
        />
      </FormikForm>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    alignItems: "center",
    paddingTop: 30,
  },
  container: {
    width: Dimensions.get("window").width * 0.8,
  },
  button: {
    marginTop: 30,
    width: Dimensions.get("window").width * 0.8,
  },
});

export default RegisterScreen;
