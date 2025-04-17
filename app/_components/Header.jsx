"use client";

import { Button } from "@/components/ui/button";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { LayoutDashboard } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = () => {
  const { user } = useUser();
  return (
    <div className="px-10 lg:px-32 xl:px-48 2xl:px-56 p-4 flex justify-between items-center shadow-sm">
      <Image src={"/logo.svg"} alt="logo" width={100} height={50} />
      <div className="gap-3 flex items-center">
        {user ? (
          // ✅ CHANGED outline variant to custom teal outline
            <Link href={"/dashboard"}>
                <Button className="bg-teal-600 hover:bg-teal-700 text-white">
                  {" "}
                  <LayoutDashboard /> Dashboard
                </Button>
              </Link>
        ) : (
          // ✅ CHANGED filled button to use teal background with hover effect
          <SignInButton mode="modal" forceRedirectUrl={"/create"}>
            <Button className="bg-teal-600 hover:bg-teal-700 text-white">Login</Button>
          </SignInButton>

        )}
        <UserButton />
      </div>
    </div>
  );
};

export default Header;
