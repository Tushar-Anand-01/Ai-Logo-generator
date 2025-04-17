"use client";

import { UserDetailContext } from "@/app/_context/UserDetailsContext";
import { useRouter } from "next/navigation";
import { useContext } from "react";

// Razorpay script loader function
const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export default function PaymentPage() {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const router = useRouter();

  const handlePayment = async () => {
    const scriptLoaded = await loadRazorpayScript();

    if (!scriptLoaded) {
      alert("Failed to load Razorpay. Please check your internet.");
      return;
    }

    const res = await fetch("/api/razorpay/order", {
      method: "POST",
      body: JSON.stringify({ amount: 99 }), // ₹99 for 20 credits
    });

    const { orderId } = await res.json();

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: 99 * 100,
      currency: "INR",
      name: "CardL Logo Generator",
      description: "Buy 20 credits",
      order_id: orderId,
      handler: async function (response) {
        const verifyRes = await fetch("/api/razorpay/verify", {
          method: "POST",
          body: JSON.stringify({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            userEmail: userDetail.email,
          }),
        });

        const result = await verifyRes.json();

        if (result.success) {
          alert("Payment successful! 20 credits added.");
          setUserDetail((prev) => ({
            ...prev,
            credits: (prev?.credits ?? 0) + 20,
          }));
          router.push("/dashboard");
        } else {
          alert("Payment failed or could not verify.");
        }
      },
      prefill: {
        name: userDetail.name,
        email: userDetail.email,
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="flex flex-col items-center justify-center h-[70vh]">
      <h1 className="text-2xl font-bold mb-4">Buy More Credits</h1>
      <p className="text-lg mb-6">₹99 for 20 more logo generation credits.</p>
      <button
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-md font-semibold"
        onClick={handlePayment}
      >
        Pay with Razorpay
      </button>
    </div>
  );
}