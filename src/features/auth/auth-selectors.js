const getIsLoggedIn = (state) => state.auth.isLoggedIn;
const getUserName = (state) => state.auth.user.name;
const getIsFetchingCurrentUser = (state) => state.auth.isFetchingCurrent;
const getUserToken = (state) => state.auth.token;

const authSelectors = {
  getIsLoggedIn,
  getUserName,
  getIsFetchingCurrentUser,
  getUserToken,
};

export default authSelectors;
