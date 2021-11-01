// # COMP 4521  #  Wong Lok Tai  20434788   ltwongaa@connect.ust.hk

import { combineReducers } from "redux";
import { user } from "./user";

const Reducers = combineReducers({
  userState: user,
});

export default Reducers;
