import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createPaymentIntent } from "../functions/payment";

const Payment = () => {
  const [data, setData] = useState("");

  const { user, coupon } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    createPaymentIntent(user.token, coupon).then((res) => {
      console.log("create payment intent", res);
      setData(res);
    });
  }, []);

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
        alert(response.razorpay_payment_id);
        alert(response.razorpay_order_id);
        alert(response.razorpay_signature);
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
      </header>
    </div>
  );
};

export default Payment;
