const initialState = {
  allCars: null,
};
const addCars = (state = initialState, action) => {
  console.log("all cars ===>", action);
  console.log("i am running");
  switch (action.type) {
    case "SUCCESS_CAR":
      return {
        ...state,
        allCars: action,
      };
    case "ERROR_CAR":
      return {
        ...state,
        error: action
      };
    default:
      return state;
  }
};

export default addCars;