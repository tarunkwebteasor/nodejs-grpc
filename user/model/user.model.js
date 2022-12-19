const mongoose = require("mongoose");

const UsersSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, default: null },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: null }
}, { versionKey: false })

module.exports = mongoose.model('Users', UsersSchema)