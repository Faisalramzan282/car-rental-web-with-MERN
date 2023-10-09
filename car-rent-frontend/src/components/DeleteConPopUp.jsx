import React from "react";

const DeleteConPopUp=({ onConfirmDelete, onCancelDelete })=>{
    return(
        <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="absolute inset-0 bg-gray-600 opacity-75"></div>
        <div className="bg-white p-8 rounded shadow-lg z-50">
          <p>Are you sure you want to delete this user?</p>
          <div className="mt-4 flex justify-end">
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-4"
              onClick={onConfirmDelete}
              >
              Delete
            </button>
            <button
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
              onClick={onCancelDelete}
              >
              Cancel
            </button>
          </div>
        </div>
      </div>
    )
}
export default DeleteConPopUp;