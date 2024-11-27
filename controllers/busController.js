const { route } = require('..');
const Bus = require('../models/Bus');
const Assigned_Bus = require('../models/Assigned_Bus');

module.exports = {
    // Get a specific bus by ID
    getAll: async (req, res) => {
        try {
            const bus_id = req.params.id;
            const bus = await Bus.findOne({ where: { id: bus_id } });

            if (!bus) {
                return res.status(404).json({ success: false, message: 'Bus not found' });
            }

            return res.status(200).json({ success: true, bus });
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({ success: false, error: error.message });
        }
    },

    // Create a new bus
    createBus: async (req, res) => {
        try {
            const { capacity } = req.body;

            // Validate required fields
            if (!capacity) {
                return res.status(400).json({
                    success: false,
                    message: 'Capacity is required to create a bus',
                });
            }

            // Create the bus
            const newBus = await Bus.create({ capacity });

            return res.status(201).json({
                success: true,
                message: 'Bus created successfully',
                bus: newBus,
            });
        } catch (error) {
            console.error(error.message);
            return res.status(500).json({ success: false, error: error.message });
        }
    },

    // Get all buses
    getAllBuses: async (req, res) => {
        try {
            const buses = await Bus.findAll();
            return res.status(200).json({ success: true, buses });
        } catch (error) {
            console.error(error.message);
            return res.status(500).json({ success: false, error: error.message });
        }
    },

    // Update a bus
    update: async (req, res) => {
        try {
            const bus_id = req.params.id;
            const { capacity } = req.body;

            // Check if the bus exists
            const bus = await Bus.findByPk(bus_id);
            if (!bus) {
                return res.status(404).json({ success: false, message: 'Bus not found' });
            }

            // Update the bus with the new data
            const updatedBus = await bus.update({ capacity });

            return res.status(200).json({
                success: true,
                message: 'Bus updated successfully',
                bus: updatedBus,
            });
        } catch (error) {
            console.error(error.message);
            return res.status(500).json({ success: false, error: error.message });
        }
    },

    // Delete a bus
    delete: async (req, res) => {
        try {
            const bus_id = req.params.id;

            // Check if the bus is assigned to any route
            const isAssigned = await Assigned_Bus.findOne({ where: { bus_id } });
            if (isAssigned) {
                return res.status(400).json({
                    success: false,
                    message: 'Bus is assigned to a route and cannot be deleted',
                });
            }

            // Delete the bus
            const deleted = await Bus.destroy({ where: { id: bus_id } });

            if (!deleted) {
                return res.status(404).json({ success: false, message: 'Bus not found' });
            }

            return res.status(200).json({ success: true, message: 'Bus deleted successfully' });
        } catch (error) {
            console.error(error.message);
            return res.status(500).json({ success: false, error: error.message });
        }
    },

    // Get unassigned buses
    UnAssignedBuses: async (req, res) => {
        try {
            // Fetch all assigned bus IDs from the Assigned_Bus table
            const assignedBusIds = await Assigned_Bus.findAll({
                attributes: ['bus_id'],
            }).then(assignments => assignments.map(assignment => assignment.bus_id));

            // Fetch buses not in the assigned IDs
            const unassignedBuses = await Bus.findAll({
                where: {
                    id: { [require('sequelize').Op.notIn]: assignedBusIds },
                },
            });

            return res.status(200).json({ success: true, buses: unassignedBuses });
        } catch (error) {
            console.error('Error fetching unassigned buses:', error.message);
            return res.status(500).json({ success: false, error: error.message });
        }
    },
};
