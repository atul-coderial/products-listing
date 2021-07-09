//Loading the library of mongoose
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({

    product_name: {
        type: String
    },
    product_type: {
        type: String
    },
    product_size: {
        type: String
    },
    product_qty: {
        type: String
    },
    product_color: {
        type: String
    },
    images: [Object]
}, {
    timestamps: true
});


const Product = mongoose.model('Product', productSchema);

module.exports = Product;