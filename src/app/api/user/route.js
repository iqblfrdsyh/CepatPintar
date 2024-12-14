import { getAllUsers } from "@/libs/firebase/service";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await getAllUsers();
    return NextResponse.json(response);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { status: false, error: error.message },
      { status: 500 }
    );
  }
}
