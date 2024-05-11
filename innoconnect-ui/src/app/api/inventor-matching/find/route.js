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
    const { role, project } = resBody;

    const excludedEmails = [];
    for (inventor of project.inventors) {
      excludedEmails.push(inventor.email);
    }

    const inventors = await User.find({ role: role, language: project.mainCommunicationLanguage, timezone: project.mainTimezone, matching: true, email: { $nin: excludedEmails } });

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
