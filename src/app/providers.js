"use client";

import { useState, useEffect, useCallback } from "react";
import { NextUIProvider } from "@nextui-org/react";
import NavigationBar from "@/components/layouts/navigatonBar";
import { usePathname } from "next/navigation";
import { SessionProvider } from "next-auth/react";
import SplashScreen from "@/components/splash-screen";
import { GetTheme, SetTheme } from "@/libs/theme";

export function Providers({ children }) {
  const pathname = usePathname();
  const [isSplashVisible, setSplashVisible] = useState(true);
  const [isLoaded, setLoaded] = useState(false);
  const [darkmode, setDarkmode] = useState(false);

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

  useEffect(() => {
    const theme = GetTheme();
    if (theme === "dark") {
      setDarkmode(true);
    } else if (theme === "light") {
      setDarkmode(false);
    }
  }, []);

  useEffect(() => {
    if (darkmode) {
      document.documentElement.classList.add("dark");
      SetTheme("dark");
    } else {
      document.documentElement.classList.remove("dark");
      SetTheme("light");
    }
  }, [darkmode]);

  const handleChangeMode = useCallback(() => {
    const newMode = !darkmode;
    setDarkmode(newMode);
    console.log(newMode);
  }, [darkmode]);

  return (
    <SessionProvider>
      <NextUIProvider>
        {isSplashVisible && <SplashScreen />}

        {!isSplashVisible && pathname !== "/signin" && (
          <NavigationBar onChange={handleChangeMode} darkmode={darkmode} />
        )}

        <main
          className={` ${pathname !== "/signin" && "xl:w-[1440px] mx-auto"} `}
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
