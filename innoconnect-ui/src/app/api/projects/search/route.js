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
    const { query, filter, filterType } = reqBody;

    let projects = await Project.fuzzySearch(query);

    let filteredProjects = [];
    if (filterType && filter) {
      for (let project of projects) {
        if (project[filterType] == filter) {
          filteredProjects.push(project);
        }
      }
      projects = filteredProjects;
    }

    if (projects) {
      return NextResponse.json({ projects: projects, status: 200 });
    }
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
