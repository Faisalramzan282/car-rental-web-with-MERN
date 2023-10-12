import axios from "axios";
const authenticateUser = (userData) => async (dispatch) => {
  const axiosInstance = axios.create({
    baseURL: "http://localhost:3001",
  });
  try {
    const {data} = await axiosInstance.post("/authenticate", userData);
    // console.log("data is -===>", data);
    if(data.status === 'success'){
        const userObj ={
            token: data.data.token,
            userId : data.data.user._id,
            role: data.data.user.role
        }
        localStorage.setItem('loggedUser', JSON.stringify(userObj));
        dispatch({
          type: "AUTH_SUCCESS",
          payload: data
        });
    }
    else if(data.status ==='error')
    {
        dispatch({
            type: "VALIDATION_ERROR",
            payload: data
          }); 
    }
  } catch (error) {
    console.log("error ", error);
    dispatch({
      type: "AUTH_ERROR",
      payload:error,
    });
  }
};
export default authenticateUser;