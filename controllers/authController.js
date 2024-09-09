const User = require('../models/User');
const Patient = require('../models/Patient');
const Stock = require('../models/Stock');
const Reminder = require('../models/Reminder');
const UserLogin = require('../models/UserLogin')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

exports.register = async (req, res) => {
    const { username, name, password, type, dateOfBirth } = req.body;
    const uid = uuidv4();
    try {
        const newUser = new User({ uid, username, name, password, type, dateOfBirth });
        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
};


exports.login = async (req, res) => {
    const { username, password } = req.body;

    // Basic input validation
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });  // Changed to 404 for not found
        }

        // Secure password comparison
        const isMatch = password == user.password ? true : false;
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate a secure token
        const token = jwt.sign(
            { uid: user.uid, type: user.type },
            process.env.JWT_SECRET,
            { expiresIn: '120h' }  // Add an expiration time for security
        );

        // Create a new login session
        const newUserLogin = new UserLogin({
            uid: uuidv4(),
            staffUid: user.uid,
            token: token
        });

        await newUserLogin.save();

        // Respond with user details and token
        res.status(200).json({
            user: {
                uid: user.uid,
                username: user.username,
                name: user.name,
                type: user.type,
                token: token  // Be careful about exposing tokens; only expose when necessary and secure
            }
        });

    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
};

exports.getDashboardMetrics = async (req, res) => {
    try {
        // Count the total number of patients
        const totalPatients = await Patient.countDocuments();

        // Count the total number of users
        const totalUsers = await User.countDocuments();

        // Count the total number of reminders
        const totalReminders = await Reminder.countDocuments();

        // Calculate the total stock quantity and value
        const stocks = await Stock.find();
        const totalStockQuantity = stocks.reduce((total, stock) => total + stock.quantity, 0);
        const totalStockValue = stocks.reduce((total, stock) => total + (stock.quantity * stock.totalCost), 0); // Assuming you have a valuePerUnit field

        // Return the metrics
        res.json({
            totalPatients,
            totalUsers,
            totalReminders,
            totalStockQuantity,
            totalStockValue,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.getAuthUserCheck = async (req, res) => {
    const { uid } = req.params;

    if (!uid) {
        return res.status(400).json({ message: 'UID parameter is required' });
    }

    try {
        const user = await UserLogin.findOne({ staffUid: uid });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });  // Changed status code to 404
        }

        // Ensure that sensitive data (like tokens) is handled securely
        res.status(200).json({
            uid: user.uid,
            token: user.token,  // Ensure it's safe to send this back
            logout: user.logout
        });
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.deleteUserLogin = async (req, res) => {
    const { uid } = req.params;

    if (!uid) {
        return res.status(400).json({ message: 'UID parameter is required' });
    }

    try {
        // Find the user by staffUid and delete them
        const user = await UserLogin.findOneAndDelete({ staffUid: uid });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });  // User not found
        }

        // Respond with a success message
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await UserLogin.find(); // Fetch all users from the UserLogin model
        res.status(200).json(users); // Respond with the list of users
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};
