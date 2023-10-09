import registerUser from './registerUser'
import authenticateUser from './authUser'
import getAllUsers from './getAllUsers'
import {combineReducers} from 'redux'
const rootReducer = combineReducers({
    registerUser,
    authenticateUser,
    getAllUsers
})
export default rootReducer