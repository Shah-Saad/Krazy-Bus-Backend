const userController = require('../controllers/userController');
const express = require('express');
const router = express.Router();

// Route to get a specific user by ID
router.get('/get/:id', userController.getAll);

// Route to get all users
router.get('/all', userController.getAllUsers);

// Route to create a new user
router.post('/', userController.create);

// Route to update an existing user
router.put('/update/:id', userController.update);

// Route to delete a user
router.delete('/delete/:id', userController.delete);

module.exports = router;
