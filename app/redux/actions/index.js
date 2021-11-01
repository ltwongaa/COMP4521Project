// # COMP 4521  #  Wong Lok Tai  20434788   ltwongaa@connect.ust.hk

import { USER_STATE_CHANGE, USER_WORKS_STATE_CHANGE } from "../constants/index";
import firebase from "firebase";

export function fetchUser() {
  return (dispatch) => {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          dispatch({ type: USER_STATE_CHANGE, currentUser: snapshot.data() });
        } else {
          console.log("does not exist");
        }
      });
  };
}

export function fetchUserWorks() {
  return (dispatch) => {
    firebase
      .firestore()
      .collection("works")
      .doc(firebase.auth().currentUser.uid)
      .collection("userWorks")
      .orderBy("creation", "asc")
      .get()
      .then((snapshot) => {
        let works = snapshot.docs.map((doc) => {
          const data = doc.data();
          const id = doc.id;
          return { id, ...data };
        });
        dispatch({ type: USER_WORKS_STATE_CHANGE, works });
      });
  };
}
