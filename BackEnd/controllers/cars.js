const carModel = require('./Models/cars');
const reserveModel = require('./Models/reserveCar');
const userModel = require('./Models/users');
const { Buffer } = require('buffer');
module.exports = {
  addCar: async (req, res, next) => {
    const { name, model, colour, availability, mangerID, imageFile, fileExtension,  fileMimeType } = req.body;
    const imageBuffer = Buffer.from(imageFile, 'base64');
    try {
      const newCar = {
        name,
        model,
        colour,
        availability,
        imageData: {
          image : imageBuffer,
          extension: fileExtension,
          fileMimeType: fileMimeType
        },     
      };
      let CarDetail = await carModel.findOne({ mangerID: mangerID });
      if (!CarDetail) {
        CarDetail = await carModel.create({ mangerID: mangerID, cars: [newCar] });
      }
      else {
        CarDetail.cars.push(newCar);
        await CarDetail.save();
      }
      res.json({
        status: "Success",
        message: "Car added successfully to manager",
        data: CarDetail,
      });
    } catch (error) {
      res.json({
        status: "Failed",
        message: "Failed to add car",
        data: null,
      });
      next(error);
    }
  },
  getCars: async (req, res) => {
    const mangerID = req.params.mangerID; //mangerID to get only its cars
    await carModel.findOne({ mangerID }).select('cars')
      .then((foundCar) => {
        if (!foundCar) {
          return res.status(404).json({
            status: 404,
            msg: 'Car not found',
            data: null
          });
        }
        res.status(200).json({
          status: 200,
          msg: 'Cars retrieved successfully',
          data: foundCar
        });
      })
      .catch((err) => {
        res.status(500).json({
          status: 500,
          msg: 'Error retrieving Cars',
          error: err.message
        });
      });
  },
  deleteCar: async (req, res) => {
    const mangerId = req.params.mangerId;
    const carId = req.params.carId;
    const foundManager = await carModel.findOne({ mangerID: mangerId });
    if (foundManager) {
      const foundCar = foundManager.cars.findIndex((car) => car._id.toString() === carId);
      foundManager.cars.splice(foundCar, 1); //remove object from cars array
      await foundManager.save();
      res.status(200).json({
        status: 200,
        msg: 'Car delete successfully',
        data: foundManager.cars
      });
    } else {
      res.status(404).json({
        status: 404,
        msg: 'Manager not found',
        data: "Not able to show"
      });
    }
  },
  updateCar: async (req, res) => {
    const mangerId = req.params.mangerId;
    const carId = req.body._id //cars id 
    const carObj = {
      name: req.body.name,
      model: req.body.model,
      colour: req.body.colour,
      availability: req.body.availability
    }
    try {
      const updatedCar = await carModel.findOneAndUpdate(
        {
          mangerID: mangerId,
          'cars._id': carId
        },
        {
          $set: {
            'cars.$': carObj
          }
        },
        {
          new: true
        }
      );

      if (updatedCar) {
        res.status(200).json({
          status: 200,
          msg: 'Car updated successfully',
          data: updatedCar
        });
      } else {
        res.status(404).json({
          status: 404,
          msg: 'Car not found'
        });
      }
    } catch (error) {
      console.error('Error updating car:', error);
      res.status(500).json({
        status: 500,
        msg: 'Internal Server Error'
      });
    }
  },
  getReservedCars: async (req, res) => {
    try {
      const managerID = req.headers['mangerid'];
      const manager = await carModel.findOne({ mangerID: managerID });
      const carObj = manager.cars.map((car) => car);
      const reservCar = await reserveModel.find();
      const users = await userModel.find();
      const userCarReservationArr = [];
      reservCar.forEach((reserve) => {
        const matchingCar = carObj.find((car) => car._id.toString() === reserve.carId);
        const userData = users.find((user) => user._id.toString() === reserve.userId);
        if (matchingCar) {
          const mergedObject = {
            _id: matchingCar._id,
            name: matchingCar.name,
            model: matchingCar.model,
            username: userData.username,
            email: userData.email,
            carId: reserve.carId,
            userId: reserve.userId,
            daysForRent: reserve.daysForRent,
            dropOffDate: reserve.dropOffDate,
            dropOffLoc: reserve.dropOffLoc,
            pickUpDate: reserve.pickUpDate,
            pickUpLoc: reserve.pickUpLoc,
          };
          userCarReservationArr.push(mergedObject);
        }
      });
      res.json({ status: 200, msg: "success", data: userCarReservationArr });
    } catch (error) {
      res.json({ status: 404, msg: "Failed", data: "No Reservation" })
    }
  },
  usersReserveCar: async (req, res) => {
    try {
      const userIdArray = [];
      const userIdObjs = await reserveModel.find({}, 'userId');
      const userIds = userIdObjs.map(user => user.userId);
      const uniqueUserIds = Array.from(new Set(userIds));
      for (let userId of uniqueUserIds) {
        const users = await userModel.find({ _id: userId });
        userIdArray.push(...users);
      }
      if (userIdArray.length > 0) {
        res.json({ status: 200, msg: "success", data: userIdArray });
      } else {
        res.json({ status: 404, msg: "Failed", data: "No one reserved car" });
      }
    } catch (error) {
      console.log("error is==>", error);
    }
  }
}