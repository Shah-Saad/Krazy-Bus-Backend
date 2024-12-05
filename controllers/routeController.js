const Route = require('../models/Route');
const Bus = require('../models/Bus');
const AssignedBus = require('../models/Assigned_Bus');
const AssignedDriver = require('../models/Assigned_Driver');
const Driver = require('../models/Driver');

module.exports = {
    // Get a specific route by ID
    getAll: async (req, res) => {
        try {
            const route_id = req.params.id;

            const route = await Route.findOne({ where: { id: route_id }, });

            if (!route) {
                return res.status(404).json({ success: false, message: 'Route not found' });
            }

            return res.status(200).json({ success: true, route });
        } catch (error) {
            console.error(error.message);
            return res.status(500).json({ success: false, error: error.message });
        }
    },

    // Get all routes
    getAllRoutes: async (req, res) => {
        try {
            const routes = await Route.findAll({
                include: [
                    {
                        model: AssignedBus, 
                        attributes:{
                            exclude : ['route_id']
                        },
                        include: [
                            {
                                model: Bus, // Include bus details
                                attributes: ['capacity'],
                                include: [
                                    {
                                        model: AssignedDriver,
                                        attributes:{
                                            exclude : ['bus_id']
                                        },
                                        include: [
                                            {
                                                model: Driver, 
                                                attributes: ['name', 'contact'], 
                                            },
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                ],
            });
    
            return res.status(200).json({ success: true, routes });
        } catch (error) {
            console.error(error.message);
            return res.status(500).json({ success: false, error: error.message });
        }
    },

    // Create a new route and assign it to a specific bus
    create: async (req, res) => {
        try {
            const { start_location, end_location, stops, departure_time, arrival_time, bus_id } = req.body;
    
            // Check if bus exists
            const bus = await Bus.findByPk(bus_id);
            if (!bus) {
                return res.status(404).json({ success: false, message: 'Bus not found' });
            }
    
            // Check if the bus is already assigned
            const isAssigned = await AssignedBus.findOne({ where: { bus_id } });
            if (isAssigned) {
                return res.status(400).json({ success: false, message: 'Bus already assigned to a route' });
            }
    
            // Create the route
            const newRoute = await Route.create({
                start_location,
                end_location,
                stops,
                departure_time,
                arrival_time,
            });
    
            // Assign the bus to the route
            await AssignedBus.create({ route_id: newRoute.id, bus_id });
    
            return res.status(200).json({ success: true, route: newRoute });
        } catch (error) {
            console.error(error.message);
            return res.status(500).json({ success: false, error: error.message });
        }
    },
    

    // Update an existing route
    update: async (req, res) => {
        try {
            const route_id = req.params.id;
            const { start_location, end_location, stops, departure_time, arrival_time } = req.body;

            // Find the route to ensure it exists
            const route = await Route.findByPk(route_id);
            if (!route) {
                return res.status(404).json({ success: false, message: 'Route not found' });
            }

            // Update the route with new details
            await route.update({ start_location, end_location, stops, departure_time, arrival_time });

            return res.status(200).json({ success: true, message: 'Route updated successfully' });
        } catch (error) {
            console.error(error.message);
            return res.status(500).json({ success: false, error: error.message });
        }
    },

    // Delete a route
    delete: async (req, res) => {
        try {
            const route_id = req.params.id;

            // Check if the route exists
            const route = await Route.findByPk(route_id);
            if (!route) {
                return res.status(404).json({ success: false, message: 'Route not found' });
            }

            // Check for assigned buses to the route
            const assignedBuses = await AssignedBus.findAll({ where: { route_id } });
            if (assignedBuses.length > 0) {
                return res.status(400).json({
                    success: false,
                    message: 'Cannot delete the route as it has assigned buses.',
                });
            }

            // Delete the route
            await route.destroy();

            return res.status(200).json({ success: true, message: 'Route deleted successfully' });
        } catch (error) {
            console.error('Error deleting route:', error.message);
            return res.status(500).json({ success: false, error: error.message });
        }
    },
};

