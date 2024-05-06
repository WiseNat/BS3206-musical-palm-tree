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
    const { email, role, timezone, matching, password } = resBody;

    const filter = { email: email };
    const updatedFields = {
      role: role,
      timezone: timezone,
      matching: matching,
      password: password,
    };

    const user = await User.findOneAndUpdate(filter, updatedFields);

    return NextResponse.json({
      message: "User Updated!",
      success: true,
    });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
