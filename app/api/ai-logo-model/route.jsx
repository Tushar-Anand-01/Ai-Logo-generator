import { AILogoPrompt } from "@/configs/AiModel";
import { db } from "@/configs/FirebaseConfig";
import axios from "axios";
import { doc, setDoc, updateDoc, arrayUnion, getDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { prompt, email, title, desc } = await req.json();

  try {
    const AiPromptResult = await AILogoPrompt.sendMessage(prompt);

    // ✅ FIXED: Parsed string prompt
    const AIPrompt = JSON.parse(AiPromptResult.response.text()).prompt;

    // ✅ FIXED: Send AIPrompt as { inputs: AIPrompt }
    const response = await axios.post(
      "https://router.huggingface.co/hf-inference/models/black-forest-labs/FLUX.1-dev",
      { inputs: AIPrompt }, // ✅ this fixes the 404 and wrong body issue
      {
        headers: {
          Authorization: "Bearer " + process.env.HUGGING_FACE_API_KEY,
          "Content-Type": "application/json",
        },
        responseType: "arraybuffer", // ✅ keep this to handle image buffer
      }
    );

    // ✅ Convert buffer to base64
    const buffer = Buffer.from(response.data, "binary");
    const base64Image = buffer.toString("base64");
    const base64ImageWithMime = `data:image/png;base64,${base64Image}`;

    // ✅ Firebase: Store logo with metadata
    const logoData = {
      image: base64ImageWithMime,
      title: title,
      desc: desc,
      id: Date.now(),
    };

    const userDocRef = doc(db, "users", email);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      await setDoc(userDocRef, { logos: [logoData] });
    } else {
      await updateDoc(userDocRef, {
        logos: arrayUnion(logoData),
      });
    }

    return NextResponse.json({
      image: base64ImageWithMime, // ✅ send to frontend
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: error.message });
  }
}
