const Booking = require('../models/Booking');
const Bus = require('../models/Bus');
const Payment = require('../models/Payment');
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
            return res.status(200).json({ success: true, bookings: bookings});
        } catch (error) {
            console.error(error.message);
            return res.status(500).json({ success: false, error: error.message });
        }
    },

    createBooking: async (req, res) => {
        try {
            const { seat_no, user_id, bus_id } = req.body;
            
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
            const booking = await Booking.create({ seat_no, user_id, bus_id });
            bus.capacity -= 1;
            await bus.save()

            // const payment = await Payment.create({
            //     booking_id : booking.id,
            //     ,
            // })


            return res.status(201).json({ success: true, booking: booking });
        } catch (error) {
            console.error(error.message);
            return res.status(500).json({ success: false, error: error.message });
        }
    },

    // Update a booking
    update: async (req, res) => {
        try {
            const booking_id = req.params.id;
            const data = req.body;

            const updatedBooking = await Booking.update(data, { where: { id: booking_id } });

            if (updatedBooking[0] === 0) {
                return res.status(404).json({ success: false, message: 'Booking not found' });
            }

            return res.status(200).json({ success: true, message: 'Booking updated successfully' });
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({ success: false, error: error.message });
        }
    },

    // Delete a booking
    delete: async (req, res) => {
        try {
            const booking_id = req.params.id;

            const deleted = await Booking.destroy({ where: { id: booking_id } });

            if (!deleted) {
                return res.status(404).json({ success: false, message: 'Booking not found' });
            }

            return res.status(200).json({ success: true, message: 'Booking deleted successfully' });
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({ success: false, error: error.message });
        }
    }
};
