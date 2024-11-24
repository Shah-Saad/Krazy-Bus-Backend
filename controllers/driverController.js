const Driver = require('../models/Driver');

module.exports = {
    // Get a specific driver by ID
    getAll: async (req, res) => {
        try {
            const driver_id = req.params.id;
            const driver = await Driver.findOne({ where: { id: driver_id } });

            if (!driver) {
                return res.status(404).json({ success: false, message: 'Driver not found' });
            }

            return res.status(200).json({ success: true, driver: driver });
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({ success: false, error: error.message });
        }
    },

    // Get all drivers
    getAllDrivers: async (req, res) => {
        try {
            const drivers = await Driver.findAll();
            return res.status(200).json({ success: true, drivers: drivers});
        } catch (error) {
            console.error(error.message);
            return res.status(500).json({ success: false, error: error.message });
        }
    },


    // Create a new driver
    create: async (req, res) => {
        try {
            const data = req.body; // Get the driver details from request body
            const newDriver = await Driver.create(data); // Create a new driver in the database

            return res.status(201).json({ success: true, driver: newDriver });
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({ success: false, error: error.message });
        }
    },

    // Update an existing driver
    update: async (req, res) => {
        try {
            const driver_id = req.params.id;
            const data = req.body; // Get the updated details from request body

            const updatedDriver = await Driver.update(data, { where: { id: driver_id } });

            if (updatedDriver[0] === 0) {
                return res.status(404).json({ success: false, message: 'Driver not found or no changes made' });
            }

            return res.status(200).json({ success: true, message: 'Driver updated successfully' });
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({ success: false, error: error.message });
        }
    },

    // Delete a driver
    delete: async (req, res) => {
        try {
            const driver_id = req.params.id;

            const deleted = await Driver.destroy({ where: { id: driver_id } });

            if (!deleted) {
                return res.status(404).json({ success: false, message: 'Driver not found' });
            }

            return res.status(200).json({ success: true, message: 'Driver deleted successfully' });
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({ success: false, error: error.message });
        }
    }
};
