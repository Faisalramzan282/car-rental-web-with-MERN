import React, { useState, useEffect } from "react";
import { Formik, Form, Field, resetForm } from "formik";
import { useDropzone } from "react-dropzone";
import allActions from "../../store/actions";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import DeleteConPopUp from "../DeleteConPopUp";
import EditCar from "./EditCarPopUp";
import {Buffer} from 'buffer';
import getAllCars from '../../store/reducers/getAllCars';
const Car = () => {
  const [carImage, setCarImage] = useState({
    carImgName: "",
    carImageBinary: "",
    Extension: "",
  });
  const [deletePopUp, setDeletePopUp] = useState(false);
  const [deleteCarId, setDeleteCarId] = useState("");
  const [editCarPopUp, setEditCarPopUp] = useState(false);
  const dispatch = useDispatch();
  const allCars = useSelector((state) => state);
  // let allCarsArray = allCars.getAllCars.state.payload || []
  console.log("all cars in useSelector==>", allCars.getAllCars);
  useEffect(() => {
    dispatch(allActions.getAllCars());
  }, []);
  const onDrop = (acceptedFiles) => {
    const imageFile = acceptedFiles[0];
    let carImgName = imageFile.name;
    let carExtension = imageFile.name.split(".").pop();
    if (imageFile) {
      const reader = new FileReader();
      reader.onload = (event) => {
        let carImageBinary = event.target.result;
        setCarImage({ carImgName, carImageBinary, carExtension });
      };
      reader.readAsDataURL(imageFile);
    }
  };
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*", // Accept only image files
    onDrop,
  });
  const deleteCarBtn=(carObj)=>{
   setDeletePopUp(true);
   console.log("yes", carObj._id);
  setDeleteCarId(carObj._id);
  console.log("nnow delete car adatis ==>", deleteCarId );
  }
  const handleConfirmDelete=()=>{
    dispatch(allActions.deleteCar(deleteCarId));
    setDeletePopUp(false);
  }
  // const imageHandling = (carObj) => {
  //   console.log("image handling ");
  //   const bindata = new Uint8Array(carObj.carImageData.image.data);

  //   const stringData = bindata.toString();
  //   const base64String = btoa(stringData);
  //    return `data:image/${carObj.carImageData.extension};base64,${base64String}`
  // };
  
  return (
    <div>
      <div className="w-full md:w-1/2 mx-auto p-4 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Add a Car</h2>
        <Formik
          initialValues={{
            carName: "",
            model: "",
            carColor: "",
            availability: "",
          }}
          onSubmit={(values, { resetForm }) => {
            const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
            if (loggedUser.role === "manager") {
              const carDatas = {
                managerId: loggedUser.userId,
                ...values, // Use values, not carData
                ...carImage,
              };
              // console.log("all cars data in cr component", carDatas);
              dispatch(allActions.addCar(carDatas));
              resetForm({
                carName: "",
                model: "",
                carColor: "",
                availability: "",
              });
              //for showing off the image 
              setCarImage({
                carImgName: "",
                carImageBinary: "",
                Extension: "",
              })
              dispatch(allActions.getAllCars());
              // console.log("carrrrrrrrr")
            } else {
              alert("Not able to create Car");
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <label
                  htmlFor="carName"
                  className="block font-medium text-gray-700"
                >
                  Car Name
                </label>
                <Field
                  type="text"
                  id="carName"
                  name="carName"
                  className="form-input mt-1 block w-full py-2 border border-blue-500 rounded focus:outline-none px-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="carModel"
                  className="block font-medium text-gray-700"
                >
                  Car Model
                </label>
                <Field
                  type="text"
                  id="carModel"
                  name="model"
                  className="form-input mt-1 block w-full py-2 border border-blue-500 rounded focus:outline-none px-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="carColor"
                  className="block font-medium text-gray-700"
                >
                  Car Color
                </label>
                <Field
                  type="text"
                  id="carColor"
                  name="carColor"
                  className="form-input mt-1 block w-full py-2 border border-blue-500 rounded focus:outline-none px-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="availability"
                  className="block font-medium text-gray-700"
                >
                  Car Availability
                </label>
                <Field
                  as="select"
                  id="carAvailability"
                  name="availability"
                  className="form-select mt-1 block w-full py-2 border border-blue-500 rounded focus:outline-none px-2"
                >
                  <option disabled value="">
                    Select Availability
                  </option>
                  <option value="available">Available</option>
                  <option value="not available">Not Available</option>
                </Field>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="carImage"
                  className="block font-medium text-gray-700"
                >
                  Select Car Image
                </label>
                <div
                  {...getRootProps()}
                  className="dropzone border-dashed border-2 p-4"
                >
                  <input {...getInputProps()} />
                  {carImage ? (
                    <img
                      src={carImage.carImageBinary}
                      alt="Car Preview"
                      className=" mx-auto my-2 max-h-48 "
                    />
                  ) : (
                    <p className="text-gray-500 text-center">Drag car image</p>
                  )}
                </div>
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-5 rounded"
                >
                  Add Car
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <div>
        {allCars.getAllCars ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 p-4">
          {allCars.getAllCars.state.payload.map((car) => (
            <div key={car._id} className="bg-white rounded-lg shadow-md p-4 flex flex-col">
              {/* <div>
              <img src={imageHandling(car)} alt="Car"/>
              </div> */}
              <div className="mb-2">
                <p className="font-semibold">Name: {car.carName}</p>
                <p className="text-gray-600">Model: {car.model}</p>
                <p className="text-gray-600">Colour: {car.carColor}</p>
              </div>
              <p className="font-bold mb-2">Availability: {car.availability}</p>
              <div className="mt-auto flex justify-between">
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                onClick={()=>setEditCarPopUp(true)}
                >
                  Edit
                </button>
                {editCarPopUp && <EditCar carData={car}   onClose={()=>setEditCarPopUp(false)}
              />}
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                 onClick={()=>deleteCarBtn(car)}
                >
                  Delete
                </button>
                {deletePopUp &&  <DeleteConPopUp 
                    onConfirmDelete={handleConfirmDelete}
                    onCancelDelete={() => setDeletePopUp(false)}/>}
              </div>
            </div>
          ))}
        </div>        
        ) : (
          <div>
            <p className="text-center p-5"> Loading...</p>
          </div>
        )}
      </div>
    </div>
  );
};
export default Car;
