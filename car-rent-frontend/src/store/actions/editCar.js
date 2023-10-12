import axios from "axios";
const editCar =(carObj)=>async (dispatch)=>{
    const axiosInstance = axios.create({
        baseURL: "http://localhost:3001",
      });
      try {
        const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
        const managerId = loggedUser.userId;
        const {data} = await axiosInstance.patch(`cars/update-car/${managerId}`, carObj);
        console.log("response in actions is", data);
        dispatch({
            type: 'FETCH_ALL_CARS',
            payload: data.data.cars  // array of cars object
        })
      } catch (error) {
        console.log("error", error);
      }
}
export default editCar;