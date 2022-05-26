// Dependencies
const express = require('express');
const Product = require('../models/product');
const cartRouter = express.Router();

// Cart Routes
cartRouter.get('/', (req, res) => {
	res.render('cart.ejs')
})

cartRouter.post('/', (req, res) => {
	const productId = req.body.productId;
	Product.findByIdAndUpdate(
		productId,
		{ $inc: { qty: -1 } },
		{
			new: true,  //allows us to receive a new version of the document
		},
		(error, updatedProduct) => {
			console.error(error);
			res.redirect(`/products/${productId}`) //shows you how to redirect to where you are working.
		}
	)
});

module.exports = cartRouter;