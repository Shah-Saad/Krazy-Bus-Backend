const driverController = require('../controllers/driverController');
const express = require('express');
const router = express.Router();

// Route to get a specific driver by ID
router.get('/get/:id', driverController.getAll);

// Route to get all drivers
router.get('/all', driverController.getAllDrivers);

// Route to create a new driver
router.post('/create', driverController.create);

// Route to update an existing driver
router.put('/update/:id', driverController.update);

// Route to delete a driver
router.delete('/delete/:id', driverController.delete);

router.get('/un-assigned/all',driverController.UnAssignedDrivers)

module.exports = router;
