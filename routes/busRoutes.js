const busController = require('../controllers/busController');
const express = require('express');
const router = express.Router();

// Route to get a specific bus by ID
router.get('/get/:id', busController.getAll);

// Route to get all buses
router.get('/all', busController.getAllBuses);

// Route to create a bus
router.post('/create', busController.createBus);

// Route to update an existing bus
router.put('/update/:id', busController.update);

// Route to delete a bus
router.delete('/delete/:id', busController.delete);

router.get('/un-assigned/all', busController.UnAssignedBuses)

module.exports = router;
