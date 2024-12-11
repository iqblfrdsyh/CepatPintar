"use client";

import { useState, useEffect } from "react";
import { NextUIProvider } from "@nextui-org/react";
import NavigationBar from "@/components/layouts/navigatonBar";
import { usePathname } from "next/navigation";
import { SessionProvider } from "next-auth/react";
import SplashScreen from "@/components/splash-screen";

export function Providers({ children }) {
  const pathname = usePathname();
  const [isSplashVisible, setSplashVisible] = useState(true);
  const [isLoaded, setLoaded] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSplashVisible(false);
      setLoaded(true);
    }, 3000);

    const visitedBefore = localStorage.getItem("visited");
    if (visitedBefore) {
      setSplashVisible(false);
      setLoaded(true);
    } else {
      localStorage.setItem("visited", "true");
    }

    return () => clearTimeout(timeout);
  }, []);

  return (
    <SessionProvider>
      <NextUIProvider>
        {isSplashVisible && <SplashScreen />}

        {!isSplashVisible && !(pathname == "/signin") && <NavigationBar />}

        <main
          className={` ${!(pathname == "/signin") && "xl:w-[1440px] mx-auto"} `}
          style={{
            opacity: isLoaded ? 1 : 0,
            transition: "opacity 0.5s ease-in-out",
          }}
        >
          {children}
        </main>
      </NextUIProvider>
    </SessionProvider>
  );
}
