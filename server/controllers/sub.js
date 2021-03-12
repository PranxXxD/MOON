const Sub = require("../models/sub");
const slugify = require("slugify");

exports.create = async (req, res) => {
  try {
    const { name } = req.body;
    res.json(await new Sub({ name, slug: slugify(name) }).save());
  } catch (err) {
    console.log(err);
    res.status(400).send("Create sub failed");
  }
};

exports.list = async (req, res) => {
  res.json(await Sub.find({}).sort({ createdAt: -1 }).exec()); //method type 1
};

exports.read = async (req, res) => {
  let sub = await Sub.findOne({ slug: req.params.slug }).exec(); // we can also give that
  res.json(sub);
};

exports.update = async (req, res) => {
  const { name } = req.body;
  try {
    let updated = await Sub.findOneAndUpdate(
      { slug: req.params.slug },
      { name, slug: slugify(name) },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(404).send(" Sub Category update error");
    console.log(err);
  }
};

exports.remove = async (req, res) => {
  try {
    const deleted = await Sub.findOneAndDelete({ slug: req.params.slug });
    res.json(deleted);
  } catch (err) {
    res.status(404).send(" Sub Category delete error");
    console.log(err);
  }
};
