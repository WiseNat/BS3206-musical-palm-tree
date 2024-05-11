/**
 * @author Nathan Wise
 */
import User from "@/app/models/user";
import { connect } from "@/app/config/databaseConnection";
import { NextResponse } from "next/server";

connect();

export async function POST(req) {
  try {
    // TODO: Use this when finding inventors
    const resBody = await req.json();
    // const { email } = resBody;

    // TODO: Change this... obviously...
    // 1. Do NOT return inventors in the project already
    // 2. Find inventors that match the project preferences???
    // 3. Re-read original docs to figure out what I'm actually doing
    const inventors = await User.find({ });

    const recommendedInventors = []
    for (var inventor of inventors) {
      recommendedInventors.push({
        email: inventor.email,
        role: inventor.role,
        name: inventor.firstname + " " + inventor.lastname,
      })
    }

    if (recommendedInventors) {
      return NextResponse.json({ inventors: recommendedInventors, status: 200 });
    }
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
