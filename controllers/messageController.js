const UserModel = require('../models/userModel');
const MessageModel = require('../models/messageModel');

exports.get = (req, res) => {

    // redirect to index page if not authorized
    if (!res.locals.currentUser) {
        res.status(401).redirect('/');
        return;
    }

    // render form
    return res.render('messageForm');
}

exports.post = (req, res, next) => {
    // redirect to index page if not authorized
    if (!res.locals.currentUser) {
        res.status(401).redirect('/');
        return;
    }

    // store message in database
    const message = new MessageModel({
        title: req.body.title,
        text: req.body.text,
        author: res.locals.currentUser
    }).save(err => {
        if(err) return next(err);
    })

    res.redirect('/');
}