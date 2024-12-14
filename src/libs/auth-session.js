import { useSession } from "next-auth/react";

export const authUserSession = () => {
  const { data: session, status } = useSession();

  return { session, status };
};
