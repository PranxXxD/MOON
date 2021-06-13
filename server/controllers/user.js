const User = require("../models/user");
const Product = require("../models/product");
const Cart = require("../models/cart");
const Coupon = require("../models/coupon");
const Order = require("../models/order");

exports.userCart = async (req, res) => {
  // console.log(req.body); // {cart: []}
  const { cart, wrap } = req.body;

  let products = [];

  const user = await User.findOne({
    phone_number: req.user.phone_number,
  }).exec();

  // check if cart with logged in user id already exist
  let cartExistByThisUser = await Cart.findOne({ orderedBy: user._id }).exec();

  if (cartExistByThisUser) {
    cartExistByThisUser.remove();
    console.log("removed old cart");
  }

  for (let i = 0; i < cart.length; i++) {
    let object = {};

    object.product = cart[i]._id;
    object.count = cart[i].count;
    object.color = cart[i].color;
    object.wrapping = cart[i].wrapping;
    // get price for creating total
    let productFromDb = await Product.findById(cart[i]._id)
      .select("price")
      .exec();
    object.price = productFromDb.price;
    let imageFromDb = await Product.findById(cart[i]._id)
      .select("images")
      .exec();
    object.images = imageFromDb.images;

    products.push(object);
  }

  let cartTotal = 0;
  let total = 0;
  let shipping = 0;

  for (let i = 0; i < cart.length; i++) {
    shipping = shipping + cart[i].weight * cart[i].count;
  }

  const getShipping = () => {
    if (shipping == 0) {
      return 0;
    } else if (shipping > 0 && shipping <= 500) {
      return 69;
    } else if (shipping > 500 && shipping <= 1000) {
      return 99;
    } else if (shipping > 1000 && shipping <= 1500) {
      return 149;
    } else if (shipping > 1500 && shipping <= 2000) {
      return 169;
    } else {
      return 199;
    }
  };

  for (let i = 0; i < products.length; i++) {
    total = total + products[i].price * cart[i].count;
  }

  if (wrap) {
    cartTotal = total + getShipping() + 30;
  } else {
    cartTotal = total + getShipping();
  }

  let newCart = await new Cart({
    products,
    wrap,
    cartTotal,
    orderedBy: user._id,
  }).save();

  console.log("new cart ----> ", newCart);
  res.json({ ok: true });
};

exports.getUserCart = async (req, res) => {
  const user = await User.findOne({
    phone_number: req.user.phone_number,
  }).exec();

  let cart = await Cart.findOne({ orderedBy: user._id })
    .populate("products.product", "_id title price totalAfterDiscount")
    .exec();

  const { products, cartTotal, wrap, totalAfterDiscount } = cart;
  res.json({ products, cartTotal, wrap, totalAfterDiscount });
};

exports.emptyCart = async (req, res) => {
  console.log("empty cart");
  const user = await User.findOne({
    phone_number: req.user.phone_number,
  }).exec();

  const cart = await Cart.findOneAndRemove({ orderedBy: user._id }).exec();
  res.json(cart);
};

exports.saveAddress = async (req, res) => {
  const { address, phone, city, state, country, pinCode } = req.body.address;

  const userAddress = await User.findOneAndUpdate(
    { phone_number: req.user.phone_number },
    { address, phone, city, state, country, pinCode }
  ).exec();

  console.log("user address ----> ", userAddress);
  res.json({ ok: true });
};

exports.applyCouponToUserCart = async (req, res) => {
  const { coupon } = req.body;
  console.log("COUPON", coupon);

  const validCoupon = await Coupon.findOne({ name: coupon }).exec();
  if (validCoupon === null) {
    return res.json({
      err: "Invalid coupon",
    });
  }
  console.log("VALID COUPON", validCoupon);

  const user = await User.findOne({
    phone_number: req.user.phone_number,
  }).exec();

  let { products, cartTotal } = await Cart.findOne({
    orderedBy: user._id,
  })
    .populate("products.product", "_id title price")
    .exec();

  console.log("cartTotal", cartTotal, "discount%", validCoupon.discount);

  // calculate the total after discount

  let totalAfterDiscount = (
    cartTotal -
    (cartTotal * validCoupon.discount) / 100
  ).toFixed(2); // 99.99

  Cart.findOneAndUpdate(
    { orderedBy: user._id },
    { totalAfterDiscount },
    { new: true }
  ).exec();

  // console.log("final Cart ----> ", finalCart);
  res.json(totalAfterDiscount);
};

exports.createOrder = async (req, res) => {
  // console.log(req.body);
  // return;
  const { payloadDetails } = req.body;

  const user = await User.findOne({
    phone_number: req.user.phone_number,
  }).exec();

  let { products, wrap, cartTotal, totalAfterDiscount } = await Cart.findOne({
    orderedBy: user._id,
  }).exec();

  let newOrder = await new Order({
    products,
    wrap,
    cartTotal,
    totalAfterDiscount,
    payloadDetails,
    orderedBy: user._id,
  }).save();

  // decrement quantity, increment sold
  let bulkOption = products.map((item) => {
    return {
      updateOne: {
        filter: { _id: item.product._id }, // IMPORTANT item.product
        update: { $inc: { quantity: -item.count, sold: +item.count } },
      },
    };
  });

  let updated = await Product.bulkWrite(bulkOption, {});
  console.log("PRODUCT QUANTITY-- AND SOLD++", updated);

  console.log("NEW ORDER SAVED", newOrder);
  res.json({ ok: true });
};
