import { db } from "@/configs/FirebaseConfig";
import { doc, updateDoc } from "firebase/firestore";
import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req) {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    userEmail,
  } = await req.json();

  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest("hex");

  if (expectedSignature === razorpay_signature) {
    // Signature verified — add 20 credits
    await updateDoc(doc(db, "users", userEmail), {
      credits: 20,
    });

    return NextResponse.json({ success: true });
  } else {
    return NextResponse.json({ success: false, message: "Invalid signature" });
  }
}