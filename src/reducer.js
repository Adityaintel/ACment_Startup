export const initialState = {
  category: "student",
  userInfo: {},
  videos: [],
  followings: [],
};

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case "ADD_USER":
      return {
        ...state,
        category: action.data.category,
        userInfo: action.data.userInfo,
      };
    case "REMOVE_USER":
      return {
        category: "student",
        userInfo: {},
        followings: [],
      };
    case "ADD_USER_INFO":
      return {
        ...state,
        userInfo: { ...state.userInfo, ...action.data },
      };
    case "ADD_FOLLOWINGS":
      return {
        ...state,
        followings: [...state.followings, ...action.data],
      };
    default:
      return state;
  }
};

export default reducer;
