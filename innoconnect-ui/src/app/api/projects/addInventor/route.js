/**
 * @author Nathan Wise
 */
import Project from "@/app/models/project";
import { connect } from "@/app/config/databaseConnection";
import { NextResponse } from "next/server";
import * as EmailValidator from "email-validator";

connect();

export async function POST(req) {
  try {
    const resBody = await req.json();
    const { _id, email, role } = resBody;

    if (!EmailValidator.validate(email)) {
      return NextResponse.json(
        { error: `Invalid Email address '${email}' was provided` },
        { status: 500 },
      );
    }

    const preUpdateProject = await Project.findById(_id);
    let inventorExists = false;
    for (let i in preUpdateProject.inventors) {
      if (preUpdateProject.inventors[i].email == email) {
        inventorExists = true;
        break;
      }
    }

    if (inventorExists) {
      return NextResponse.json(
        { error: "Inventor is already on the project and cannot be added" },
        { status: 500 },
      );
    }

    const update = {
      $push: { inventors: { email: email, role: role, joinDate: Date.now() } },
    };

    const postUpdateProject = await Project.findByIdAndUpdate(_id, update, {
      new: true,
    });

    if (!postUpdateProject) {
      return NextResponse.json(
        { error: "No project found and update" },
        { status: 500 },
      );
    }

    const inventor =
      postUpdateProject.inventors[postUpdateProject.inventors.length - 1];

    return NextResponse.json({
      inventor: inventor,
      success: true,
    });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
