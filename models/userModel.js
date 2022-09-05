const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserModel = mongoose.model('User', new Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    is_member: { type: Boolean, required: true, default: false }
}));

module.exports = UserModel;