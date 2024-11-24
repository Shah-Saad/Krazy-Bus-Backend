const bookingController = require('../controllers/bookingController');
const express = require('express');
const router = express.Router();

// Route to get a specific booking by ID
router.get('/get/:id', bookingController.getAll);

// Route to get all bookings
router.get('/all', bookingController.getAllBookings);

// Route to create a new booking
router.post('/create', bookingController.createBooking);

// Route to update an existing booking
router.put('/update/:id', bookingController.update);

// Route to delete a booking
router.delete('/delete/:id', bookingController.delete);

module.exports = router;
