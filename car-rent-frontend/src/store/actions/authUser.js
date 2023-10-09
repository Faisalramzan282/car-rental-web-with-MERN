import axios from "axios";
const authenticateUser = (userData) => async (dispatch) => {
  const axiosInstance = axios.create({
    baseURL: "http://localhost:3001",
  });
  try {
    const {data} = await axiosInstance.post("/authenticate", userData);
    if(data.status === 'success'){
        const userObj ={
            token: data.data.token,
            userId : data.data.user._id
        }
        const loggedUser = JSON.parse(localStorage.getItem('loggedUser')) || [];
        localStorage.setItem('loggedUser', JSON.stringify(userObj));
        console.log("logged user", loggedUser);
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