const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cors = require("cors");
const bodyParser = require('body-parser'); // To parse JSON data
const path = require('path');

const app = express();
const PORT = 3000;
const SECRET_KEY = 'your_secret_key'; // Change this to a secure random key

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Serve static files (HTML, CSS, JS) from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// Dummy user credentials (Normally, this would be in a database)
const users = [
    { email: 'user@example.com', password: 'password123', name: 'John Doe' },
    { email: 'admin@example.com', password: 'adminpass', name: 'Admin User' }
];

// Login Route (POST)
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Check if user exists in the database (dummy check)
    const user = users.find(u => u.email === email);
    
    if (!user) {
        return res.status(401).json({ message: 'User not found. Please check your email.' });
    }

    // Check if the password matches
    if (user.password !== password) {
        return res.status(401).json({ message: 'Incorrect password. Please try again.' });
    }

    // Create a JWT token (valid for 1 hour)
    const token = jwt.sign({ email: user.email, name: user.name }, SECRET_KEY, { expiresIn: '1h' });

    res.json({ token }); // Send token to frontend
});

// Protected Dashboard Route (GET)
app.get('/dashboard', (req, res) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Extract token from request header

    if (!token) {
        return res.status(403).json({ message: 'Token required' });
    }

    // Verify the token
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid or expired token' });
        }
        res.json({ message: `Welcome, ${decoded.name}!` });
    });
});

// Start the Server
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));