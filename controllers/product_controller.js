//import product module
const Product = require('../models/products');

module.exports.product = function(req, res){

    if (!(req.cookies.user_id)) {
        return res.redirect(
            '/users/sign-in'
        );
    }

    if(req.cookies.user_id){
        Product.findOne({user: req.cookies.user_id}, function(err, product){

            //If error to find the product
            if(err){console.log('error to fetch the product detail', err); return;}

            if(product){
                return res.render('products', {
                    title:'list of products',
                    product: product
                })
            }
        });

        
    }
}