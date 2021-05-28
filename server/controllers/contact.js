const Contact = require("../models/contact");

// create, remove, list
exports.create = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body.contact;
    res.json(await new Contact({ name, email, phone, message }).save());
  } catch (err) {
    console.log(err);
  }
};
