const Bus = require('../models/Bus');
const Driver = require('../models/Driver');
const AssignedDriver = require('../models/Assigned_Driver');

module.exports = {
    // Get all assigned drivers or filter by specific bus_id
    assignedDrivers: async (req, res) => {
        try {
            const bus_id = req.params.id; // Optional bus_id from request parameters

            // Fetch buses with their assigned drivers
            const condition = bus_id ? { bus_id } : {}; // Filter by bus_id if provided
            const assignments = await AssignedDriver.findAll({
                where: condition,
                include: [
                    { model: Bus, attributes: ['id', 'capacity'] }, // Include bus details
                    { model: Driver, attributes: ['id', 'name', 'contact'] }, // Include driver details
                ],
            });

            if (assignments.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: bus_id
                        ? `No assigned driver found for bus ID ${bus_id}`
                        : 'No assigned drivers found',
                });
            }

            return res.status(200).json({
                success: true,
                assignedDrivers: assignments,
            });
        } catch (error) {
            console.error('Error fetching assigned drivers:', error.message);
            return res.status(500).json({
                success: false,
                error: error.message,
            });
        }
    },

    // Get a specific bus's assigned driver by bus_id
    getSpecificAssignedDriver: async (req, res) => {
        try {
            const bus_id = req.params.id; // Bus ID from request parameters

            // Fetch the assigned driver for the given bus
            const assignment = await AssignedDriver.findOne({
                where: { bus_id },
                include: [
                    { model: Bus, attributes: ['id', 'capacity'] }, // Include bus details
                    { model: Driver, attributes: ['id', 'name', 'contact'] }, // Include driver details
                ],
            });

            if (!assignment) {
                return res.status(404).json({
                    success: false,
                    message: `No assigned driver found for bus ID ${bus_id}`,
                });
            }

            return res.status(200).json({
                success: true,
                assignedDriver: assignment,
            });
        } catch (error) {
            console.error(`Error fetching assigned driver for bus ID ${req.params.id}:`, error.message);
            return res.status(500).json({
                success: false,
                error: error.message,
            });
        }
    },

    // Update the driver assigned to a bus
    updateBusDriver: async (req, res) => {
        try {
            const bus_id = req.params.id; // Bus ID from request parameters
            const { driver_id } = req.body; // New driver ID from the request body

            // Validate the driver ID
            const driver = await Driver.findOne({ where: { id: driver_id } });
            if (!driver) {
                return res.status(404).json({
                    success: false,
                    message: 'Driver not found',
                });
            }

            // Validate the bus ID
            const bus = await Bus.findOne({ where: { id: bus_id } });
            if (!bus) {
                return res.status(404).json({
                    success: false,
                    message: 'Bus not found',
                });
            }

            // Check if there is an existing assignment for the bus
            let assignment = await AssignedDriver.findOne({ where: { bus_id } });
            if (assignment) {
                // Update the driver for the existing assignment
                assignment.driver_id = driver_id;
                await assignment.save();
            } else {
                // Create a new assignment if none exists
                assignment = await AssignedDriver.create({ bus_id, driver_id });
            }

            return res.status(200).json({
                success: true,
                message: 'Driver reassigned to the bus successfully',
                assignedDriver: assignment,
            });
        } catch (error) {
            console.error('Error updating bus driver:', error.message);
            return res.status(500).json({
                success: false,
                error: error.message,
            });
        }
    },
};
