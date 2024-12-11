import axios from "axios";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export const authUserSession = async () => {
  try {
    // Mendapatkan session menggunakan getServerSession
    // const session = await getServerSession(authOptions);

    // Mengirim session ke client melalui API
    // if (session) {
    // Menggunakan axios untuk mengirim session ke client
    const response = await axios.get("/api/auth/session");
    console.log(response.data.user);
    
    // } else {
    //   console.log('No session found');
    // }

    return response.data.user;
  } catch (error) {
    console.error("Error dalam mendapatkan session:", error);
    return null;
  }
};
