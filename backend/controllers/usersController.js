const bcrypt = require('bcryptjs');
const User = require("../models/User");
const jwt = require('jsonwebtoken'); // Import JWT library
const Message = require('../models/Message');
const SECRET_KEY = 'your_secret_key';

const usersController = {
    getUsers: async (req, res) => { // Adding request and response parameters
        try {
            const users = await User.find({});
            console.log(users)
            res.json(users); // Send the users as JSON response
        } catch (error) {
            res.status(500).json({ error: 'Failed to retrieve users' });
        }
    },

    createUser: async (req, res) => {
        const { name, email, age, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        try {
            const existingUser = await User.findOne({ email })
            if (existingUser) {
                return res.status(409).json({ message: "Email already in use" });
            }

            const newUser = new User({ name, email, age, password: hashedPassword })
            await newUser.save();
            res.status(201).json({ message: 'User created successfully' });
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    },
    getUserByEmail: async (req, res) => {
        const email = req.params.email;
        try {
            const user = await User.findOne({ email: email });
            if (!user) {
                return res.status(404).json({ errors: [{ msg: "User not found" }] });
            }
            return res.status(200).json({user})
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    },

    getUserAccount: async (req, res) => {
        try {
            const { email, password } = req.body;

            // Find the user by email
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(404).json({ errors: [{ msg: "User not found" }] });
            }

            // Compare the provided password with the stored hashed password
            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                return res.status(405).json({ errors: [{ msg: "Incorrect Password" }] });
            }

            // If passwords match, generate a JWT token
            const token = jwt.sign(
                { userId: user._id, email: user.email }, // Payload with user data
                SECRET_KEY, // Secret key for signing the token
                { expiresIn: '1h' } // Optional: Set expiration time (e.g., 1 hour)
            );

            // Send the JWT token in the response
            return res.status(200).json({
                message: "Login successful",
                token: token, // Send the token to the client
                user: {
                    id: user._id,
                    email: user.email
                }
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ errors: [{ msg: "Something went wrong" }] });
        }
    },
    postMessage: async (req, res) => {
        const { title, body, user, time } = req.body;
        try {
            const newMessage = new Message({ title, body, user, time })
            await newMessage.save();
            res.status(201).json({ message: 'Post created successfully' });
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    },
    getAllPosts: async (req, res) => {
        try {
            const posts = await Message.find().populate('user', 'name'); ;
            res.json(posts); // Send the users as JSON response
        } catch (error) {
            res.status(500).json({ error: 'Failed to retrieve posts' });
        }
    }
};

module.exports = usersController;