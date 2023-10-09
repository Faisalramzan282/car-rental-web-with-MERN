const express = require('express');
const router = express.Router();
const carController = require('../controllers/cars')

router.post('/add-car', carController.addCar);
router.get('/get-cars/:mangerID' , carController.getCars);
router.delete('/delete-car/:carId/:mangerId', carController.deleteCar);
router.patch('/update-car/:mangerId', carController.updateCar);
router.get('/get-reserve-cars', carController.getReservedCars);
router.get('/users-reserve-car', carController.usersReserveCar);
module.exports = router;