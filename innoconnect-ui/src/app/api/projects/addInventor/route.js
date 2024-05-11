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
    const { _id, email, role } = resBody;

    // TODO: Prevent dupes (bulk write?)
    const update = {
      $addtoset: { inventors: { email: email, role: role, joinDate: Date.now() } }
    };

    const project = await Project.findByIdAndUpdate(_id, update, { new: true });
    const inventor = project.inventors[project.inventors.length - 1];

    if (!project) {
      return NextResponse.json({ error: "No project found and update" }, { status: 500 });
    }

    return NextResponse.json({
      inventor: inventor,
      success: true,
    });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
