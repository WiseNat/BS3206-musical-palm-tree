import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const res = NextResponse.json({
      message: "User logged out",
      success: true,
    });

    // Sets user_token expiry to the past - making it invalid
    res.cookies.set("user_token", "", { httpOnly: true, expires: new Date(0) });
  } catch (e) {
    return NextResponse.json({ error: e.massage }, { status: 500 });
  }
}
