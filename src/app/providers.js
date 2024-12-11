"use client";

import { NextUIProvider } from "@nextui-org/react";
import NavigationBar from "@/components/layouts/navigatonBar";
import { usePathname } from "next/navigation";
import { SessionProvider } from "next-auth/react";

export function Providers({ children }) {
  const pathname = usePathname();

  return (
    <SessionProvider>
      <NextUIProvider>
        {!(pathname == "/signin") && <NavigationBar />}
        <main
          className={` ${!(pathname == "/signin") && "xl:w-[1440px] mx-auto"} `}
        >
          {children}
        </main>
      </NextUIProvider>
    </SessionProvider>
  );
}
