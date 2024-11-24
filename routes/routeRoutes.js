const routeController = require('../controllers/routeController');
const express = require('express');
const router = express.Router();

// Route to get a specific route by ID
router.get('/get/:id', routeController.getAll);

// Route to get all routes
router.get('/all', routeController.getAllRoutes);

// Route to create a new route
router.post('/create', routeController.create);

// Route to update an existing route
router.put('/update/:id', routeController.update);

// Route to delete a route
router.delete('/delete/:id', routeController.delete);

module.exports = router;
