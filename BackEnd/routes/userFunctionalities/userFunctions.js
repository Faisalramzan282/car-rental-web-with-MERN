const express = require('express');
const router = express.Router();
const userFunctions = require('../../controllers/userFunctionalities/userFunctions');

router.get('/get-all-cars', userFunctions.getAllCars);
router.get('/get-available-cars', userFunctions.getAvailableCars)
router.post('/reserve-car', userFunctions.reserveCarData);
router.get('/get-reserve-cars', userFunctions.getReserveCars);
router.delete('/cancel-reservation', userFunctions.cancelReservationCar)
module.exports = router;