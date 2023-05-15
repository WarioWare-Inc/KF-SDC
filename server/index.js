/* eslint-disable no-console */
require('dotenv').config();
const morgan = require('morgan');
const cors = require('cors');
const express = require('express');
const path = require('path');

const app = express();
const controller = require('./controller');

// Serves up all static and generated assets in ../client/dist.
app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// middleware
app.use(morgan('tiny'));
app.use(cors());

// Set up our routes

// product
app.get('/products', controller.product.getProducts);
app.get('/products/:productId', controller.product.getProduct);
app.get('/products/:productId/styles', controller.product.getProductStyle);
app.get('/products/:productId/related', controller.product.getRelated);
// cart
app.get('/cart', controller.cart.getCart);
app.post('/cart', controller.cart.addToCart);
// app.post('/cart', (req, res) => {
//   console.log(req.body);
//   res.status(201).json({
//     sku_id: req.body.sku_id,
//   });
// });
// reviews
/** ******* */
app.get('/reviews', controller.reviews.getReviews);
app.get('/reviews/meta', controller.reviews.getReviewsMeta);

// questions
/** ******** */

//

/* ---------------- Server listens ---------------- */

app.listen(process.env.PORT);
console.log(`Listening at http://localhost:${process.env.PORT}`);
