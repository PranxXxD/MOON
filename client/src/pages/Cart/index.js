import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import ProductCardInCheckout from "./ProductCardInCheckout";
// import Button from "../components/Button";
import { Row, Col } from "reactstrap";
import Summary from "./Summary";

const Cart = ({ history }) => {
  const { user, cart } = useSelector((state) => ({ ...state }));
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);

  let dispatch = useDispatch();

  const handleCoupon = () => {
    setTotalAfterDiscount(0);
    dispatch({
      type: "COUPON_APPLIED",
      payload: false,
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
              handleCoupon={handleCoupon}
            />
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
        <Col xs="12" sm="12" md="4">
          <Summary
            totalAfterDiscount={totalAfterDiscount}
            setTotalAfterDiscount={setTotalAfterDiscount}
            handleCoupon={handleCoupon}
          />
        </Col>
      </Row>
    </div>
  );
};

export default Cart;
