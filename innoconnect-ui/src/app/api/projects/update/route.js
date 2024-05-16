/**
 * @author Nathan Wise
 */
import Project from "@/app/models/project";
import { connect } from "@/app/config/databaseConnection";
import { NextResponse } from "next/server";
import { isValidUrl } from "@/app/lib/validation";

connect();

export async function POST(req) {
  try {
    const resBody = await req.json();
    const {
      _id,
      title,
      description,
      mainCommunicationLanguage,
      mainTimezone,
      mainProgrammingLanguage,
      mainTechnology,
      projectUrl,
    } = resBody;

    if (!isValidUrl(projectUrl)) {
      return NextResponse.json({ error: "Invalid Project URL!", status: 400 });
    }

    const project = await Project.findByIdAndUpdate(
      _id,
      {
        title: title,
        description: description,
        mainCommunicationLanguage: mainCommunicationLanguage,
        mainTimezone: mainTimezone,
        mainProgrammingLanguage: mainProgrammingLanguage,
        mainTechnology: mainTechnology,
        projectUrl: projectUrl,
      },
      {
        new: true,
      },
    );

    return NextResponse.json({
      project: project,
      success: true,
    });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
