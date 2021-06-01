import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProductCardInCheckout from "../components/cards/ProductCardInCheckout";
import { userCart, getUserCart } from "../functions/user";
import Button from "../components/Button";
import { Row, Col } from "reactstrap";
import { ImGift } from "react-icons/im";
import { useDispatch } from "react-redux";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";

const Cart = ({ history }) => {
  const { user, cart } = useSelector((state) => ({ ...state }));
  const [wrap, setWrap] = useState(false);

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
    if (x() <= 500) {
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
        if (res.data.ok) history.push("/checkout");
      })
      .catch((err) => console.log("save data error", err));
  };

  const showCartItems = () => (
    <div className="cart mt-4">
      <div className="cart-body">
        <div className="cart-list">
          {cart.map((p) => (
            <ProductCardInCheckout key={p._id} p={p} />
          ))}
        </div>
      </div>
    </div>
  );

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
        <Col xs="12" sm="12" md="3">
          <Col xs="12" sm="12" xs="12">
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
                    <hr />
                    <Row>
                      <Col>
                        <p className="item-label">Order Total:</p>
                        <p className="item-label">Convience fee:</p>
                      </Col>
                      <Col>
                        <p className="item-label text-right">₹{getTotal()}</p>
                        <p className="item-label text-right">
                          ₹{getShipping(getWeight)}
                        </p>
                      </Col>
                    </Row>
                    <FormControlLabel
                      control={
                        <Checkbox
                          icon={<CheckBoxOutlineBlankIcon fontSize="medium" />}
                          checkedIcon={<CheckBoxIcon fontSize="medium" />}
                          checked={wrap}
                          onChange={(e) => setWrap(e.target.checked)}
                        />
                      }
                      label="Gift Wrap?"
                    />

                    <hr />
                    {wrap ? (
                      <p className="item-name one-line-ellipsis">
                        Total: ₹{getTotal() + getShipping(getWeight) + 30}
                      </p>
                    ) : (
                      <p className="item-name one-line-ellipsis">
                        Total: ₹{getTotal() + getShipping(getWeight)}
                      </p>
                    )}

                    {user ? (
                      <Button
                        variant="primary"
                        text="Checkout"
                        onClick={saveOrderToDb}
                        className="w-100 mt-2"
                        disabled={!cart.length}
                      />
                    ) : (
                      <Link
                        to={{
                          pathname: "/login",
                          state: { from: "cart" },
                        }}
                      >
                        <Button
                          className="w-100"
                          text="Login to Checkout mt-2"
                          variant="primary"
                        />
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
