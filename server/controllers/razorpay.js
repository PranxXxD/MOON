const shortid = require("shortid");
const Razorpay = require("razorpay");
const Cart = require("../models/cart");
const User = require("../models/user");
const bodyParser = require("body-parser");

const razorpay = new Razorpay({
  key_id: "rzp_test_Uh2D7oTuy7FFum",
  key_secret: "i8ZLZtj9sE4F3yQXpuP7ARic",
});

exports.verify = async (req, res) => {
  // do a validation
  const secret = "humaira";

  console.log(req.body);

  const crypto = require("crypto");

  const shasum = crypto.createHmac("sha256", secret);
  shasum.update(JSON.stringify(req.body));
  const digest = shasum.digest("hex");

  console.log(digest, req.headers["x-razorpay-signature"]);

  if (digest === req.headers["x-razorpay-signature"]) {
    console.log("Request is Legit");
    // process it
    res.json({ ok: "payment succesfull" });
  } else {
    // pass it
    res.json({ err: "payment failed" });
    console.log("Request is failed");
  }
};

exports.Create = async (req, res) => {
  console.log(req.body);

  const { couponApplied } = req.body;

  const user = await User.findOne({ phone_number: req.user.phone_number });

  const { cartTotal, totalAfterDiscount } = await Cart.findOne({
    orderedBy: user._id,
  }).exec();

  console.log(
    "cart total charged:",
    cartTotal,
    "after discount:",
    totalAfterDiscount
  );

  let finalAmount = 0;

  if (couponApplied && totalAfterDiscount) {
    finalAmount = totalAfterDiscount * 100;
  } else {
    finalAmount = cartTotal * 100;
  }

  const payment_capture = 1;
  const currency = "INR";

  const options = {
    amount: finalAmount,
    currency,
    receipt: shortid.generate(),
    payment_capture,
  };

  try {
    const response = await razorpay.orders.create(options);
    console.log("razorpay response--->", response);
    res.json({
      id: response.id,
      currency: response.currency,
      amount: response.amount,
    });
  } catch (error) {
    console.log(error);
  }
};
