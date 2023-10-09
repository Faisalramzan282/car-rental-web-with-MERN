const initialState = {
    userData: null,
    loginError: null, 
};
const authenticateUser = (state = initialState, action) => {
    switch (action.type) {
      case "AUTH_SUCCESS":
        return {
          ...state,
          userData: action.payload,
          loginError: null, 
        };
      case 'VALIDATION_ERROR':
        console.log("action part in rreducer", action);
        return{
            ...state,
            loginError: action.payload.message
        }
      case "AUTH_ERROR":
        console.log("action in reducer is ===>, ", action.payload);
        return {
          ...state,
          loginError: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default authenticateUser;