
// Dependencies
const express = require('express');
const Product = require('../models/product');
const productRouter = express.Router();

// Product Routes
// ROUTES
// Seed (delete later)
const productSeed = require('../models/productSeed');

productRouter.get('/seed', (req, res) => {
	Product.deleteMany({}, (error, allProducts) => { });

	Product.create(productSeed, (error, data) => {
		res.redirect('/products');
	})
});
// Index
productRouter.get('/', (req, res) => {
	Product.find({}, (error, allProducts) => {
		res.render('index.ejs', {
			products: allProducts,
		});
	})
});


// New
productRouter.get('/new', (req, res) => {
	res.render('new.ejs');
})

// Delete
productRouter.delete('/:id', (req, res) => {
	Product.findByIdAndRemove(req.params.id, (err, data) => {
		res.redirect('/products')
	});
});

// Update
productRouter.put("/:id", (req, res) => {
	Product.findByIdAndUpdate(
		req.params.id,
		req.body,
		{
			new: true,  //allows us to receive a new version of the document
		},
		(error, updatedProduct) => {
			res.redirect(`/products/${req.params.id}`) //shows you how to redirect to where you are working.
		}
	)
});

// Create
productRouter.post('/', (req, res) => {
	Product.create(req.body, (error, createdProduct) => {
		res.redirect('/products');
	});
});

// Edit
productRouter.get('/:id/edit', (req, res) => {
	Product.findById(req.params.id, (error, foundProduct) => {
		res.render('edit.ejs', {
			product: foundProduct,
		});
	});
});

// Show
productRouter.get('/:id', (req, res) => {
	Product.findById(req.params.id, (err, foundProduct) => {
		res.render('show.ejs', {
			product: foundProduct,
		});
	});
});

module.exports = productRouter;