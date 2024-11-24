const paymentController = require('../controllers/paymentController');
const express = require('express');
const router = express.Router();

// Route to get a specific payment by ID
router.get('/get/:id', paymentController.getAll);

// Route to get all payments
router.get('/all', paymentController.getAllPayments);

// Route to create a new payment
router.post('/create', paymentController.create);

// Route to update an existing payment
router.put('/update/:id', paymentController.update);

// Route to delete a payment
router.delete('/delete/:id', paymentController.delete);

module.exports = router;
