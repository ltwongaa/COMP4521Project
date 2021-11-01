// # COMP 4521  #  Wong Lok Tai  20434788   ltwongaa@connect.ust.hk

import React, { Component } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchUser, fetchUserWorks } from "../redux/actions/index";

import HomePageNavigator from "../navigation/HomePageNavigator";
import WorkAddingScreen from "./WorkAddingScreen";
import PersonalHomePageNavigator from "../navigation/PersonalHomePageNavigator";

const Tab = createBottomTabNavigator();

export class Main extends Component {
  //NetInfoSubscribtion = null;
  /*
  constructor(props){
    super(props);
    this.state={
      connection_status: false,
      connect_type:null,
    }
  }
  componentDidMount() {
    this.NetInfoSubscribtion= NetInfo.addEventListener(
      this.handleConnectivityChange,
    )
     const unsubscribe = NetInfo.addEventListener((state) => {
      return state.type;
    });
      this.props.fetchUser();
  this.props.fetchUserWorks();

  }
  componentWillUnmount(){
    this.NetInfoSubscribtion && this.NetInfoSubscribtion();
  }

  handleConnectivityChange = (state)=>{
    this.setState({connection_status: state.isConnected
    ,connection_type: state.type})
  }
  /*
  componentWillUnmount() {
    if (!(state.type === "wifi")) {
      Alert.alert("You are not under wifi connection");
      {
        text: "ok";
      }
    }
  }
  */

  render() {
    return (
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            name="HomePage"
            component={HomePageNavigator}
            options={{
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="home" color={color} size={25} />
              ),
            }}
          />
          <Tab.Screen
            name="WorkAdd"
            component={WorkAddingScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons
                  name="plus-box-outline"
                  color={color}
                  size={25}
                />
              ),
            }}
          />
          <Tab.Screen
            name="PersonalHomePage"
            component={PersonalHomePageNavigator}
            options={{
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons
                  name="account"
                  color={color}
                  size={25}
                />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
});
const mapDispatchProps = (dispatch) =>
  bindActionCreators({ fetchUser, fetchUserWorks }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(Main);
