/**
 * @author Tom Shortridge
 *
 * This route updates a user by taking a user object, locating that user within the database, and updating the fields.
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

    // If password is provided, hash it.
    if (password) {
      password = await bcrypt.hash(password, 10);
    }
    // The user identifier - email
    const filter = { email: email };

    // The updated fields which the user has provided
    const updatedFields = {
      role: role,
      timezone: timezone,
      language: language,
      matching: matching,
      password: password,
    };

    // Find the user and update based on the updatedFields.
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
