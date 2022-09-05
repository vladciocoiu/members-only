const bcrypt = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const UserModel = require('../models/userModel');

const { check, validationResult } = require('express-validator')

exports.registerGet = (req, res) => res.render('registerForm', { errors: null });

// validate and sanitize form fields using express-validator
exports.registerValidation = [
    // validate name
    check('first-name', 'First name cannot be empty.')
        .trim()
        .isLength({ min: 1 })
        .bail(),

    check('last-name', 'Last name cannot be empty.')
        .trim()
        .isLength({ min: 1 })
        .bail(),

    // validate password
    check('password', 'Password must be at least 8 characters long, without any whitespaces.')
        .trim()
        .isLength({ min: 8 })
        .bail(),

    // validate confirm-password
    check('confirm-password', 'Passwords do not match.')
        .trim()
        .custom((value, { req }) => value === req.body.password)
];

exports.registerPost = async (req, res, next) => {

    // handle validation errors
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).render('registerForm', { errors: errors.array() });

    // error if user already exists
    const registeredUser = await UserModel.find({ email: req.body.email });
    if(registeredUser.length) return res.status(400).render('registerForm', { errors: [{ msg: 'User already exists.' }]})

    // store user in database
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