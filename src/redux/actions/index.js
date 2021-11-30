export const SET_USER_INFO = "SET_USER_INFO";
export const SET_LOGGED_IN = "SET_LOGGED_IN";

export const setUserInfo = (user) => {
  return {
    type: SET_USER_INFO,
    payload: user,
  };
};

// export const setUserLogIn = () => ({
//     type: SET_LOGGED_IN,
// })
