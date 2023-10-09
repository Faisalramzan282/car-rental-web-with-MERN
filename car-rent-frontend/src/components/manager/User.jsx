import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import allActions from "../../store/actions";
import DeleteConPopUp from "../DeleteConPopUp";
import "./style.css";
const User = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);
  const [deletePopUp, setDeletePopUp] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const dispatch = useDispatch();
  const registerError = useSelector(
    (state) => state.registerUser.registerError
  ); //for validation errors
  const getAllUsers = useSelector((state) => state.getAllUsers);
  //   console.log("all states", getAllUsers);
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
  //for retreiving all users
  useEffect(() => {
    console.log("useefccet executing......");
    dispatch(allActions.getAllUsers());
  }, []); // when getAllUsers changed, it re-renders
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const addUserBtn = async () => {
    let userData = {
      username: username,
      email: email,
      password: password,
      role: "user",
    };
    await dispatch(allActions.registerUser(userData));
    console.log("rannnnnn");
    await dispatch(allActions.getAllUsers());
  };
  const deleteUserBtn = (user) => {
    console.log("user data", user);
    setDeletePopUp(true);
    setUserToDelete(user);
  };
  const handleConfirmDelete = async () => {
    try {
      dispatch(allActions.deleteUser(userToDelete));
      setDeletePopUp(false);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };
  return (
    <div className=" min-h-screen">
      <div className=" w-96 mx-auto my-6 ">
        <div className="bg-white p-8 rounded shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-center">Add User</h2>
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
              onClick={addUserBtn}
            >
              Add User
            </button>
          </div>
        </div>
      </div>
      {/* fetch all users */}
      {getAllUsers ? (
  <div className="flex justify-center items-center">
    <div className="flex m-5 flex-wrap gap-5">
      {
      // getAllUsers.allUsers.length > 0 ? (
        getAllUsers.allUsers.map((user) => (
          <div
            key={user._id}
            className="bg-white border border-gray-500 rounded-md p-8 width-set-up w-72"
          >
            <h3 className="text-lg font-semibold mb-2">
              Username: {user.username}
            </h3>
            <p className="text-gray-700 mb-2">Email: {user.email}</p>
            <p className="text-gray-700 mb-2">Role: {user.role}</p>
            <div className="flex justify-center">
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => deleteUserBtn(user)}
              >
                Delete
              </button>
            </div>
            {deletePopUp && (
              <DeleteConPopUp
                onConfirmDelete={handleConfirmDelete}
                onCancelDelete={() => setDeletePopUp(false)}
              />
            )}
          </div>
        ))
      // ) 
      // : (
      //   <div>
      //     <p>No users</p>
      //   </div>
      // )
      }
    </div>
  </div>
) : (
  <p>Loading users...</p>
)}
    </div>
  );
};
export default User;
