const { where } = require('sequelize');
const Driver = require('../models/Driver');
const Bus = require('../models/Bus');

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
            const { name, contact } = req.body; // Destructure name and contact from request body

            // Validate input
            if (!name || !contact) {
                return res.status(400).json({ 
                    success: false, 
                    message: 'Both name and contact are required to create a driver' 
                });
            }

            // Create the new driver in the database
            const newDriver = await Driver.create({ name, contact });

            return res.status(201).json({ 
                success: true, 
                message: 'Driver created successfully', 
                driver: newDriver 
            });
        } catch (error) {
            console.log('Error creating driver:', error.message);
            return res.status(500).json({ success: false, error: error.message });
        }
    },


    // Update an existing driver
    update: async (req, res) => {
        try {
            const driver_id = req.params.id;
            const { name, contact } = req.body; // Destructure to get name and contact from request body
    
            // Check if the driver exists
            const driver = await Driver.findByPk(driver_id);
            if (!driver) {
                return res.status(404).json({ success: false, message: 'Driver not found' });
            }
    
            // Update the driver's name and contact
            const updatedDriver = await Driver.update(
                { name, contact },
                { where: { id: driver_id } }
            );
    
            if (updatedDriver[0] === 0) {
                return res.status(400).json({ success: false, message: 'No changes made to the driver' });
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
    },
    
    UnAssignedDrivers: async (req, res) => {
        try {
            // Fetch all drivers
            const drivers = await Driver.findAll({
                
            });
    
            // Fetch all buses with assigned drivers
            const buses = await Bus.findAll({
                attributes: ['driver_id'] // Fetch only the driver_id field
            });
    
            // Extract driver IDs from buses
            const assignedDriverIds = buses.map(bus => bus.driver_id);
    
            // Filter drivers to exclude those with IDs present in the assignedDriverIds
            const unassignedDrivers = drivers.filter(driver => !assignedDriverIds.includes(driver.id));
    
            // Respond with the unassigned drivers
           return res.status(200).json({ success : true ,  driver : unassignedDrivers });
        } catch (error) {
            console.error('Error fetching unassigned drivers:', error);
            res.status(500).json({ error: 'An error occurred while fetching unassigned drivers.' });
        }
    }
    
};
