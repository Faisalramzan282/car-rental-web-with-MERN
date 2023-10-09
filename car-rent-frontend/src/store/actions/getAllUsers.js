import axios from "axios";
const getAllUsers = (userData) => async (dispatch) => {
  const axiosInstance = axios.create({
    baseURL: "http://localhost:3001",
  });
 try {
    const {data} = await axiosInstance.get('/users');
    console.log("response in action is ==>", data.data);
    dispatch({
        type:'USERS_SUCCESS',
        payload: data.data
    })
 } catch (error) {
    console.log('error is', error);
    dispatch({
        type: "USERS_ERROR",
        payload:error,
      });
 }
}
export default getAllUsers;