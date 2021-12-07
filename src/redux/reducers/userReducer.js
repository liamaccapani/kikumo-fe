import { SET_USER_INFO, SET_LOGGED_IN } from "../actions";
import { initialState } from "../store";

export const userReducer = (state = initialState.user, action) => {
  const { type, payload } = action;
  switch (action.type) {
    case SET_USER_INFO:
      return {
        ...state,
        userData: payload,
      };
    case SET_LOGGED_IN:
      return {
        ...state,
        isLoggedIn: true,
      };
    default:
      return state;
  }
};
