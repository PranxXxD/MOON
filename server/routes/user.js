const express = require("express");
const router = express.Router();

//middlewares
const { authCheck } = require("../middlewares/auth");

//controllers
const {
  userCart,
  getUser,
  getUserCart,
  emptyCart,
  saveAddress,
  applyCouponToUserCart,
  createOrder,
} = require("../controllers/user");

router.post("/user/cart", authCheck, userCart); //save cart
router.get("/user", authCheck, getUser); // get user
router.get("/user/cart", authCheck, getUserCart); // get cart
router.delete("/user/cart", authCheck, emptyCart); //empty cart
router.post("/user/address", authCheck, saveAddress); //save address
router.post("/user/order", authCheck, createOrder);

//coupon
router.post("/user/cart/coupon", authCheck, applyCouponToUserCart);

module.exports = router;
