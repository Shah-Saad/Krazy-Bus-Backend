const Payment = require('../models/Payment');

module.exports = {
    getAll: async (req, res) => {
        try {
            const payment_id = req.params.id;
            const payment = await Payment.findOne({ where: { id: payment_id } });

            return res.status(200).json({ success: true, payment: payment });
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({ success: false, error: error.message });
        }
    },

    // Get all payments
    getAllPayments: async (req, res) => {
        try {
            const payments = await Payment.findAll();
            return res.status(200).json({ success: true, payments: payments});
        } catch (error) {
            console.error(error.message);
            return res.status(500).json({ success: false, error: error.message });
        }
    },

    create: async (req, res) => {
        try {
            const data = req.body;
            const newPayment = await Payment.create(data);

            return res.status(201).json({ success: true, payment: newPayment });
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({ success: false, error: error.message });
        }
    },

    update: async (req, res) => {
        try {
            const payment_id = req.params.id;
            const data = req.body;

            const updatedPayment = await Payment.update(data, { where: { id: payment_id } });

            if (updatedPayment[0] === 0) {
                return res.status(404).json({ success: false, message: 'Payment not found' });
            }

            return res.status(200).json({ success: true, message: 'Payment updated successfully' });
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({ success: false, error: error.message });
        }
    },

    delete: async (req, res) => {
        try {
            const payment_id = req.params.id;

            const deleted = await Payment.destroy({ where: { id: payment_id } });

            if (!deleted) {
                return res.status(404).json({ success: false, message: 'Payment not found' });
            }

            return res.status(200).json({ success: true, message: 'Payment deleted successfully' });
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({ success: false, error: error.message });
        }
    }
};
