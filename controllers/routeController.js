const Route = require('../models/Route');

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
            const routes = await Route.findAll();
            return res.status(200).json({ success: true, routes: routes});
        } catch (error) {
            console.error(error.message);
            return res.status(500).json({ success: false, error: error.message });
        }
    },

    create: async (req, res) => {
        try {
            const data = req.body;
            const newRoute = await Route.create(data);

            return res.status(201).json({ success: true, route: newRoute });
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({ success: false, error: error.message });
        }
    },

    update: async (req, res) => {
        try {
            const route_id = req.params.id;
            const data = req.body;

            const updatedRoute = await Route.update(data, { where: { id: route_id } });

            if (updatedRoute[0] === 0) {
                return res.status(404).json({ success: false, message: 'Route not found' });
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
