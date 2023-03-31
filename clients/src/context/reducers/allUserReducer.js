const allUserReducer = (state = null, action) => {
  switch (action.type) {
    case "GET_ALL_USER":
      return state;

    case "SET_ALL_USER":
      return action.user;
    // case "SET_USER_NULL":
    //   return action.user;
    default:
      return state;
  }
};
export default allUserReducer;
