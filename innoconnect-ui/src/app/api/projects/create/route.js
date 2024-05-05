/**
 * @author Nathan Wise
 */
import Project from "@/app/models/project";
import { connect } from "@/app/config/databaseConnection";
import { NextResponse } from "next/server";

connect();

export async function POST(req) {
  try {
    const resBody = await req.json();
    const { title, description, mainCommunicationLanguage, mainTimezone, mainProgrammingLanguage, mainTechnology } = resBody;

    const project = await Project.findOne({ title });

    if (project) {
      return NextResponse({ error: "Project already exists!", status: 400 });
    }

    const receivedProject = new Project({
      title,
      description,
      mainCommunicationLanguage,
      mainTimezone,
      mainProgrammingLanguage,
      mainTechnology
    });

    const createdProject = await receivedProject.save();

    return NextResponse.json({
      message: "Project Created!",
      success: true,
    });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
