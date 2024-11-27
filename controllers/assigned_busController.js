const Bus = require('../models/Bus');
const Route = require('../models/Route');
const AssignedBus = require('../models/Assigned_Bus'); // Model for assigned_bus table

module.exports = {
    // Get all assigned buses or filter by a specific route_id
    assignedBuses: async (req, res) => {
        try {
            const route_id = req.params.id; // Optional route_id from request parameters

            // Define condition based on whether route_id is provided
            const condition = route_id ? { route_id } : {};

            // Fetch routes with their assigned buses
            const assignments = await AssignedBus.findAll({
                where: condition,
                include: [
                    { model: Route, attributes: ['id', 'start_location', 'end_location', 'arrival_time', 'departure_time'] }, // Include route details
                    { model: Bus, attributes: ['id', 'capacity'] }, // Include bus details
                ],
            });

            if (assignments.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: route_id
                        ? `No assigned bus found for route ID ${route_id}`
                        : 'No assigned buses found',
                });
            }

            return res.status(200).json({
                success: true,
                assignedBuses: assignments,
            });
        } catch (error) {
            console.error('Error fetching assigned buses:', error.message);
            return res.status(500).json({
                success: false,
                error: error.message,
            });
        }
    },

    // Get the assigned bus for a specific route by route_id
    getSpecificAssignedBus: async (req, res) => {
        try {
            const route_id = req.params.id; // Route ID from request parameters

            // Fetch the assigned bus for the given route
            const assignment = await AssignedBus.findOne({
                where: { route_id },
                include: [
                    { model: Route, attributes: ['id', 'start_location', 'end_location', 'arrival_time', 'departure_time'] }, // Include route details
                    { model: Bus, attributes: ['id', 'capacity'] }, // Include bus details
                ],
            });

            if (!assignment) {
                return res.status(404).json({
                    success: false,
                    message: `No assigned bus found for route ID ${route_id}`,
                });
            }

            return res.status(200).json({
                success: true,
                assignedBus: assignment,
            });
        } catch (error) {
            console.error(`Error fetching assigned bus for route ID ${req.params.id}:`, error.message);
            return res.status(500).json({
                success: false,
                error: error.message,
            });
        }
    },

    // Assign a bus to a route
    create: async (req, res) => {
        try {
            const { bus_id, route_id } = req.body; // Get bus_id and route_id from request body

            // Validate the bus ID
            const bus = await Bus.findOne({ where: { id: bus_id } });
            if (!bus) {
                return res.status(404).json({
                    success: false,
                    message: 'Bus not found',
                });
            }

            // Validate the route ID
            const route = await Route.findOne({ where: { id: route_id } });
            if (!route) {
                return res.status(404).json({
                    success: false,
                    message: 'Route not found',
                });
            }

            // Check if the bus is already assigned to the route
            const existingAssignment = await AssignedBus.findOne({
                where: { bus_id, route_id },
            });
            if (existingAssignment) {
                return res.status(400).json({
                    success: false,
                    message: 'This bus is already assigned to the route.',
                });
            }

            // Create the assignment
            const newAssignment = await AssignedBus.create({ bus_id, route_id });

            return res.status(201).json({
                success: true,
                message: 'Bus assigned to route successfully',
                assignedBus: newAssignment,
            });
        } catch (error) {
            console.error('Error assigning bus to route:', error.message);
            return res.status(500).json({
                success: false,
                error: error.message,
            });
        }
    },


    // Assign or reassign a bus to a route
    updateRouteBus: async (req, res) => {
        try {
            const route_id = req.params.id; // Route ID from request parameters
            const { bus_id } = req.body; // New bus ID from the request body

            // Validate the bus ID
            const bus = await Bus.findOne({ where: { id: bus_id } });
            if (!bus) {
                return res.status(404).json({
                    success: false,
                    message: 'Bus not found',
                });
            }

            // Validate the route ID
            const route = await Route.findOne({ where: { id: route_id } });
            if (!route) {
                return res.status(404).json({
                    success: false,
                    message: 'Route not found',
                });
            }

            // Check if there is an existing assignment for the route
            let assignment = await AssignedBus.findOne({ where: { route_id } });
            if (assignment) {
                // Update the bus for the existing assignment
                assignment.bus_id = bus_id;
                await assignment.save();
            } else {
                // Create a new assignment if none exists
                assignment = await AssignedBus.create({ route_id, bus_id });
            }

            return res.status(200).json({
                success: true,
                message: 'Bus reassigned to the route successfully',
                assignedBus: assignment,
            });
        } catch (error) {
            console.error('Error updating route bus:', error.message);
            return res.status(500).json({
                success: false,
                error: error.message,
            });
        }
    },
};
