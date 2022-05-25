// DEPENDENCIES
const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/products');
const methodOverride = require('method-override');
// Database Connections
mongoose.connect(process.env.DATABASE_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});


// MIDDLEWARE
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
// connect CSS
app.use(express.static('public'));

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
// Delete
app.delete('/products/:id', (req, res) => {
	Product.findByIdAndRemove(req.params.id, (err, data) => {
		res.redirect('/products')
	});
});


// U
app.put("/products/:id", (req, res) => {
	Product.findByIdAndUpdate(
		req.params.id,
		req.body, 
		{
			new: true,  //allows us to receive a new version of the document
		},
		(error, updateProduct) => {
			res.redirect(`/products/${req.params.id}`) //shows you how to redirect to where you are working.
		}
		)
	});
	
	// Create
	app.post('/products', (req, res) => {
		Product.create(req.body, (error, createdProduct) => {
			res.redirect('/products');
		});
	});
	
	// E
	app.get('/products/:id/edit', (req, res) => {
		Product.findById(req.params.id, (error, foundProduct) => {
			res.render('edit.ejs', {
				product: foundProduct,
			});
		});
	});
	
	// Show
	app.get('/products/:id', (req, res) => {
		Product.findById(req.params.id, (err, foundProduct) => {
			res.render('show.ejs', {
				product: foundProduct,
			});
		});
	});
	
	// DB CONNECTIONS Error/Success
	// Define callback functions for various events
	const db = mongoose.connection
	db.on('error', (err) => console.log(err.message + ' is mongo not running?'));
	db.on('connected', () => console.log('mongo connected'));
	db.on('disconnected', () => console.log('mongo disconnected'));
	
	// Listeners
	const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`server is listening on port: ${PORT}`));

