"use client";

import { Button } from "@nextui-org/react";
import Image from "next/image";
import React from "react";
import { signIn } from "next-auth/react";
import { authUserSession } from "@/libs/auth-session";

const Signin = () => {
  authUserSession();
  return (
    <div
      className="flex justify-center items-center h-screen"
      style={{
        backgroundImage: "url('/images/bg-signin.svg')",
        backgroundSize: "cover",
      }}
    >
      <div className="flex justify-center flex-col gap-5 -mt-8">
        <h2 className="text-[30px] font-bold tracking-[1px]">
          Login <span className="gradient-text">CepatPintar</span>
        </h2>
        <Button
          onClick={() => signIn("google", { callbackUrl: "/", redirect: true })}
          className="flex items-center justify-center gap-3 w-full bg-white hover:bg-gray-50 text-[#757575] font-medium border border-gray-200 h-[45px] shadow-[0_2px_4px_0.1px_rgba(0,0,0,0.17)] hover:shadow-[0_0px_3px_0.1px_rgba(0,0,0,0.25)] rounded-md"
        >
          <Image
            src="/images/icons/google-icon.svg"
            alt="google"
            width={24}
            height={24}
          />
          Login with Google
        </Button>
      </div>
    </div>
  );
};

export default Signin;
