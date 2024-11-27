const Assigned_BusController = require('../controllers/assigned_busController');
const express = require('express');
const router = express.Router();

// Route to get a specific driver
router.get('/get/:id', Assigned_BusController.getSpecificAssignedBus);

// Route to get all assiged drivers
router.get('/all', Assigned_BusController.assignedBuses);

// Route to update an assigned driver
router.put('/update/:id', Assigned_BusController.updateRouteBus);

// Route to assign bus to a route
router.post('/create', Assigned_BusController.create);

module.exports = router;
