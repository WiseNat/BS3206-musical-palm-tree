/**
 * @author Tom Shortridge
 *
 * This route creates a user on the system.
 */
import User from "@/app/models/user";
import { connect } from "@/app/config/databaseConnection";
import { NextResponse } from "next/server";

// Connect to the database
connect();

export async function POST(req) {
  try {
    const resBody = await req.json();
    const {
      firstname,
      lastname,
      email,
      username,
      password,
      role,
      language,
      timezone,
      matching,
    } = resBody;

    // Attempt to get existing user
    const user = await User.findOne({ email });

    // Reject sign up attempt if user already exists
    if (user) {
      return NextResponse({ error: "User already exists!", status: 400 });
    }

    // Create new user
    const receivedUser = new User({
      firstname,
      lastname,
      email,
      username,
      password: password,
      role,
      language,
      timezone,
      matching,
    });

    // Commit user to the database
    await receivedUser.save();

    return NextResponse.json({
      message: "User Created!",
      success: true,
    });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
