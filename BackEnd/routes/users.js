const express = require("express");
const router = express.Router();
const userController = require("../controllers/users");

router.post('/users', userController.create);
router.post('/authenticate', userController.authenticate)
router.get('/users', userController.getUsers);
router.delete('/users/:userId', userController.deleteUserById);
router.patch('/users/:userId', userController.updateUser)
module.exports = router;