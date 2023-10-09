import React,{useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import allActions from "../store/actions";
import { useSelector } from "react-redux";
// import store from '../store/index'
const Login=()=>{
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        email: '',
        password: ''
    })
    const [showError, setShowError] = useState(false);
    const dispatch = useDispatch();
    const authenticateError = useSelector(
        (state) => state.authenticateUser.loginError
      ); //for validation errors
      useEffect(() => {
        console.log("erorr in login comp", authenticateError)
        if (authenticateError ) {
          setShowError(true);
          const errorTimer = setTimeout(() => {
            setShowError(false);
          }, 5000);
          return () => {
            clearTimeout(errorTimer);
          };
        }
      }, [authenticateError]);
    const handleEmail=(e)=>{
        setUserData({
            ...userData,
            email:e.target.value
        });
    }
    const handlePassword=(e)=>{
        setUserData({
            ...userData,
            password:e.target.value
        });
    }
    const loginBtn=(e)=>{
        dispatch(allActions.authenticateUser(userData));
        // const state = store.getState();
        // console.log("gloals states==>", state);
    }
    const signupBtn=()=>{
        navigate('/signup');
    }
    return(
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md w-96">
          <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
          <div>
            {showError && (
              <div className="text-red-500 mb-2">
                <li>{authenticateError}</li> 
              </div>
            )}
          </div>
          <div className="mb-4">
            <input
              type="email"
              required
              className="border border-gray-300 rounded w-full py-2 px-3 focus:outline-none focus:border-blue-400"
              placeholder="Enter your email"
              name='email'
              onChange={handleEmail}
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              required
              className="border border-gray-300 rounded w-full py-2 px-3 focus:outline-none focus:border-blue-400"
              placeholder="Enter your password"
              name="password"
              onChange={handlePassword}
            />
          </div>
          <div className="mb-4">
            <button
              type="submit"
              className="bg-slate-600 w-full text-white py-2 px-4 rounded hover:bg-slate-500 focus:outline-none"
              onClick={loginBtn}
            >
              Login
            </button>
          </div>
          <div className="mb-4">
            <button
              className="bg-slate-600 w-full text-white py-2 px-4 rounded hover:bg-slate-500 focus:outline-none"
             onClick={signupBtn}>
              sign up
            </button>
          </div>
        </div>
      </div>
    );
  };
    
export default Login;