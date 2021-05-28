const express = require("express");
const router = express.Router();

const { create } = require("../controllers/contact");

router.post("/contact", create);

module.exports = router;
