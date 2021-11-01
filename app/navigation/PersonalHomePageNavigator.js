// # COMP 4521  #  Wong Lok Tai  20434788   ltwongaa@connect.ust.hk

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import PersonalHomePageScreen from "../screens/PersonalHomePageScreen";
import ProfileScreen from "../screens/ProfileScreen";
import ProfileWorkListingScreen from "../screens/ProfileWorkListingScreen";
import ProfileSettingScreen from "../screens/ProfileSettingScreen";
import WorkDetailScreen from "../screens/WorkDetailScreen";
import ImageShowingScreen from "../screens/ImageShowingScreen";
import LikedWorkListingScreen from "../screens/LikedWorksListing";

const Stack = createStackNavigator();

const PersonalHomePageNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="PersonalHomePage" component={PersonalHomePageScreen} />
    <Stack.Screen name="Profile" component={ProfileScreen} />
    <Stack.Screen name="ProfileWorkList" component={ProfileWorkListingScreen} />
    <Stack.Screen name="ProfileSetting" component={ProfileSettingScreen} />
    <Stack.Screen name="WorkDetail" component={WorkDetailScreen} />
    <Stack.Screen name="ImageShowing" component={ImageShowingScreen} />
    <Stack.Screen name="LikedWorks" component={LikedWorkListingScreen} />
  </Stack.Navigator>
);

//     <Stack.Screen name="Follows" component={} />

export default PersonalHomePageNavigator;
