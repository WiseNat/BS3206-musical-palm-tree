import User from "@/app/models/user";
import { connect } from "@/app/config/databaseConnection";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

connect();

export async function POST(req) {
  try {
    const reqBody = await req.json();
    const { email, password } = reqBody;

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const passwordValidation = await bcrypt.compare(password, user.password);

    if (!passwordValidation) {
      return NextResponse.json(
        { error: "User password is incorrect" },
        { status: 400 }
      );
    } else {
      const cookieData = {
        id: user._id,
        email: user.email,
      };

      const generatedJWT = jwt.sign(cookieData, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      const res = NextResponse.json({
        message: "Successful Login!",
        success: true,
      });

      res.cookies.set("user_token", generatedJWT, {
        httpOnly: true,
      });

      return res;
    }
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
