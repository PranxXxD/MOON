import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { createPaymentIntent, verifyAndOrder } from "../functions/payment";
import { createOrder, emptyUserCart } from "../functions/user";

const Payment = ({ history }) => {
  const [data, setData] = useState("");
  const [pay, setPay] = useState("");
  const [order, setOrder] = useState("");
  const [sig, setSig] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  let dispatch = useDispatch();

  const { user, coupon } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (!success) {
      createPaymentIntent(user.token, coupon).then((res) => {
        if (res.error) {
          setError(res.error);
        } else {
          setAmount(res.data.amount);
        }
        console.log("create payment intent", res);
        setData(res);
      });
    }
  }, [success]);

  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  const __DEV__ = document.domain === "localhost";

  const [name, setName] = useState("Bharath");

  async function displayRazorpay() {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    // const data = await fetch("http://localhost:8000/api/razorpay", {
    //   method: "POST",
    // }).then((t) => t.json());

    console.log("client data", data);

    const options = {
      key: __DEV__ ? "rzp_test_Uh2D7oTuy7FFum" : "PRODUCTION_KEY",
      currency: data.data.currency,
      amount: data.data.amount,
      order_id: data.data.id,
      name: "Donation",
      description: "Thank you for nothing. Please give us some money",
      handler: function (response) {
        setPay(response.razorpay_payment_id);
        setOrder(response.razorpay_order_id);
        setSig(response.razorpay_signature);
        alert(response.razorpay_payment_id);
        // alert(response.razorpay_order_id);
        // alert(response.razorpay_signature);
      },
      prefill: {
        name,
        email: "sdfdsjfh2@ndsfdf.com",
        phone_number: "9899999999",
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  const payloadDetails = {
    paymentID: pay,
    orderID: order,
    signature: sig,
    amount: amount,
    couponApplied: coupon,
  };

  useEffect(() => {
    if (pay !== "" && order !== "" && sig !== "") {
      createOrder(payloadDetails, user.token).then((res) => {
        if (res.data.ok) {
          // empty cart from local storage
          if (typeof window !== "undefined") localStorage.removeItem("cart");
          // empty cart from redux
          dispatch({
            type: "ADD_TO_CART",
            payload: [],
          });
          // reset coupon to false
          dispatch({
            type: "COUPON_APPLIED",
            payload: false,
          });
          // empty cart from database
          emptyUserCart(user.token);
          toast.success("Payment Succesfull");
          setSuccess(true);
        }
      });
    }
  }, [pay, order, sig]);

  useEffect(() => {
    if (success) {
      verifyAndOrder().then((res) => {
        if (res.data.ok) {
          history.push("/");
          console.log("backend verified");
        }
      });
    } else {
      toast.success("Order on hold");
    }
  }, [success]);

  return (
    <div className="App">
      <header className="App-header">
        <a
          className="App-link"
          onClick={displayRazorpay}
          target="_blank"
          rel="noopener noreferrer"
        >
          Donate
        </a>
        <br />
      </header>
    </div>
  );
};

export default Payment;
