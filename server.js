// DEPENDENCIES
const express = require('express');
const app = express();
require('dotenv').config();

const mongoose = require('mongoose');
// Database Connections
mongoose.connect(process.env.DATABASE_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

// Database Connection Error/Success
// Define callback functions for various events
const db = mongoose.connection
db.on('error', (err) => console.log(err.message + ' is mongo not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));
// MIDDLEWARE
app.use(express.urlencoded({ extended: true }));

// ROUTES
// I
// N
// D
// U
// Create
app.post('/store', (req, res) => {
    res.send(req.body);
})
// E
// S

// Listeners
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`server is listening on port: ${PORT}`));

