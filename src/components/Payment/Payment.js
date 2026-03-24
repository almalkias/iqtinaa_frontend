import { useState, useContext, useEffect, useRef } from "react";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
  CardElement
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import apiClient from "../../api/client";
import { CartContext } from "../contexts/CartContext";
import { useLoading } from "../contexts/LoadingContext";
import { Link, useNavigate } from "react-router-dom";
import "./Payment.css";

import logo from "../../assets/images/logo-2.png";
import title from "../../assets/images/title-2.png";

// 🔑 Stripe public key
const stripePromise = loadStripe("pk_test_51TDoAPAbWn7WhVRQpxmIh8idOanR9hCI78qiUfODQqQaKMJEQwbknHVduLAGT9KXiFtlE4tswJiUEcVdRRuJEdGy00GArG8emF");

// ============================
// 🔥 FORM COMPONENT
// ============================
const CheckoutForm = ({ clientSecret }) => {
  const stripe = useStripe();
  const elements = useElements();

  const { getCartTotal } = useContext(CartContext);
  const { setIsLoading } = useLoading();

  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);
  const [cardName, setCardName] = useState(""); // 👈 جديد

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setProcessing(true);
    setIsLoading(true);

    try {
      const cardElement = elements.getElement(CardElement);

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: cardName, // 👈 مهم
          },
        },
      });

      if (result.error) {
        setError(result.error.message);
        return;
      }

      if (result.paymentIntent.status === "succeeded") {
        navigate("/payment-success");
      }

    } catch (err) {
      console.error(err);
      setError("حدث خطأ أثناء الدفع");
    } finally {
      setProcessing(false);
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="payment-form-container">

      <h2>طريقة الدفع</h2>

      {/* 💰 السعر */}
      <div style={{ direction: "rtl", marginBottom: "12px" }}>
        <span>المجموع: </span>
        <span>{getCartTotal()} ر.س</span>
      </div>

      {/* 👤 اسم البطاقة */}
      <input
        type="text"
        placeholder="اسم صاحب البطاقة"
        value={cardName}
        onChange={(e) => setCardName(e.target.value)}
        required
        className="card-name-input"
      />

      {/* 💳 بيانات البطاقة */}
      <div className="card-element-wrapper">
        <CardElement
          options={{
            hidePostalCode: true,
            style: {
              base: {
                fontSize: "16px",
                fontFamily: "Cairo, sans-serif",
              },
            },
          }}
        />
      </div>

      <button disabled={!stripe || processing}>
        {processing ? "جارٍ الدفع..." : "إكمال عملية الدفع"}
      </button>

      {error && <p className="error-message">{error}</p>}
    </form>
  );
};


// ============================
// 🔥 MAIN PAGE
// ============================
function PaymentPage() {
  const [clientSecret, setClientSecret] = useState(null);
  const { setIsLoading } = useLoading();

  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;

    hasFetched.current = true;

    const createIntent = async () => {
      setIsLoading(true);

      try {
        const res = await apiClient.post("/payments/intent/");
        setClientSecret(res.data.client_secret);
      } catch (error) {
        console.error("Error creating payment intent:", error);
      } finally {
        setIsLoading(false);
      }
    };

    createIntent();
  }, [])

  return (
    <div className="payment">

      {/* LOGO */}
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="" />
          <img src={title} alt="" />
        </Link>
      </div>

      {/* STRIPE */}
      {clientSecret && (
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret,
            locale: "ar",
            appearance: {
              theme: "stripe",
              variables: {
                fontFamily: "Cairo, sans-serif",
                direction: "rtl",
              },
            },
          }}
        >
          <CheckoutForm clientSecret={clientSecret} />
        </Elements>
      )}
    </div>
  );
}

export default PaymentPage;
