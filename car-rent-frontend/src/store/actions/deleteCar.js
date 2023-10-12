import axios from "axios";
const deleteCar = (carId) => async (dispatch) => {
    const axiosInstance = axios.create({
        baseURL: "http://localhost:3001",
      });
      try {
        const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
        // console.log("user id ==>", loggedUser);
        const managerId = loggedUser.userId;
        const {data} = await axiosInstance.delete(`cars/delete-car/${carId}/${managerId}`);
        // console.log("response", data.data);
        dispatch({
            type: 'FETCH_ALL_CARS',//again run reducers for fetchinhg all the cars 
            payload:data.data //array of objects of cars
        })
      } catch (error) {
        console.log("erro", error);
      }
}
export default deleteCar;