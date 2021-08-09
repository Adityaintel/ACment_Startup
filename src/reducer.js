export const initialState = {
  category: "student",
  userInfo: {},
  videos: [],
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
      };
    case "ADD_USER_INFO":
      return {
        ...state,
        userInfo: { ...state.userInfo, ...action.data },
      };
    default:
      return state;
  }
};

export default reducer;
