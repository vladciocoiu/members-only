const UserModel = require('../models/userModel');

exports.joinGet = (req, res) => {
    if (!req.user || req.user['is_member']) return res.redirect('/');
    res.render('joinForm');
}

exports.joinPost = (req, res, next) => {
    UserModel.updateOne(req.user, { is_member: true }, (err, user) => {
        if (err) return next(err);
        else res.redirect('/');
    })
}