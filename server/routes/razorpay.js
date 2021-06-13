const express = require("express");
const router = express.Router();
const cors = require("cors");
const bodyParser = require("body-parser");

//app
const app = express();

app.use(cors());
app.use(bodyParser.json());

//middlewares
const { authCheck } = require("../middlewares/auth");

const {
  Create,
    verifyAndOrder,
} = require("../controllers/razorpay");

router.post("/razorpay", authCheck, Create);
router.post("/verification", verifyAndOrder);

module.exports = router;
