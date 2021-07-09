
const Product = require('../models/products');
const fs = require("fs");
const multer = require('multer');
const path = require("path");

module.exports.home = function (req, res) {

    if (!(req.cookies.user_id)) {

        return res.redirect(
            '/users/sign-in'
        );
    }

    if (req.cookies.user_id) {
        return res.render('home', {
            title: 'Home'
        });
    } else {
        return res.redirect('/users/sign-in');
    }
}

//create the new product info in the database
module.exports.createProduct = async function (req, res, next) {
        
    try{
        //console.log(req.files['photos'].filename);

        let filesArray = [];
        req.files.forEach(element => {
            const file = {
                filename: element.filename
            }
            filesArray.push(file);
        });
        const products = new Product({
            product_name: req.body.product_name,
            product_type: req.body.product_type,
            product_size: req.body.product_size,
            images: filesArray,
            product_qty: req.body.product_qty,
            product_color: req.body.product_color
        });

    products.save(function (err, product) {
            if (err) {
                console.log('Error to save the product data in the database', err);
                return;
            }

            return res.redirect('back');
    });
    }catch(err){
        console.log('Error to create', err);
        return;
    }
}