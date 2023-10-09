const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reserveCar = new Schema({
    carId: {
        type: String, 
        required: true
    },
    userId:{
        type: String,
        required: true
    },
    daysForRent: {
        type: Number,
        required: true
    },
    dropOffDate:{
        type: String,
        required: true
    }, 
    dropOffLoc:{
        type: String,
        required: true
    },
    pickUpDate:{
     type: String,
     required: true
    },
    pickUpLoc:{
        type: String,
        required: true
    }
})
module.exports = mongoose.model('reserve-car', reserveCar);