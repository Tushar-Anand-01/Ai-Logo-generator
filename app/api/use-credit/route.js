import { db } from "@/configs/FirebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { userEmail } = await req.json();

    const userRef = doc(db, "users", userEmail);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const userData = userSnap.data();

      if (userData.credits > 0) {
        await updateDoc(userRef, {
          credits: userData.credits - 1,
        });

        return NextResponse.json({ success: true });
      } else {
        return NextResponse.json({ success: false, message: "No credits left" });
      }
    } else {
      return NextResponse.json({ success: false, message: "User not found" });
    }
  } catch (error) {
    console.error("Error using credit:", error);
    return NextResponse.json({ success: false, message: "Internal Server Error" });
  }
}