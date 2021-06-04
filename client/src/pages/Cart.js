import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProductCardInCheckout from "../components/cards/ProductCardInCheckout";
import { userCart, getUserCart, applyCoupon } from "../functions/user";
// import Button from "../components/Button";
import { Row, Col } from "reactstrap";
import { ImGift } from "react-icons/im";
import { useDispatch } from "react-redux";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

const Cart = ({ history }) => {
  const { user, cart } = useSelector((state) => ({ ...state }));
  const [wrap, setWrap] = useState(false);
  const [open, setOpen] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [on, setOn] = useState(false);

  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const [discountError, setDiscountError] = useState("");

  let dispatch = useDispatch();

  const getTotal = () => {
    return cart.reduce((currentVal, nextVal) => {
      return currentVal + nextVal.count * nextVal.price;
    }, 0);
  };

  const getWeight = () => {
    return cart.reduce((currentVal, nextVal) => {
      return currentVal + nextVal.count * nextVal.weight;
    }, 0);
  };

  const getShipping = (x) => {
    if (x() == 0) {
      return 0;
    } else if (x() > 0 && x() <= 500) {
      return 69;
    } else if (x() > 500 && x() <= 1000) {
      return 99;
    } else if (x() > 1000 && x() <= 1500) {
      return 149;
    } else if (x() > 1500 && x() <= 2000) {
      return 169;
    } else {
      return 199;
    }
  };

  const saveOrderToDb = () => {
    // console.log("cart", JSON.stringify(cart, null, 4));
    userCart(cart, wrap, user.token)
      .then((res) => {
        console.log("Cart post response", res);
        // if (res.data.ok) history.push("/checkout");
      })
      .catch((err) => console.log("save data error", err));
  };

  const sendOrderToDb = () => {
    // console.log("cart", JSON.stringify(cart, null, 4));
    userCart(cart, wrap, user.token)
      .then((res) => {
        console.log("Cart post response", res);
        if (res.data.ok) history.push("/checkout");
      })
      .catch((err) => console.log("save data error", err));
  };

  const applyDiscountCoupon = () => {
    console.log("send coupon to backend", coupon);
    applyCoupon(user.token, coupon).then((res) => {
      console.log("RES ON COUPON APPLIED", res.data);
      if (res.data) {
        setTotalAfterDiscount(res.data);
        // update redux coupon applied true/false
        dispatch({
          type: "COUPON_APPLIED",
          payload: true,
        });
      }
      // error
      if (res.data.err) {
        setDiscountError(res.data.err);
        // update redux coupon applied true/false
        dispatch({
          type: "COUPON_APPLIED",
          payload: false,
        });
      }
    });
  };

  const showCartItems = () => (
    <div className="cart mt-4">
      <div className="cart-body">
        <div className="cart-list">
          {cart.map((p) => (
            <ProductCardInCheckout
              setTotalAfterDiscount={setTotalAfterDiscount}
              key={p._id}
              p={p}
            />
          ))}
        </div>
      </div>
    </div>
  );

  const handleClose = () => {
    applyDiscountCoupon();
    setOn(false);
  };

  const handleOpen = () => {
    saveOrderToDb();
    setOn(true);
  };

  const couponDiscount = (
    getTotal() +
    getShipping(getWeight) -
    totalAfterDiscount
  ).toFixed(2);

  const finalTotal = (getTotal() + getShipping(getWeight)).toFixed(2);

  const wrapTotal = (getTotal() + getShipping(getWeight) + 30).toFixed(2);

  return (
    <div className="contact">
      <Row>
        <Col xs="12" sm="12" md="6">
          {!cart.length ? (
            <p className="h_4">
              No products in cart.{" "}
              <Link to="/shop">
                <u>Continue Shopping</u>
              </Link>
            </p>
          ) : (
            showCartItems()
          )}
        </Col>
        <Col xs="12" sm="12" md="4">
          <Col xs="12" sm="12">
            <div className="cart mt-4">
              <div className="cart-body">
                <div className="item-details">
                  <div className="item-box">
                    <h4 className="h_4">Order Summary</h4>
                    <hr />
                    {cart.map((c, i) => (
                      <div key={i}>
                        <p className="item-label">
                          {c.title} x {c.count}
                          {wrap && <ImGift fontSize="medium" />}
                        </p>
                      </div>
                    ))}
                    <FormControlLabel
                      control={
                        <Checkbox
                          icon={<CheckBoxOutlineBlankIcon fontSize="medium" />}
                          checkedIcon={<CheckBoxIcon fontSize="medium" />}
                          checked={wrap}
                          onChange={(e) => {
                            setWrap(e.target.checked);
                            setTotalAfterDiscount(0);
                          }}
                        />
                      }
                      label="Gift Wrap your cart at ₹30?"
                    />
                    <hr />
                    <Row>
                      <Col>
                        <p className="item-label">Order Total:</p>
                      </Col>
                      <Col>
                        <p className="item-label text-right">₹{getTotal()}</p>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <p className="item-label">
                          Convenience fee:
                          <InfoOutlinedIcon
                            fontSize="small"
                            className="pointer"
                            value={open}
                            onClick={(e) => setOpen(true)}
                          />
                        </p>
                      </Col>
                      <Col>
                        <p className="item-label text-right">
                          ₹{getShipping(getWeight)}
                        </p>
                      </Col>
                    </Row>
                    {wrap && (
                      <Row>
                        <Col>
                          <p className="item-label">Gift Wrapping:</p>
                        </Col>
                        <Col>
                          <p className="item-label text-right">₹30</p>
                        </Col>
                      </Row>
                    )}

                    <Row>
                      <Col>
                        <p className="item-label">Coupon Discount:</p>
                        <Dialog
                          onClose={(e) => setOpen(false)}
                          aria-labelledby="simple-dialog-title"
                          open={open}
                        >
                          <DialogTitle id="simple-dialog-title">
                            Convience fee:
                          </DialogTitle>
                          <DialogContent>
                            <DialogContentText>
                              Convience fee is charged on behalf of the delivery
                              charges which might vary based on the delivery
                              location and weight of the products. For further
                              information, Please contact Customer Support.
                            </DialogContentText>
                          </DialogContent>
                        </Dialog>
                      </Col>
                      <Col>
                        {totalAfterDiscount > 0 ? (
                          <p className="item-label text-right text-success">
                            -₹{couponDiscount}
                            <HighlightOffIcon
                              fontSize="small"
                              value={on}
                              className="text-danger pointer ml-1"
                              onClick={(e) => setTotalAfterDiscount(0)}
                            />
                          </p>
                        ) : user ? (
                          <button
                            onClick={handleOpen}
                            className="item-label float-right text-success"
                          >
                            Apply Coupon?
                          </button>
                        ) : (
                          <Link
                            to={{
                              pathname: "/login",
                              state: { from: "cart" },
                            }}
                          >
                            <button className="item-label float-right text-success">
                              Apply Coupon?
                            </button>
                          </Link>
                        )}
                      </Col>
                    </Row>
                    <hr />
                    <Row>
                      {wrap ? (
                        <>
                          <Col>
                            <p className="item-name one-line-ellipsis">
                              Total Amount:
                            </p>
                          </Col>
                          <Col>
                            <p className="item-name one-line-ellipsis text-right">
                              ₹
                              {totalAfterDiscount > 0
                                ? totalAfterDiscount
                                : wrapTotal}
                            </p>
                          </Col>
                        </>
                      ) : (
                        <>
                          <Col>
                            <p className="item-name one-line-ellipsis">
                              Total:
                            </p>
                          </Col>
                          <Col>
                            <p className="item-name one-line-ellipsis text-right">
                              ₹
                              {totalAfterDiscount > 0
                                ? totalAfterDiscount
                                : finalTotal}
                            </p>
                          </Col>
                        </>
                      )}
                    </Row>
                    {discountError && (
                      <p className="text-danger">{discountError}</p>
                    )}
                    <Dialog
                      onClose={(e) => setOn(false)}
                      aria-labelledby="simple-dialog-title"
                      open={on}
                    >
                      <DialogTitle id="simple-dialog-title">
                        Apply Coupon
                      </DialogTitle>
                      <DialogContent>
                        <TextField
                          autoFocus
                          margin="dense"
                          id="name"
                          label="Coupon Code"
                          fullWidth
                          onChange={(e) => {
                            setCoupon(e.target.value);
                            setDiscountError("");
                          }}
                        />
                        <DialogActions>
                          <Button onClick={(e) => setOn(false)} color="primary">
                            Cancel
                          </Button>
                          <Button onClick={handleClose} color="primary">
                            Apply
                          </Button>
                        </DialogActions>
                      </DialogContent>
                    </Dialog>
                    {user && totalAfterDiscount == 0 ? (
                      <Button
                        variant="contained"
                        color="secondary"
                        size="large"
                        onClick={sendOrderToDb}
                        className="w-100 mt-2"
                        endIcon={<ShoppingCartIcon />}
                        disabled={!cart.length}
                      >
                        Place Order
                      </Button>
                    ) : totalAfterDiscount > 0 ? (
                      <Button
                        variant="contained"
                        color="secondary"
                        size="large"
                        onClick={(e) => history.push("/checkout")}
                        className="w-100 mt-2"
                        endIcon={<ShoppingCartIcon />}
                        disabled={!cart.length}
                      >
                        Place Order
                      </Button>
                    ) : (
                      <Link
                        to={{
                          pathname: "/login",
                          state: { from: "cart" },
                        }}
                      >
                        <Button
                          variant="contained"
                          color="secondary"
                          size="large"
                          className="w-100 mt-2"
                          endIcon={<ShoppingCartIcon />}
                          disabled={!cart.length}
                        >
                          Place Order
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Col>
      </Row>
    </div>
  );
};

export default Cart;
