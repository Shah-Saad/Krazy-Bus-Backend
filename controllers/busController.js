const { route } = require('..');
const Bus = require('../models/Bus');

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

            const deleted = await Bus.destroy({ where: { id: bus_id } });

            if (!deleted) {
                return res.status(404).json({ success: false, message: 'Bus not found' });
            }

            return res.status(200).json({ success: true, message: 'Bus deleted successfully' });
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({ success: false, error: error.message });
        }
    },

    // Get unassigned buses (example logic assuming no direct relation to routes in the Bus model)
    UnAssignedBuses: async (req, res) => {
        try {
            // Fetch all buses
            const buses = await Bus.findAll();

            // Fetch all routes with assigned buses (assuming you have a `Route` model)
            const routes = await Route.findAll({
                attributes: ['bus_id'], // Fetch only the bus_id field
            });

            // Extract bus IDs from routes
            const assignedBusIds = routes.map(route => route.bus_id);

            // Filter buses to exclude those with IDs present in the assignedBusIds
            const unassignedBuses = buses.filter(bus => !assignedBusIds.includes(bus.id));

            return res.status(200).json({ success: true, buses: unassignedBuses });
        } catch (error) {
            console.error('Error fetching unassigned buses:', error.message);
            return res.status(500).json({ success: false, error: error.message });
        }
    },
};
