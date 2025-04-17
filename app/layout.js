import { Host_Grotesk } from "next/font/google";
import "./globals.css";
import Provider from "./Provider";
import { ClerkProvider } from "@clerk/nextjs";

const host_Grotesk = Host_Grotesk({
  subsets: ["latin"],
});
export const metadata = {
  title: "BlueCode Team",
  description: "An AI-powered logo generator built by the BlueCode Team using Next.js, Firebase, and Hugging Face. Create stunning logos in seconds with just a few prompts.",
  icons: {
    icon: "/Logo-BlueTeam.jpg", // ← your new custom favicon
  },
};


export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${host_Grotesk.className}  antialiased`}>
          <Provider>{children}</Provider>
        </body>
      </html>
    </ClerkProvider>
  );
}
