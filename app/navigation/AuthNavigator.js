// # COMP 4521  #  Wong Lok Tai  20434788   ltwongaa@connect.ust.hk

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";

const Stack = createStackNavigator();

const AuthNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="LogInPage" component={LoginScreen} />
    <Stack.Screen name="RegisterPage" component={RegisterScreen} />
  </Stack.Navigator>
);

export default AuthNavigator;
