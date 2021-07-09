//loading or calling the express
const express = require('express');
//calling the router funtions
const router = express.Router();
const Product = require('../models/products');
const fs = require("fs");
const multer = require('multer');
const path = require('path');
//importing homeController in router
const homeController = require('../controllers/home_controller');

const PRODUCT_PATH = path.join('/uploads/products');

router.get('/', homeController.home);

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '..', PRODUCT_PATH));
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});

let productInfo = multer({ storage: storage }).array('photos', 6);

//product routing
router.post('/create-product', productInfo, homeController.createProduct);

//routing user controller
router.use('/users', require('./users'));

//product routing
router.use('/products', require('./products'));

module.exports = router;