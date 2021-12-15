export const SET_USER_INFO = "SET_USER_INFO";
export const SET_LOGGED_IN = "SET_LOGGED_IN";
export const SET_LOGGED_OUT = "SET_LOGGED_OUT";
export const CLEAR_STATE_DATA = "CLEAR_STATE_DATA";

export const setUserInfo = (user) => {
  return {
    type: SET_USER_INFO,
    payload: user,
  };
};

export const setUserLogIn = () => ({
    type: SET_LOGGED_IN,
})

export const setUserLogOut = () => ({
  type: SET_LOGGED_OUT,
})

// export const clearState = () => ({
//   type: CLEAR_STATE_DATA,
// })