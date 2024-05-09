/**
 * @author Nathan Wise
 */
import User from "@/app/models/user";
import { connect } from "@/app/config/databaseConnection";
import { NextResponse } from "next/server";

connect();

export async function POST(req) {
  try {
    const resBody = await req.json();
    const { email } = resBody;

    const user = await User.findOne({ email: email });

    if (user) {
      return NextResponse.json({ user: user, status: 200 });
    }
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
