import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export const authUserSession = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (status === "authenticated") {
      if (pathname === "/signin") {
        router.replace("/");
      } else if (pathname === "/") {
        router.replace("/");
      }
    } else {
      if (pathname !== "/signin") {
        router.replace("/signin");
      }
    }
  }, [status, router, pathname]);

  return { session, status };
};
