export const initialState = {
  category:"Student",
  username: "",
  userId: "",
};

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case "ADD_USER":
      return {
        ...state,
        username: action.data.username,
        userID: action.data.userID,
      };
    default:
      return state;
  }
};

export default reducer;
