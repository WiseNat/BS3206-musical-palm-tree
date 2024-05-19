/**
 * @author Tom Shortridge
 *
 * This route uses the user's session to obtain their email and locate the user within the database.
 */
import User from "@/app/models/user";
import { connect } from "@/app/config/databaseConnection";
import { NextResponse } from "next/server";
import { auth } from "@/app/auth";

connect();

export async function GET(req) {
  try {
    //  Obtain the user's session
    const session = await auth();
    const email = session.user.email;
    // Find the user
    const user = await User.findOne({ email });
    // Remove the password so it is not sent to the client
    user.password = "";

    if (user) {
      return NextResponse.json({ user: user, status: 200 });
    }
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
