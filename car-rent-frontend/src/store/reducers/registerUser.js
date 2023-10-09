const initialState = {
    userData: null,
    registerError: null, 
};
const registerUser = (state = initialState, action) => {
    switch (action.type) {
      case "REGISTER_SUCCESS":
        alert(action.payload.msg);
        console.log("action in reducer is", action);
        return {
          ...state,
          userData: action.data,
          registerError: null, 
        };
      case "REGISTER_ERROR":
        console.log("action in reducer is ===>, ", action.payload);
        return {
          ...state,
          registerError: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default registerUser;