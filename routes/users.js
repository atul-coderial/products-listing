//loading or calling the express
const express = require('express');
//calling the router funtions
const router = express.Router();
const User = require('../models/users');
const multer = require('multer');
const path = require('path');
const AVTAR_PATH = path.join('/uploads/profile/avatar');


//Routing the auth controller
const userController = require('../controllers/users_auth_controller');

router.get('/sign-up', userController.Signup);

router.get('/sign-in', userController.Signin);

router.post('/create-session', userController.createSession);

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '..', AVTAR_PATH));
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});

let uploadedAvtar = multer({ storage: storage }).single('avatar');

router.post('/create', uploadedAvtar, userController.create);

router.get('/profile', userController.profile);
    
router.get('/signout', userController.destroySession);

module.exports = router;