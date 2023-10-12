import axios from "axios";
const addCar=(carData)=>async(dispatch)=>{
    const axiosInstance = axios.create({
        baseURL: "http://localhost:3001",
      });
      try {
        const {data} = await axiosInstance.post("/cars/add-car", carData);
        console.log("data is ===>", data.data.cars);
        dispatch({
            type: 'SUCCESS_CAR',
            carData:data.data.cars
        })
      } catch (error) {
        dispatch({
            type:"ERROR_CAR",
            error: error
        })
      }
}
export default addCar;