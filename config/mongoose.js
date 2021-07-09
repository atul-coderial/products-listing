//Loading the database library
const mongoose = require('mongoose');
//Connecting to the database

mongoose.connect(`mongodb://localhost/inter_test`);
//check the database is connected or not

const db = mongoose.connection;

//If error is found to connect the database

db.on('error', console.error.bind(console, 'Error is generated to connect the database'));

//If it is successfully connected to the database

db.once('open', function(){
    console.log('Database is succesfully connected')
});

module.exports = db;