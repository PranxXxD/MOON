import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProductCardInCheckout from "../components/cards/ProductCardInCheckout";
import { userCart } from "../functions/user";
import Button from "../components/Button";
import { Row, Col } from "reactstrap";
import { ImGift } from "react-icons/im";

const Cart = ({ history }) => {
  const { user, cart } = useSelector((state) => ({ ...state }));

  const getTotal = () => {
    return cart.reduce((currentVal, nextVal) => {
      if (nextVal.wrapping) {
        return currentVal + nextVal.count * nextVal.price + 20;
      }
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
      console.log("69", x());
      return 69;
    } else if (x() > 500 && x() <= 1000) {
      console.log("99", x());
      return 99;
    } else if (x() > 1000 && x() <= 1500) {
      console.log("149", x());
      return 149;
    } else if (x() > 1500 && x() <= 2000) {
      console.log("169", x());
      return 169;
    } else {
      console.log("199", x());
      return 199;
    }
  };

  //

  const saveOrderToDb = () => {
    // console.log("cart", JSON.stringify(cart, null, 4));
    userCart(cart, user.token)
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
              No products in cart. <Link to="/shop">Continue Shopping</Link>
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
                          {c.title} x {c.count}{" "}
                          {c.wrapping && <ImGift fontSize="medium" />}
                        </p>
                      </div>
                    ))}
                    <hr />
                    <p className="item-label">Order Total : ₹{getTotal()}</p>
                    <p className="item-label">Shipping :{getWeight()}g</p>
                    <p className="item-label">
                      Convience fee: ₹{getShipping(getWeight)}
                    </p>
                    <hr />
                    <p className="item-name one-line-ellipsis">
                      Total: ₹{getTotal() + getShipping(getWeight)}
                    </p>
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
