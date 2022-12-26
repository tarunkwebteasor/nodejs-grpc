const bcrypt = require("bcryptjs");
const mongoose = require('mongoose');
const Users = require("./model/user.model");
mongoose.set('strictQuery', false);
mongoose.connect(process.env.DB);

exports.createUser = function createUser(call, cb) {
  const { name, email, password } = call.request.user;

  bcrypt.genSalt(parseInt(process.env.SALT), (err, salt) => {
    if (err) {
      return cb(err, null);
    }
    bcrypt.hash(password, salt, (err, hash) => {
      if (err) {
        console.log(err);
        return cb(err, null);
      }
      const users = new Users({
        name: name.trim()[0].toUpperCase() + name.slice(1).toLowerCase(),
        email: email,
        password: hash
      });

      // save data
      users.save().then(() => {
        const response = {
          id: 1,
        };
        return cb(null, response);
      }).catch((err) => console.log(err));
    });
  });
};

exports.getUser = function getUser(_, cb) {
  Users.find()
  .then((user) => {cb(null, {"user": user})})
  .catch((err) => {cb(err, null)});
};


