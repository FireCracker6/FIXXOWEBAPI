const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const userSchema = mongoose.Schema(
    {
        id:{ type: mongoose.Schema.Types.ObjectId },
        firstName: { type: mongoose.Schema.Types.String, required: true},
        lastName: { type: mongoose.Schema.Types.String, required: true},
        email: { type: mongoose.Schema.Types.String, required: true},
        password: { type: mongoose.Schema.Types.String, required: true}

    }
)

module.exports = mongoose.model("User", userSchema)