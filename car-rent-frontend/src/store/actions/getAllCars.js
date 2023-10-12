import axios from "axios";
const getAllCars=(carData)=>async(dispatch)=>{
   const axiosInstance = axios.create({
    baseURL: "http://localhost:3001",
   });
   try {
    const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
    console.log("loggged user", loggedUser);
    const managerId = loggedUser.userId;
    const {data} = await axiosInstance.get(`/cars/get-cars/${managerId}`);
    console.log("data is ===>", data.data.cars);
    dispatch({
        type: 'FETCH_ALL_CARS',
        payload: data.data.cars  // array of cars object
    })
  } catch (error) {
    console.log("error", error);
    dispatch({
        type:"ERROR_FETCH_CARS",
        error: error
    })
  }
}
export default getAllCars;