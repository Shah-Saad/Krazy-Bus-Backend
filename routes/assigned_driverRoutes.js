const Assigned_DriverController = require('../controllers/assigned_driverController');
const express = require('express');
const router = express.Router();

// Route to get a specific driver
router.get('/get/:id', Assigned_DriverController.getSpecificAssignedDriver);

// Route to get all assiged drivers
router.get('/all', Assigned_DriverController.assignedDrivers);

// Route to create the driver-bus assignment
router.post('/create', Assigned_DriverController.create);

// Route to update an assigned driver
router.put('/update/:id', Assigned_DriverController.updateBusDriver);

module.exports = router;
