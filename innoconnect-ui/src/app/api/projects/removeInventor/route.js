/**
 * @author Nathan Wise
 */
import Project from "@/app/models/project";
import { connect } from "@/app/config/databaseConnection";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

connect();

export async function POST(req) {
  try {
    const resBody = await req.json();
    const { _id, email } = resBody;

    console.log(`attempting to remove '${email}' from '${_id}'`)

    const remove = {
      $pull: { inventors: { email: email } }
    };

    await Project.findByIdAndUpdate(_id, remove, { new: true });

    return NextResponse.json({
      message: "Successfully removed Inventor from project",
      success: true,
    });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
