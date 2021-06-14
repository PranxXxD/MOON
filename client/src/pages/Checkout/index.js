import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { createPaymentIntent } from "../../functions/payment";
import { getUser, createOrder, emptyUserCart } from "../../functions/user";
import Checkout from "./Address";

const Payment = ({ history }) => {
  const [data, setData] = useState("");
  const [pay, setPay] = useState("");
  const [order, setOrder] = useState("");
  const [sig, setSig] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [prefill, setPrefill] = useState({
    fname: "",
    lname: "",
    email: "",
    phone: "",
  });

  let dispatch = useDispatch();
  var mobile = "";

  const { fname, lname, email, phone } = prefill;
  const { user, coupon } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (!success) {
      getUser(user.token).then((res) => {
        setPrefill({
          ...prefill,
          fname: res.data.fname,
          lname: res.data.lname,
          email: res.data.email,
          phone: res.data.phone_number,
        });
      });

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

  async function displayRazorpay() {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    if (phone.startsWith("+")) {
      var temp = phone.substring(3, phone.length);
      mobile = "0" + temp;

      //Mobile number:
      console.log(mobile);
    }

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
        name: fname,
        email: email,
        contact: mobile,
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
          history.push("/order-confirm");
        }
      });
    }
  }, [pay, order, sig]);

  return (
    <div>
      <Checkout displayRazorpay={displayRazorpay} />
    </div>
  );
};

export default Payment;
