import User from "@/app/models/user";
import { connect } from "@/app/config/databaseConnection";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect();

export async function POST(request) {
  try {
    const resBody = await request.json();
    const { firstname, lastname, email, username, password } = resBody;

    const user = await User.findOne({ email });

    if (user) {
      return NextResponse({ error: "User already exists!", status: 400 });
    }

    const generatedSalt = await bcryptjs.genSalt(10);
    const protectedPassword = await bcryptjs.hash(password, generatedSalt);

    const receivedUser = new User({
      firstname,
      lastname,
      email,
      username,
      password: protectedPassword,
    });

    const createdUser = await receivedUser.save();

    return NextResponse.json({
      message: "User Created!",
      success: true,
      createdUser,
    });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
