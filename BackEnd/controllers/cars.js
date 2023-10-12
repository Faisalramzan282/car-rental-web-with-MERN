const carModel = require('./Models/cars');
const reserveModel = require('./Models/reserveCar');
const userModel = require('./Models/users');
const { Buffer } = require('buffer');
module.exports = {
  addCar: async (req, res, next) => {
    // console.log("req.body ===>", req.body);
    const { managerId, carName, model, carColor, availability, carImgName,  carImageBinary, carExtension } = req.body;
    // const imageBuffer = Buffer.from(imageFile, 'base64');
    try {
      const newCar = {
        carName,
        model,
        carColor,
        availability,
        carImageData: {
          image : carImageBinary,
          extension: carExtension,
          carImgName: carImgName
        },
      };
      let manager = await carModel.findOne({ managerId : managerId });
      if (!manager) {
        manager = await carModel.create({ managerId: managerId, cars: [newCar] });
      }
      else {
        manager.cars.push(newCar);
        await manager.save();
      }
      res.json({
        status: "Success",
        message: "Car added successfully to manager",
        data: manager,
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
    const managerId = req.params.mangerId; //mangerID to get only its cars
    // console.log("manager Id is==> ", managerId);
    await carModel.findOne({ managerId }).select('cars')
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
    const managerId = req.params.managerId;
    const carId = req.params.carId;
    console.log("manager and car Id ==>", managerId, carId);
    const foundManager = await carModel.findOne({ managerId: managerId });
    if (foundManager) {
      console.log("manager found ")
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
    const managerId = req.params.managerId;
    const carId = req.body._id //cars id 
    const carObj = {
      carName: req.body.carName,
      model: req.body.model,
      carColor: req.body.carColor,
      availability: req.body.availability
    }
    console.log("car Obj ", carObj);
    try {
      const updatedCar = await carModel.findOneAndUpdate(
        {
          managerID: managerId,
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