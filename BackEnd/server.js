const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const port = process.env.PORT || 3001;
const users = require('./routes/users')
const cars = require('./routes/cars');
const userFunctions = require('./routes/userFunctionalities/userFunctions');
const mongoose = require('mongoose');
const router = require('./routes/cars');
// app.use(logger('dev'));
require('dotenv').config();
app.use(cors());
// app.use(bodyParser.json());
app.use(bodyParser.json({limit:1024*1024*20, type:'application/json'}));
app.use(bodyParser.urlencoded({extended:true,limit:1024*1024*20,type:'application/x-www-form-urlencoding' }));
app.set('secretKey', 'nodeRestApi');
mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,

    })
    .then(() => console.log('MongoDB database Connected...'))
    .catch((err) => console.log(err))
app.use('/', users);
app.use('/cars', cars);
app.use('/user-page', userFunctions);
app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}/`);
});
