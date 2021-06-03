import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getUserCart,
  emptyUserCart,
  saveUserAddress,
  applyCoupon,
} from "../functions/user";
import { toast } from "react-toastify";
import { Row, Col } from "reactstrap";

import "react-quill/dist/quill.snow.css";
import Button from "../components/Button";

const Checkout = ({ history }) => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState({
    address: "",
    phone: "",
    city: "",
    state: "",
    country: "",
    pinCode: "",
  });
  const [addressSaved, setAddressSaved] = useState(false);
  const [coupon, setCoupon] = useState("");

  //discount price
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const [discountError, setDiscountError] = useState("");

  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    getUserCart(user.token).then((res) => {
      console.log("user cart res", JSON.stringify(res.data, null, 4));
      setProducts(res.data.products);
      setTotal(res.data.cartTotal);
    });
  }, []);

  const emptyCart = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("cart");
    }

    //remove from redux
    dispatch({
      type: "ADD_TO_CART",
      payload: [],
    });

    // remove from backend
    emptyUserCart(user.token).then((res) => {
      setProducts([]);
      setTotal(0);
      setTotalAfterDiscount(0);
      setCoupon("");
      toast.success("Cart is empty. Continue Shopping..");
    });
  };

  const saveAddressToDb = () => {
    console.log("address", address);
    saveUserAddress(user.token, address).then((res) => {
      if (res.data.ok) {
        setAddressSaved(true);
        toast.success("Address saved");
      }
    });
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

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const showAddress = () => (
    <>
      <div className="add-address">
        <form>
          <Row>
            <Col xs="12" md="6">
              <div className="form-group">
                <label>Address: Street, House No / Apartment No</label>
                <input
                  type={"text"}
                  name={"address"}
                  className="form-control"
                  value={address.address}
                  onChange={handleChange}
                />
              </div>
            </Col>
            <Col xs="12" md="3">
              <div className="form-group">
                <label>Phone</label>
                <input
                  type="number"
                  name={"phone"}
                  className="form-control"
                  value={address.phone}
                  onChange={handleChange}
                />
              </div>
            </Col>
            <Col xs="12" md="3">
              <div className="form-group">
                <label>City</label>
                <input
                  type={"text"}
                  name={"city"}
                  className="form-control"
                  value={address.city}
                  onChange={handleChange}
                />
              </div>
            </Col>
            <Col xs="12" lg="3">
              <div className="form-group">
                <label>State</label>
                <input
                  type={"text"}
                  name={"state"}
                  className="form-control"
                  value={address.state}
                  onChange={handleChange}
                />
              </div>
            </Col>
            <Col xs="12" lg="3">
              <div className="form-group">
                <label>Country</label>
                <input
                  type={"text"}
                  name={"country"}
                  className="form-control"
                  value={address.country}
                  onChange={handleChange}
                />
              </div>
            </Col>
            <Col xs="12" lg="3">
              <div className="form-group">
                <label>PinCode</label>
                <input
                  type="number"
                  name={"pinCode"}
                  className="form-control"
                  value={address.pinCode}
                  onChange={handleChange}
                />
              </div>
            </Col>
          </Row>
          <div className="add-address-actions">
            <Button onClick={saveAddressToDb} text="Add Address" />
          </div>
        </form>
      </div>
    </>
  );

  return (
    <div className="contact">
      <Row>
        <Col xs="12" md="9">
          <h4>Delivery Address</h4>
          {showAddress()}
          <hr />
        </Col>
      </Row>
      <Row>
        <Col xs="12" md="5">
          {discountError && <p className="text-danger">{discountError}</p>}

          <Button
            variant="primary"
            className="btn m-2"
            disabled={!addressSaved || !products.length}
            onClick={() => history.push("/payment")}
            text="Place Order"
          />
          <Button
            variant="primary"
            className="btn m-2"
            disabled={!products.length}
            onClick={emptyCart}
            className="btn"
            text="Empty Cart"
          />
        </Col>
        <Col xs="12" md="12"></Col>
      </Row>
    </div>
  );
};

export default Checkout;
