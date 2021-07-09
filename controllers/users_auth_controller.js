const User = require("../models/users");
const fs = require("fs");
const multer = require('multer');
const path = require("path");
const { localsName } = require("ejs");

//rendering the SignUp Page
module.exports.Signup = function (req, res) {

    if (req.cookies.user_id) {
        return res.redirect(
            '/'
        );
    }

    return res.render('sign-up', {
        title: 'Sign_up'
    });
    
};

//rendering the SignUp Page
module.exports.Signin = function (req, res) {

    if (req.cookies.user_id) {
        return res.redirect(
            '/'
        );
    }

    return res.render('sign-in', {
        title: 'User | Sign_in'
    });
};


module.exports.create =async function (req, res, next){
    try {
        let user = await User.findOne({ email: req.body.email });

        if (req.body.password != req.body.confirm_password) {
            console.log('Password is not matched');
            
            return res.redirect('back');
        }

        if (!user) {

            const users = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                    image:req.file.filename
            });
        
            users.save(function(err, user){
                if(err){
                    console.log('Error to save the users data in the database', err);
                    return;
                }
        
                return res.redirect('/users/sign-in');
            });

        } else {
            
            return res.redirect('back');
        }

}catch (err) {
    console.log('Error to SignUp', err);
    return;
}
}

//user sign-in with create session
module.exports.createSession = function(req, res){
    
    //steps to authenticate
    User.findOne({email: req.body.email}, function(err, user){
        if(err){
            console.log('Error to signin ', err);
            return;
        }

        if(user){

            //check password
            if(user.password != req.body.password){
                console.log('Invalid Email/Password');
                return res.redirect('back');
            }

            //handle session creation
            res.cookie('user_id', user.id);
            return res.redirect('/');
        }else{
            return res.redirect('back');
        }
    })
}

//user sign out
//User sign-out 
module.exports.destroySession = function (req, res) {
    
    res.clearCookie('user_id');
    return res.redirect('/users/sign-in');
}


//User Profile
module.exports.profile = function(req, res){

    if (!(req.cookies.user_id)) {
        return res.redirect(
            '/users/sign-in'
        );
    }

    if(req.cookies.user_id){
        User.findById(req.cookies.user_id, function(err, user){

            if(user){
                return res.render('profile', {
                    title: 'User | Profile',
                    user: user
                })
            }else{
                return res.redirect(
                    '/users/sign-in'
                )
            }
        })
    }else{
        return res.redirect(
            '/users/sign-in'
        )
    }
}