"use client";
import { UserDetailContext } from "@/app/_context/UserDetailsContext";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";

function Info() {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const router = useRouter();

  const handleCreateClick = async () => {
    if (!userDetail) return;

    // Check credits
    if (userDetail.credits > 0) {
      // Call API to deduct 1 credit
      const res = await fetch("/api/use-credit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userEmail: userDetail.email }),
      });

      const data = await res.json();

      if (data.success) {
        setUserDetail((prev) => ({
          ...prev,
          credits: prev.credits - 1,
        }));
        router.push("/create");
      } else {
        alert("Something went wrong. Try again.");
      }
    } else {
      // Redirect to payment
      router.push("/payment");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-bold text-3xl text-blue-600">
            Hello, {userDetail?.name}
          </h2>
          <p className="text-gray-600 mt-1">
            Credits Left:{" "}
            <span className="font-semibold text-green-600">
              {userDetail?.credits ?? 0}
            </span>
          </p>
        </div>
      </div>

      <div className=" flex justify-between items-center mt-6">
        <h2 className="font-bold text-2xl">Dashboard</h2>
        <Button
          className="bg-teal-600 hover:bg-teal-700 text-white"
          onClick={handleCreateClick}
        >
          + Create New Logo
        </Button>
      </div>
    </div>
  );
}

export default Info;