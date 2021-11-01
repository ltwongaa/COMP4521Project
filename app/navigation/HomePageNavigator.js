// # COMP 4521  #  Wong Lok Tai  20434788   ltwongaa@connect.ust.hk

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import HomePageScreen from "../screens/HomePageScreen";
import WorkListingScreen from "../screens/WorkListingScreen";
import WorkDetailScreen from "../screens/WorkDetailScreen";
import ProfileScreen from "../screens/ProfileScreen";
import ProfileWorkListingScreen from "../screens/ProfileWorkListingScreen";
import ImageShowingScreen from "../screens/ImageShowingScreen";
import TestingScreen from "../screens/TestingScreen";
import FollowingWorkListingScreen from "../screens/FollowingWorkListingScreen";

const Stack = createStackNavigator();

const HomePageNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="HomePage" component={HomePageScreen} />
    <Stack.Screen name="WorkListing" component={WorkListingScreen} />
    <Stack.Screen name="WorkDetail" component={WorkDetailScreen} />
    <Stack.Screen name="Profile" component={ProfileScreen} />
    <Stack.Screen name="ProfileWorkList" component={ProfileWorkListingScreen} />
    <Stack.Screen name="ImageShowing" component={ImageShowingScreen} />
    <Stack.Screen name="Testing" component={TestingScreen} />
    <Stack.Screen
      name="FollowingWorkListing"
      component={FollowingWorkListingScreen}
    />
  </Stack.Navigator>
);

export default HomePageNavigator;
