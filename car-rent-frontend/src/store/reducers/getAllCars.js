// import { useSelector } from "react-redux";
const getAllCar = null;
const getAllCars  = (state=getAllCar, actions)=>{
   
// const states = useSelector((state)=>state);
// console.log("states in reducers is ==>", states);
   console.log("actions in reducers getAllCars===>", actions);
   switch (actions.type) {
      case 'FETCH_ALL_CARS':
         return{
           state:actions
         }
      case 'ERROR_FETCH_CARS':
         return{
            ...state,
         }
      default:
         return null;
   }
}
export default getAllCars
