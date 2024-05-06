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
    const { _id } = resBody;

    const project = await Project.findById(_id);

    if (project) {
      return NextResponse.json({ project: project, status: 200 });
    }
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
