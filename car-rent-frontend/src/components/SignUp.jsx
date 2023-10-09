import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import allActions from "../store/actions";
import { useNavigate } from "react-router-dom";
const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const registerError = useSelector(
    (state) => state.registerUser.registerError
  ); //for validation errors
  useEffect(() => {
    if (registerError && registerError.length > 0) {
      setShowError(true);
      const errorTimer = setTimeout(() => {
        setShowError(false);
      }, 5000);
      return () => {
        clearTimeout(errorTimer);
      };
    }
  }, [registerError]);
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleRegisterClick = () => {
    const userData = {
      username: username,
      email: email,
      password: password,
      role: "user",
    };
    dispatch(allActions.registerUser(userData));
  };
  const loginBtn=()=>{
    navigate('/login')
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4 text-center">SignUp</h2>
        <div>
          {showError && (
            <div className="text-red-500">
              {registerError.map((error, index) => (
                <p key={index}>{error}</p>
              ))}
            </div>
          )}
        </div>
        <div className="mb-4">
          <input
            type="text"
            required
            className="border border-gray-300 rounded w-full py-2 px-3 focus:outline-none focus:border-blue-400"
            placeholder="Enter your username"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div className="mb-4">
          <input
            type="email"
            required
            className="border border-gray-300 rounded w-full py-2 px-3 focus:outline-none focus:border-blue-400"
            placeholder="Enter your email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className="mb-6">
          <input
            type="password"
            required
            className="border border-gray-300 rounded w-full py-2 px-3 focus:outline-none focus:border-blue-400"
            placeholder="Enter your password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <div className="mb-4">
          <button
            type="submit"
            className="bg-slate-600 w-full text-white py-2 px-4 rounded hover:bg-slate-500 focus:outline-none"
            onClick={handleRegisterClick}
          >
            Register
          </button>
        </div>
        <div className="mb-4">
          <button
            // type="button"
            className="bg-slate-600 w-full text-white py-2 px-4 rounded hover:bg-slate-500 focus:outline-none"
           onClick={loginBtn}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};
export default SignUp;