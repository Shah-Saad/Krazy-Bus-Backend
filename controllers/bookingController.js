const Booking = require('../models/Booking');
const Bus = require('../models/Bus');
const User = require('../models/User');

module.exports = {
    // Get a specific booking by ID
    getAll: async (req, res) => {
        try {
            const booking_id = req.params.id;
            const booking = await Booking.findOne({ where: { id: booking_id } });

            return res.status(200).json({ success: true, booking: booking });
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({ success: false, error: error.message });
        }
    },

    // Get all bookings
    getAllBookings: async (req, res) => {
        try {
            const bookings = await Booking.findAll();
            return res.status(200).json({ success: true, bookings: bookings });
        } catch (error) {
            console.error(error.message);
            return res.status(500).json({ success: false, error: error.message });
        }
    },

    createBooking: async (req, res) => {
        try {
            const { user_id, bus_id } = req.body;
            
            // Ensure the user exists
            const user = await User.findOne({ where: { id: user_id } });
            if (!user) {
                return res.status(404).json({ success: false, message: 'User not found' });
            }

            // Ensure the bus exists
            const bus = await Bus.findOne({ where: { id: bus_id } });
            if (!bus) {
                return res.status(404).json({ success: false, message: 'Bus not found' });
            }

            // Check if the bus capacity is full
            const currentBookings = await Booking.count({ where: { bus_id } });
            if (currentBookings >= bus.capacity) {
                return res.status(400).json({ success: false, message: 'Bus capacity is full' });
            }

            // Create a new booking
            const booking = await Booking.create({ user_id, bus_id });
            bus.capacity -= 1;
            await bus.save();

            return res.status(201).json({ success: true, booking: booking });
        } catch (error) {
            console.error(error.message);
            return res.status(500).json({ success: false, error: error.message });
        }
    },

    // Update a booking (if needed, you can modify other fields like bus_id)
    update: async (req, res) => {
        try {
            const booking_id = req.params.id;
            const { user_id, bus_id } = req.body;

            // Find the booking to update
            const booking = await Booking.findOne({ where: { id: booking_id } });
            if (!booking) {
                return res.status(404).json({ success: false, message: 'Booking not found' });
            }

            // Ensure the new bus exists (if bus_id is provided)
            if (bus_id) {
                const bus = await Bus.findOne({ where: { id: bus_id } });
                if (!bus) {
                    return res.status(404).json({ success: false, message: 'Bus not found' });
                }

                // Check if the bus capacity is full before updating the booking
                const currentBookings = await Booking.count({ where: { bus_id } });
                if (currentBookings >= bus.capacity) {
                    return res.status(400).json({ success: false, message: 'Bus capacity is full' });
                }
            }

            // Update the booking with new data
            const updatedBooking = await booking.update(req.body);

            return res.status(200).json({ success: true, message: 'Booking updated successfully', booking: updatedBooking });
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({ success: false, error: error.message });
        }
    },

    // Delete a booking and update bus capacity
    delete: async (req, res) => {
        try {
            const booking_id = req.params.id;

            const booking = await Booking.findOne({ where: { id: booking_id } });
            if (!booking) {
                return res.status(404).json({ success: false, message: 'Booking not found' });
            }

            const bus = await Bus.findOne({ where: { id: booking.bus_id } });
            if (!bus) {
                return res.status(404).json({ success: false, message: 'Bus not found' });
            }

            // Delete the booking
            const deleted = await Booking.destroy({ where: { id: booking_id } });
            if (!deleted) {
                return res.status(404).json({ success: false, message: 'Booking deletion failed' });
            }

            // Update the bus capacity
            bus.capacity += 1;
            await bus.save();

            return res.status(200).json({ success: true, message: 'Booking deleted successfully' });
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({ success: false, error: error.message });
        }
    }
};
