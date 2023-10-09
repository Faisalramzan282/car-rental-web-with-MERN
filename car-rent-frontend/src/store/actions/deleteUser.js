import axios from "axios";
const deleteUser = (userData) => async (dispatch) => {
  const axiosInstance = axios.create({
    baseURL: "http://localhost:3001",
  });
  try {
    const {data} = await axiosInstance.delete(`/users/${userData._id}`);
    console.log("resposne aftre delete in actions ",data);
    if(data.status === 'success'){
      dispatch({
      type: "USERS_SUCCESS", // for re-rendering purposes
      payload: data.data
    });
    }
  } catch (error) {
    console.log("error ", error);
  }
};
export default deleteUser;