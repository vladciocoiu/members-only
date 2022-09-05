const bcrypt = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const UserModel = require('../models/userModel');

exports.registerGet = (req, res) => res.render('registerForm');

exports.registerPost = (req, res, next) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) return next(err);
        const user = new UserModel({
            email: req.body.email,
            password: hash,
            first_name: req.body['first-name'],
            last_name: req.body['last-name']
        }).save(err => {
            if(err) return next(err);
        })
    });
    res.redirect('/');
};

exports.loginGet = (req, res) => res.render('loginForm', { errors: req.flash().error || [] })

exports.loginPost = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/log-in',
    failureFlash: true,
});

exports.logout = (req, res, next) => {
    req.logout(err => {
        if (err) return next(err);
        res.redirect('/');
    })
}