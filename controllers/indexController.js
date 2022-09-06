const UserModel = require('../models/userModel');
const MessageModel = require('../models/messageModel');

exports.index = async(req, res, next) => {

    // fetch messsages from db
    const messages = await MessageModel.find({}).sort([['timestamp', -1]]).lean();
    for (let msg of messages) {
        const author = await UserModel.findById(msg.author).lean();
        msg.author = author;
    }

    // render view
    return res.render('index', { title: 'My App', user: req.user, messages: messages });
}