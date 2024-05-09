/**
 * @author Tom Shortridge
 */
import Project from "@/app/models/project";
import { connect } from "@/app/config/databaseConnection";
import { NextResponse } from "next/server";

connect();

export async function POST(req) {
  try {
    const reqBody = await req.json();
    const { query } = reqBody;

    const projects = await Project.fuzzySearch(query);

    console.log("projects", projects);

    if (projects) {
      return NextResponse.json({ projects: projects, status: 200 });
    }
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
