const User = require('../models/User');

module.exports = {
    // Get a specific user by ID
    getAll: async (req, res) => {
        try {
            const user_id = req.params.id;
            const user = await User.findOne({ where: { id: user_id } });

            if (!user) {
                return res.status(404).json({ success: false, message: 'User not found' });
            }

            return res.status(200).json({ success: true, user: user });
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({ success: false, error: error.message });
        }
    },

    // Get all users
    getAllUsers: async (req, res) => {
        try {
            const users = await User.findAll();
            return res.status(200).json({ success: true, users: users});
        } catch (error) {
            console.error(error.message);
            return res.status(500).json({ success: false, error: error.message });
        }
    },

    // Create a new user
    create: async (req, res) => {
        try {
            const data = req.body; // Get user details from the request body
            const newUser = await User.create(data); // Create a new user in the database

            return res.status(201).json({ success: true, user: newUser });
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({ success: false, error: error.message });
        }
    },

    // Update an existing user
    update: async (req, res) => {
        try {
            const user_id = req.params.id;
            const data = req.body; // Get the updated user details from the request body

            const updatedUser = await User.update(data, { where: { id: user_id } });

            if (updatedUser[0] === 0) {
                return res.status(404).json({ success: false, message: 'User not found or no changes made' });
            }

            return res.status(200).json({ success: true, message: 'User updated successfully' });
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({ success: false, error: error.message });
        }
    },

    // Delete a user
    delete: async (req, res) => {
        try {
            const user_id = req.params.id;

            const deleted = await User.destroy({ where: { id: user_id } });

            if (!deleted) {
                return res.status(404).json({ success: false, message: 'User not found' });
            }

            return res.status(200).json({ success: true, message: 'User deleted successfully' });
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({ success: false, error: error.message });
        }
    }
};
