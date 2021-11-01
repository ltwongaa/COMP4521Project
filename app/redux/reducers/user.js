// # COMP 4521  #  Wong Lok Tai  20434788   ltwongaa@connect.ust.hk

import { USER_STATE_CHANGE, USER_WORKS_STATE_CHANGE } from "../constants";

const initialState = {
  currentUser: null,
  works: [],
};

export const user = (state = initialState, action) => {
  switch (action.type) {
    case USER_STATE_CHANGE:
      return {
        ...state,
        currentUser: action.currentUser,
      };
    case USER_WORKS_STATE_CHANGE:
      return {
        ...state,
        works: action.works,
      };
    default:
      return state;
  }
};
