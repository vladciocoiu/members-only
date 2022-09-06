const UserModel = require('../models/userModel');

require('dotenv').config()

exports.joinGet = (req, res) => {

    // prevent unauthorized requests
    if (!req.user || req.user['is_member']) return res.status(401).redirect('/');

    // render form
    res.render('joinForm', { invalidPasscode: false });
}

exports.joinPost = (req, res, next) => {

    // prevent unauthorized requests
    if (!req.user || req.user['is_member']) {
        res.status(401).redirect('/');
        return
    }

    // check passcode and refresh page if wrong
    if (req.body.passcode !== process.env.SECRET_MEMBER_PASSCODE) {
        return res.status(401).render('joinForm', { invalidPasscode: true });
    }

    // update user
    UserModel.updateOne(req.user, { is_member: true }, (err, user) => {
        if (err) return next(err);
        else res.redirect('/');
    })
}