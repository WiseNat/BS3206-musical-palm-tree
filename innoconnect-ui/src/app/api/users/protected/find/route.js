/**
 * @author Tom Shortridge
 */
import User from "@/app/models/user";
import { connect } from "@/app/config/databaseConnection";
import { NextResponse } from "next/server";
import { auth } from "@/app/auth";

connect();

export async function GET(req) {
  try {
    const session = await auth();
    const email = session.user.email;
    const user = await User.findOne({ email });
    user.password = "";

    if (user) {
      return NextResponse.json({ user: user, status: 200 });
    }
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
