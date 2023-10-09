const userModel = require('./Models/users');
const jwt = require('jsonwebtoken');
const express = require('express');
const app = express();
app.set('secretKey', 'nodeRestApi');
module.exports = {
    create:async function(req, res, next) {
        const data = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role
        };
     const errors = [];  
     const usernamePattern = /^(?=.*\d)([A-Z][a-zA-Z0-9]*)$/;
     const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
     if (!usernamePattern.test(data.username)) {
        errors.push('Username start with capital letter and include numbers and not include special characters');
     }
    if(!emailPattern.test(data.email)) {
      errors.push('Invalid Email');
    }
    if(data.password.length<8)
    {
     errors.push("Password must be 8 digit")
    }
    if(errors.length > 0)
    {
     return res.status(400).json({
        status: 400,
        message: errors,
      });
    }
    else{
      const user = new userModel(data);
      user.save()
      // const allUsers =await userModel.find()
      // console.log("all Users", allUsers)
        .then((createdUser) => {
            res.status(201).json({
                status: 201,
                msg: 'User created successfully',
                data: createdUser
            });
        })
        .catch((err) => {
            res.status(500).json({
                status: 500,
                msg: 'Error creating user',
                error: err.message
            });
        });
    }
    },
    authenticate: async (req, res, next) => {
      console.log("rew body is ==> authenticate", req.body.email, req.body.password);
      try {
         const userInfo = await userModel.findOne({ email: req.body.email });
         if (!userInfo) {
            res.json({ status: "error", message: "Invalid email/password!!!", data: null });
            return;
         }
            const isPasswordValid = req.body.password === userInfo.password;         
            if (isPasswordValid) {
            const token = jwt.sign({ id: userInfo._id }, req.app.get('secretKey'), { expiresIn: '5d' });
            res.json({ status: "success", message: "User found!!!", data: { user: userInfo, token: token } });
         } else {
            res.json({ status: "error", message: "Invalid email/password!!!", data: null });
         }
       }
        catch (error) 
       {
         next(error);
      }
   },
getUsers: function(req, res) {
    userModel.find() 
        .then((foundUser) => {
            if (!foundUser) {
                return res.status(404).json({
                    status: 404,
                    msg: 'users found',
                    data: null
                });
            }
            res.status(200).json({
                status: 200,
                msg: 'users retrieved successfully',
                data: foundUser
            });
        })
        .catch((err) => {
            res.status(500).json({
                status: 500,
                msg: 'Error retrieving users',
                error: err.message
            });
        });
},
deleteUserById: async (req, res, next) => {
  // console.log("user id os ",req.params.userId);
  try {
    await userModel.findByIdAndRemove(req.params.userId);
    const remainingUsers = await userModel.find();
    res.json({ status: "success", message: "User deleted successfully!!!", data: remainingUsers });
  } catch (error) {
    res.json({ status: "Failed", message: "Not deleted ", data: null });
    next(error);
  }
},
updateUser: async(req, res, next)=>
{
  // console.log("req body is ==>)", req.body);
  try {
    await userModel.findByIdAndUpdate(req.params.userId, {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role
    });
    res.json({ status: "success", message: "User Updated successfully!!!", data: null });
  } catch (error) {
    res.json({ status: "Failed", message: "Not Update ", data: null });
    next(error);
  }
}
}