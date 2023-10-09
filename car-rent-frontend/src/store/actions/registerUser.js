import axios from "axios";
const registerUser = (userData) => async (dispatch) => {
    console.log("payload data is ==> register user action", userData);
  const axiosInstance = axios.create({
    baseURL: "http://localhost:3001",
  });
  try {
    const response = await axiosInstance.post("/users", userData);
    console.log("response in action register User is ", response);
    dispatch({
      type: "REGISTER_SUCCESS",
      payload: response.data
    });
  } catch (error) {
    dispatch({
      type: "REGISTER_ERROR",
      payload:error.response.data.message,
    });
  }
};
export default registerUser;