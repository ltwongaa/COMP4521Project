// # COMP 4521  #  Wong Lok Tai  20434788   ltwongaa@connect.ust.hk

import React, { useState } from "react";
import { Dimensions, StyleSheet } from "react-native";
import * as yup from "yup";
import * as firebase from "firebase";

import AppButton from "../components/AppButton";
import Screen from "../components/Screen";
import ErrorMessage from "../components/ErrorMessage";
import AppFormField from "../components/AppFormField";
import SubmitButton from "../components/SubmitButton";
import FormikForm from "../components/FormikForm";

function LoginScreen({ navigation }) {
  const [loginFailed, setLoginFailed] = useState(false);

  const validationSchema = yup.object().shape({
    email: yup.string().required().email().label("Email"),
    password: yup.string().required().min(6).label("Password"),
  });

  const handleSubmit = ({ email, password }) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        setLoginFailed(false);
        console.log(result);
      })
      .catch((error) => {
        setLoginFailed(true);
        console.log(error);
      });
  };

  return (
    <Screen style={styles.screen}>
      <FormikForm
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <AppFormField
          name="email"
          iconName="email"
          placeholder={"Account"}
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
        <ErrorMessage error="invalid information" visible={loginFailed} />
        <SubmitButton
          title="login"
          style={styles.button}
          color="lightskyblue"
        />
      </FormikForm>
      <AppButton
        title="resgister"
        style={styles.button}
        onPress={() => navigation.navigate("RegisterPage")}
      />
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

export default LoginScreen;
