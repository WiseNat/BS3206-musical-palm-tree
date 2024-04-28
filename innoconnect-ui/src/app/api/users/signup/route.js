/**
 * @author Tom Shortridge
 */
import User from "@/app/models/user";
import { connect } from "@/app/config/databaseConnection";
import { NextResponse } from "next/server";

connect();

export async function POST(req) {
  try {
    const resBody = await req.json();
    const { firstname, lastname, email, username, password } = resBody;

    const user = await User.findOne({ email });

    if (user) {
      return NextResponse({ error: "User already exists!", status: 400 });
    }

    const receivedUser = new User({
      firstname,
      lastname,
      email,
      username,
      password: password,
    });

    const createdUser = await receivedUser.save();

    return NextResponse.json({
      message: "User Created!",
      success: true,
    });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
