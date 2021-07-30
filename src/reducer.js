export const initialState = {
  category: "Student",
  userInfo: {},
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
    default:
      return state;
  }
};

export default reducer;
