//Loading the library of express
const express = require('express');
//assigning port 
const port = 8000;
const app = express();
//calling the database
const db = require('./config/mongoose');
const expressLayout = require('express-ejs-layouts');
const path = require('path');
const cookieParser = require('cookie-parser');

//URL encoded to the req post 
app.use(express.urlencoded());
//using the method of cookieparser
app.use(cookieParser());
//assets
app.use(express.static("./assets"));
//Calling the path of uploads
app.use('/uploads', express.static(__dirname + '/uploads'));

//views rendering
app.use(expressLayout);
app.set('view engine', 'ejs');
app.set('views', './views');


//router defined
app.use('/', require('./routes'));

app.listen(port, function (err) {
    if (err) {
        console.log(`Error is genrated on the port side: ${err}`);
        return;
    }
    console.log(`Server is running on Port: ${port}`);
})
