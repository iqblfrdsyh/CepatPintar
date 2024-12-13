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
      <div className="flex justify-center flex-col gap-5 sm:-mt-0 -mt-12 bg-white rounded-lg sm:p-14 p-10 m-5 shadow-md">
        <h2 className="text-[30px] font-bold tracking-[1px] text-center">
          Login <span className="gradient-text">CepatPintar</span>
        </h2>
        <Button
          onClick={() => signIn("google", { callbackUrl: "/", redirect: true })}
          className="flex items-center justify-center gap-3 w-full bg-transparent hover:bg-gray-100 text-[#757575] font-medium border-2 border-gray-400 h-[45px]  rounded-full"
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
