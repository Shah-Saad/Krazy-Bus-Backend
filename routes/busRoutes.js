const busController = require('../controllers/busController');
const express = require('express');
const router = express.Router();

// Route to get a specific bus by ID
router.get('/get/:id', busController.getAll);

// Route to get all buses
router.get('/all', busController.getAllBuses);

// route to assign driver to a bus
router.post('/assign-driver', busController.assignDriver);

// Route to update an existing bus
router.put('/update/:id', busController.update);

// Route to delete a bus
router.delete('/delete/:id', busController.delete);

module.exports = router;
