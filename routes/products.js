//loading or calling the express
const express = require('express');
//calling the router funtions
const router = express.Router();

//Routing the product controller
const prodList = require('../controllers/product_controller');

router.get('/product-list', prodList.product);


module.exports = router;