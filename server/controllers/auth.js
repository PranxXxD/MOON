const User = require("../models/user");

exports.createOrUpdateUser = async (req, res) => {
  const { phone_number } = req.user;
  const { fname, lname, email, password } = req.body.details;

  const user = await User.findOne({ phone_number: phone_number }).exec();

  if (user) {
    res.json(user);
    console.log("USER UPDATED", user);
  } else {
    const newUser = await new User({
      phone_number,
      fname,
      lname,
      email,
      password,
    }).save();
    res.json(newUser);
    console.log("USER CREATED", newUser);
  }
};

exports.currentUser = async (req, res) => {
  User.findOne({ email: req.user.email }).exec((err, user) => {
    if (err) throw new Error(err);
    res.json(user);
  });
};
