import React from "react";
import { Link} from 'react-router-dom';
const SideBar = () => {
  return (
    <div className="bg-gray-800 text-white  w-64 flex flex-col h-full">
    <ul className="mt-5 py-4 ">
      <li>
        <Link
          to="users"
          className="block p-3 hover:bg-gray-600 transition duration-300"
        >
          Users
        </Link>
      </li>
      <li>
        <Link
          to="cars"
          className="block p-3 hover:bg-gray-600 transition duration-300"
        >
          Cars
        </Link>
      </li>
      <li>
        <Link
          to="/reservation"
          className="block p-3 hover:bg-gray-600 transition duration-300"
        >
          Reservation
        </Link>
      </li>
      <li>
        <Link
          to="/login"
          className="block p-3 hover:bg-gray-600 transition duration-300"
        >
          Login
        </Link>
      </li>
      <li>
        <Link
          to="/signup"
          className="block p-3 hover:bg-gray-600 transition duration-300"
        >
          SignUp
        </Link>
      </li>
      <li>
        <Link
          to="/help"
          className="block p-3 hover:bg-gray-600 transition duration-300"
        >
          Help
        </Link>
      </li>
    </ul>
  </div>
  );
};

export default SideBar;
