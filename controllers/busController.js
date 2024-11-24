const Bus = require('../models/Bus');
const Driver = require('../models/Driver');

module.exports = {
    getAll: async (req, res) => {
        try {
            const bus_id = req.params.id;
            const bus = await Bus.findOne({ where: { id: bus_id } });

            return res.status(200).json({ success: true, bus: bus });
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({ success: false, error: error.message });
        }
    },

    //Assign driver to a specific bus
    assignDriver: async (req, res) => {
        try {
            const { bus_id, driver_id } = req.body;

            // Ensure the driver exists
            const driver = await Driver.findOne({ where: { id: driver_id } });
            if (!driver) return res.status(404).json({ success: false, message: 'Driver not found' });

            // Check if the driver is already assigned to another bus
            const existingAssignment = await Bus.findOne({ where: { driver_id } });
            if (existingAssignment) {
                return res.status(400).json({ success: false, message: 'Driver is already assigned to another bus' });
            }

            // Assign the driver to the bus
            const bus = await Bus.update({ driver_id }, { where: { id: bus_id } });

            if (!bus[0]) return res.status(404).json({ success: false, message: 'Bus not found' });

            return res.status(200).json({ success: true, message: 'Driver assigned successfully' });
        } catch (error) {
            console.error(error.message);
            return res.status(500).json({ success: false, error: error.message });
        }
    },


    // Get all buses
    getAllBuses: async (req, res) => {
        try {
            const buses = await Bus.findAll();
            return res.status(200).json({ success: true, buses: buses});
        } catch (error) {
            console.error(error.message);
            return res.status(500).json({ success: false, error: error.message });
        }
    },

    // create: async (req, res) => {
    //     try {
    //         const data = req.body;
    //         const newBus = await Bus.create(data);

    //         return res.status(201).json({ success: true, bus: newBus });
    //     } catch (error) {
    //         console.log(error.message);
    //         return res.status(500).json({ success: false, error: error.message });
    //     }
    // },

    update: async (req, res) => {
        try {
            const bus_id = req.params.id;
            const data = req.body;

            const updatedBus = await Bus.update(data, { where: { id: bus_id } });

            if (updatedBus[0] === 0) {
                return res.status(404).json({ success: false, message: 'Bus not found' });
            }

            return res.status(200).json({ success: true, message: 'Bus updated successfully' });
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({ success: false, error: error.message });
        }
    },

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
    }
};
