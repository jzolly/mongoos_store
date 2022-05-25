// DEPENDENCIES
const express = require('express');
const app = express();
require('dotenv').config();

const mongoose = require('mongoose');
const Product = require('./models/products')
// Database Connections
mongoose.connect(process.env.DATABASE_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

// DB CONNECTIONS Error/Success
// Define callback functions for various events
const db = mongoose.connection
db.on('error', (err) => console.log(err.message + ' is mongo not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));

// MIDDLEWARE
app.use(express.urlencoded({ extended: true }));

// ROUTES
// Seed (delete later)
const productSeed = require('./models/productSeed');

app.get('/products/seed', (req, res) => {
	Product.deleteMany({}, (error, allProducts) => {});

	Product.create(productSeed, (error, data) => {
		res.redirect('/products');
	})
});
// I
app.get('/products', (req, res) => {
	Product.find({}, (error, allProducts) => {
		res.render('index.ejs', {
			products: allProducts,
		});
	})
});

// N
app.get('/products/new', (req, res) => {
	res.render('new.ejs');
})
// D
// U
// Create
app.post('/products', (req, res) => {
    Product.create(req.body, (error, createdProduct) => {
		res.redirect('/products');
	});
});
// E
// Show
app.get('/products/:id', (req, res) => {
	Product.findById(req.params.id, (err, foundProduct) => {
		res.render('show.ejs', {
			product: foundProduct,
		});
	});
});

// Listeners
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`server is listening on port: ${PORT}`));

