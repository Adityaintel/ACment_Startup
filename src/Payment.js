import React from "react";
import logo from "./images/homepage_illustrations/Acment_logo.png";
// import "./payment.css";
import axios from "axios";

const baseUrl = process.env.REACT_APP_BASE_URL;
const orderUrl = baseUrl + "subscription/order";
const verifyUrl = baseUrl + "/subscription/verify";

function Payment() {
  function loadScript(src) {
    // return new Promise((resolve) => {
    try {
      const script = document.createElement("script");
      script.src = src;
      document.body.appendChild(script);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }

    // script.onload = () => {
    //   resolve(true);
    // };
    // script.onerror = () => {
    //   resolve(false);
    // };
  }
  // );

  async function displayRazorpay() {
    const res = loadScript("https://checkout.razorpay.com/v1/checkout.js");

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const result = await axios.post(orderUrl);

    if (!result) {
      alert("Server error. Are you online?");
      return;
    }

    const { amount, id: order_id, currency } = result.data;

    const options = {
      key: "rzp_test_r6FiJfddJh76SI", // Enter the Key ID generated from the Dashboard
      amount: amount.toString(),
      currency: currency,
      name: "Soumya Corp.",
      description: "Test Transaction",
      image: { logo },
      order_id: order_id,
      handler: async function (response) {
        const data = {
          orderCreationId: order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
        };

        const result = await axios.post(verifyUrl, data);

        alert(result.data.msg);
      },
      prefill: {
        name: "Soumya Dey",
        email: "SoumyaDey@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Soumya Dey Corporate Office",
      },
      theme: {
        color: "#61dafb",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  return (
    <div className="payment">
      <header className="payment-header">
        <img src={logo} className="payment-logo" alt="logo" />
        <p>Buy React now!</p>
        <button className="payment-link" onClick={displayRazorpay}>
          Pay ₹500
        </button>
      </header>
    </div>
  );
}

export default Payment;
