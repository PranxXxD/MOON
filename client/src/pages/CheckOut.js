import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getUserCart,
  emptyUserCart,
  saveUserAddress,
  applyCoupon,
} from "../functions/user";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Button from "../components/Button";

const Checkout = ({ history }) => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState("");
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

  const showAddress = () => (
    <>
      <ReactQuill theme="snow" value={address} onChange={setAddress} />
      <Button
        variant="primary"
        className="btn btn-primary mt-2"
        onClick={saveAddressToDb}
        text="Save Address"
      />
    </>
  );

  const showProductSummary = () =>
    products.map((p, i) => (
      <div key={i}>
        <p>
          {p.product.title} ({p.color}) x {p.count} ={" "}
          {p.product.price * p.count}
        </p>
      </div>
    ));

  const showApplyCoupon = () => (
    <>
      <input
        className="form-control"
        type="text"
        value={coupon}
        placeholder="ENTER COUPON"
        onChange={(e) => {
          setCoupon(e.target.value);
          setDiscountError("");
        }}
      />
      <Button
        variant="primary"
        onClick={applyDiscountCoupon}
        className="btn mt-2"
        text="Apply"
      ></Button>
    </>
  );

  return (
    <div className="row">
      <div className="col-md-6">
        <h4>Delivery Address</h4>
        <br />
        <br />
        {showAddress()}
        <hr />
      </div>

      <div className="col-md-6">
        <h4>Order Summary</h4>
        <hr />
        <p> Total Products: {products.length}</p>
        <hr />
        <p>List of products:</p>
        {showProductSummary()}
        <hr />
        <p>Cart Total: ₹{total}</p>
        {totalAfterDiscount > 0 && (
          <>
            <p className="text-success">
              <strong>Discount Applied!!</strong> <br />
              Total Payable: ₹{totalAfterDiscount}
            </p>
          </>
        )}
        {discountError && <p className="text-danger">{discountError}</p>}

        <div>{showApplyCoupon()}</div>

        <div className="row my-5">
          <div className="col-md-6">
            <Button
              variant="primary"
              className="btn"
              disabled={!addressSaved || !products.length}
              onClick={() => history.push("/payment")}
              text="Place Order"
            />
          </div>

          <div className="col-md-6">
            <Button
              variant="primary"
              disabled={!products.length}
              onClick={emptyCart}
              className="btn"
              text="Empty Cart"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
