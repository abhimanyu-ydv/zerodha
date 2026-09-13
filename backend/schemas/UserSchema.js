const { Schema } = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new Schema({
  funds: {
    type: Number,
    default: 0,
    min: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Adds username, hash and salt fields, plus register() and authenticate()
UserSchema.plugin(passportLocalMongoose);

module.exports = { UserSchema };
