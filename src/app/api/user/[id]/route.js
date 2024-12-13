import { updateLastStudyById } from "@/libs/firebase/service";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET(request, { params }) {
  const { id } = params;

  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ status: 401, error: "Unauthorized" });
    }

    console.log({ sessionUser: session });

    await updateLastStudyById(id, (response) => {
      if (response.status) {
        if (session.user) {
          session.user.last_study = response.last_study;
        }
      }
    });

    return NextResponse.json({
      status: 200,
      last_study: session.user.last_study,
    });
  } catch (error) {
    console.error("Error:", error.message);
    return NextResponse.json({ status: 500, error: error.message });
  }
}
