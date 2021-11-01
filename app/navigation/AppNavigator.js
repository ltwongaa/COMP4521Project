// # COMP 4521  #  Wong Lok Tai  20434788   ltwongaa@connect.ust.hk

import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import WorkAddingScreen from "../screens/WorkAddingScreen";
import HomePageNavigator from "./HomePageNavigator";
import PersonalHomePageNavigator from "./PersonalHomePageNavigator";

const Tab = createBottomTabNavigator();

const AppNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen name="HomePageNavigator" component={HomePageNavigator} />
    <Tab.Screen name="WorkAdd" component={WorkAddingScreen} />
    <Tab.Screen name="PersonalHomePage" component={PersonalHomePageNavigator} />
  </Tab.Navigator>
);

export default AppNavigator;
