import registerUser from './registerUser'
import authenticateUser from './authUser'
import getAllUsers from './getAllUsers'
import addCars from './addCar'
import getAllCars from './getAllCars'
import {combineReducers} from 'redux'
const rootReducer = combineReducers({
    registerUser,
    authenticateUser,
    getAllUsers,
    addCars,
    getAllCars
})
export default rootReducer