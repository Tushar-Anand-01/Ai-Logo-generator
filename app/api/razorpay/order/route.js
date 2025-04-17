import Razorpay from "razorpay";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { amount } = await req.json();

  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

  const options = {
    amount: amount * 100, // Amount in paise (100 = ₹1)
    currency: "INR",
    receipt: "receipt_order_" + Math.floor(Math.random() * 1000000),
  };

  try {
    const order = await razorpay.orders.create(options);
    return NextResponse.json({ orderId: order.id });
  } catch (error) {
    console.error("Razorpay Order Error:", error);
    return NextResponse.json({ error: "Unable to create order" }, { status: 500 });
  }
}