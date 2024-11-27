const Route = require('../models/Route');
const Bus = require('../models/Bus');
const Driver = require('../models/Driver');

module.exports = {
    // Get a specific route by ID
    getAll: async (req, res) => {
        try {
            const route_id = req.params.id;
            const route = await Route.findOne({ where: { id: route_id } });

            return res.status(200).json({ success: true, route: route });
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({ success: false, error: error.message });
        }
    },


    // Get all routes
    getAllRoutes: async (req, res) => {
        try {
            // Fetch all routes and include related Bus and Driver information
            const routes = await Route.findAll({
                include: [
                    {
                        model : Bus,
                            include:[
                                {
                                    model : Driver
                                }
                            ]
                    },
                ],
            });

            return res.status(200).json({ success: true, routes: routes });
        } catch (error) {
            console.error(error.message);
            return res.status(500).json({ success: false, error: error.message });
        }
    },

    // Create a new route and assign it to a specific bus
    create: async (req, res) => {
        try {
            const { start_location, end_location, stops, departure_time, arrival_time, bus_id } = req.body;

            // Check if the bus exists
            const bus = await Bus.findByPk(bus_id);
            if (!bus) {
                return res.status(404).json({ success: false, message: 'Bus not found' });
            }

            //check if route is assigned to another Bus
            const existingAssignment = await Route.findOne({ where: { bus_id } });
            if (existingAssignment) {
                return res.status(400).json({ success: false, message: 'Bus is already assigned to another route' });
            }

            const newRoute = await Route.create({ start_location, end_location, stops, departure_time, arrival_time, bus_id });

            return res.status(201).json({ success: true, route: newRoute });
        } catch (error) {
            console.error(error.message);
            return res.status(500).json({ success: false, error: error.message });
        }
    },

    update: async (req, res) => {
        try {
            const route_id = req.params.id;
            const { start_location, end_location, stops, departure_time, arrival_time } = req.body;
    
            // Find the route by ID to ensure it exists
            const route = await Route.findByPk(route_id);
            if (!route) {
                return res.status(404).json({ success: false, message: 'Route not found' });
            }
    
            // Update the route with the new details
            const updatedRoute = await Route.update(
                { start_location, end_location, stops, departure_time, arrival_time },
                { where: { id: route_id } }
            );
    
            if (updatedRoute[0] === 0) {
                return res.status(400).json({ success: false, message: 'Route update failed' });
            }
    
            return res.status(200).json({ success: true, message: 'Route updated successfully' });
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({ success: false, error: error.message });
        }
    },
    

    delete: async (req, res) => {
        try {
            const route_id = req.params.id;

            const deleted = await Route.destroy({ where: { id: route_id } });

            if (!deleted) {
                return res.status(404).json({ success: false, message: 'Route not found' });
            }

            return res.status(200).json({ success: true, message: 'Route deleted successfully' });
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({ success: false, error: error.message });
        }
    }
};
