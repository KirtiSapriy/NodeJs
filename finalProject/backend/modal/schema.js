const mongoose = require('mongoose')

const Schema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true

    },
    password: {
        type: String,
        required: true

    },
    phone: {
        type: String,
        required: true

    },
    roal: {
        type: String,
        required: true
    },
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    managerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    isActive: {
        type: Boolean,
        default: true
    }
})

const UserSchema = mongoose.model("Users", Schema)

module.exports = UserSchema