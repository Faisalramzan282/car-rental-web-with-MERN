const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CarSchema = new Schema({
  managerId: {
      type: String,
      trim: true,
      required: true,
    },
    cars: [
      {
        carName: {
          type: String,
          trim: true,
        },
        model: {
          type: String,
          trim: true,
        },
        carColor: {
          type: String,
          trim: true,
        },
        availability: {
          type: String,
          enum: ['available', 'not available', 'reserved'],
          default: 'available',
        },
        carImageData: {
          image: {
            type: Buffer,
            required: true,
          },
          extension: {
            type: String,
          },
          carImgName: {
            type: String,
          },
        },
        
      },
    ],
  });
  
module.exports = mongoose.model('Car', CarSchema);