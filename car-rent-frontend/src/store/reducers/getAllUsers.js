const allUsers = null;
const getAllUsers=(state=allUsers, action)=>{
    switch (action.type) {
        case 'USERS_SUCCESS':
            return{
                allUsers : action.payload,
            }
        case 'USERS_ERROR':
            return{
                payload:action.payload
            }    
        default:
            return state;
    }
}
export default getAllUsers;