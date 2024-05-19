/**
 * @author Tom Shortridge
 */
import User from "@/app/models/user";
import { connect } from "@/app/config/databaseConnection";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

connect();

export async function POST(req) {
  try {
    const resBody = await req.json();
    let { email, role, timezone, language, matching, password } = resBody;

    if (password) {
      password = await bcrypt.hash(password, 10);
    }

    const filter = { email: email };
    const updatedFields = {
      role: role,
      timezone: timezone,
      language: language,
      matching: matching,
      password: password,
    };

    const user = await User.findOneAndUpdate(filter, updatedFields).exec();

    return NextResponse.json({
      message: "User Updated!",
      success: true,
    });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
