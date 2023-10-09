const carModel = require('../Models/cars');
const reserveCar = require('../Models/reserveCar');
module.exports = {
  getAllCars: async (req, res) => {
    try {
      const searchData = req.headers['searchdata'];
      console.log("search data is===>", searchData);
      const allCars = await carModel.find();
      const allCarsArray = allCars.map(car => car.cars);
      const flattenedArray = allCarsArray.flatMap(array => array);
      const filteredArray = flattenedArray.filter(object => Object.keys(object).length > 0); //for removing/filtering empty objects
      // console.log("filter cars is ==>", filteredArray);
      const matchingFilters = filteredArray.filter((obj) => {
        return (
          obj.name.toLowerCase().startsWith(searchData.toLowerCase()) ||
          obj.model.toLowerCase().startsWith(searchData.toLowerCase()) ||
          obj.colour.toLowerCase().startsWith(searchData.toLowerCase())
        );
      });
      res.json({status: 200, msg: 'cars found', data: matchingFilters})
    } catch (error) {
      if (error.name === 'CastError') {
        res.status(404).json({ data: 'Not found ', message: 'Cars not found.' });
      } else {
        res.status(500).json({ data: 'Failed ', message: 'Internal server error.' });
      }
    }
  },
  getAvailableCars: async(req, res)=>{
     try {
      const allCars = await carModel.find();
      const allCarsArray = allCars.map(car => car.cars);
      const flattenedArray = allCarsArray.flatMap(array => array);
      const filteredArray = flattenedArray.filter(object => Object.keys(object).length > 0);
      // console.log("filter array ===>", filteredArray);
      res.json({status: 200, msg: 'cars found', data: filteredArray})
     } catch (error) {
      if (error.name === 'CastError') {
        res.status(404).json({ data: 'Not found ', message: 'Cars not found.' });
      } else {
        res.status(500).json({ data: 'Failed ', message: 'Internal server error.' });
      }
     }
  },
  reserveCarData: async (req, res) => {
    const carId = req.body.carId;
    const daysForRent = req.body.daysForRent;
    try {
      const car = await carModel.findOne({ 'cars._id': carId });
      if (!car) {
        return res.status(404).json({ error: 'Car not found' });
      }
      const carToReserve = car.cars.find((c) => c._id.equals(carId));
      if (!carToReserve) {
        return res.status(404).json({ error: 'Car not found' });
      }
      carToReserve.availability = 'reserved'; //Car is Reserved
      carToReserve.availabilityEndDate = new Date();
      carToReserve.availabilityEndDate.setDate(
        carToReserve.availabilityEndDate.getDate() + daysForRent
      );
      // Car reservation creation
      const resCar = await reserveCar.create(req.body);
      await car.save();
      const availabilityCheckJob = setTimeout(async () => {
        if (new Date() >= carToReserve.availabilityEndDate) {
          carToReserve.availability = 'available'; //set again available
          carToReserve.availabilityEndDate = null;
          //delete reservation cart when time up from Reserve Car Schema
          await reserveCar.deleteOne({
            carId: req.body.carId,
            userId: req.body.userId,
          });
          await car.save();
        }
      }, daysForRent * 24 * 60 * 60 * 1000); // Convert days to milliseconds
      res.json({ status: 200, msg: 'Car availability set', data: carToReserve, reserveCarCart: resCar });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
  getReserveCars: async (req, res) => {
    const userId = req.headers['userid'];
    try {
      const reserveCars = await reserveCar.find({ userId: userId });
      if (reserveCars.length > 0) {
        res.json({ status: 200, msg: 'Car Reserve found', data: reserveCars });
      } else {
        res.json({ status: 404, msg: 'No reservation of cars' });
      }
    } catch (error) {
      res.status(500).json({ data: 'Failed ', message: 'Internal server error.', error: error });
    }
  },
  cancelReservationCar: async (req, res) => {
    const carId = req.headers['carid'];
    const reservationCartId = req.headers['_id']  // for del reserve car
    const userId = req.headers['userid'];
    await reserveCar.findOneAndDelete({ _id: reservationCartId });
    try {
      const car = await carModel.findOne({ 'cars._id': carId });
      console.log("car is ==>", car);
      if (car) {
        const carIdString = carId.toString();
        const carIndex = car.cars.findIndex((c) => c._id.toString() === carIdString);
        console.log("car index is ==>", carIndex);
        if (carIndex !== -1) {
          car.cars[carIndex].availability = 'available';
          await car.save();
          const remainingCars = await reserveCar.find({ userId: userId });
          console.log("reserve cars ==>", remainingCars);
          res.json({ status: 200, msg: 'Car cancellation successful', data: remainingCars });
        } else {
          res.status(404).json({ status: 404, msg: 'Car not found in carModel' });
        }
      } else {
        res.status(404).json({ status: 404, msg: 'Car not found in carModel' });
      }
    } catch (error) {
      console.error("error is", error);
      res.status(500).json({ status: 500, msg: 'Internal Server Error' });
    }
    













    // ====================================================
    // console.log("user id is ==>", userId);
    // try {
    //   await reserveCar.findOneAndDelete({ _id: reservationCartId });
    //   // await reserveCar.save();
    //       const car = await carModel.findOne({ 'cars._id': carId });
    //       console.log("car is ==>", car);
    //   if(car){
    //     const carIdString = carId.toString();
    //     try {
    //       const carIndex = car.cars.findIndex((c) => c._id.toString() === carIdString);
    //       console.log("car index is ==>", carIndex);
    //       car.cars[carIndex].availability = 'available';
    //       const remainingCars = await reserveCar.find({userId: userId});
    //       console.log("reserve cars ==>", remainingCars);
    //       res.json({ status: 200, msg: 'Car cancellation successfull', data: remainingCars});
    //     } catch (error) {
    //       console.log("error is",error);
    //     }
    //   } else {
    //     console.log("Car not found");
    //   }
    // } catch (error) {
    //   res.status(500).json({ data:'Failed ',message: 'Internal server error.', error: error});
    // }
  }
}