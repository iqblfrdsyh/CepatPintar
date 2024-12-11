import Image from "next/image";
import React from "react";

const SplashScreen = () => {
  return (
    <div className="h-screen w-screen overflow-hidden flex justify-center items-center bg-[#fafafa] animate-pulse">
      <div className="flex items-center gap-3">
        <Image
          src={"/images/logo.svg"}
          alt="logo"
          width={70}
          height={70}
          priority
        />
        <h1 className="gradient-text-logo font-bold text-[35px]">
          CepatPintar
        </h1>
      </div>
    </div>
  );
};

export default SplashScreen;
