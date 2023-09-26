import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { user: { token, password, password2 } } = reqBody;

    const user = await User.findOne({ forgotPasswordToken: token, forgotPasswordTokenExpiry: { $gt: Date.now() } });

    console.log(user);

    if (!user) {
      return NextResponse.json({ error: "Invalid token" }, { status: 400 });
    } else if (password.length === 0 && password2.length === 0) {
      return NextResponse.json({ error: "empty passwords" }, { status: 400 });
    } else if (password !== password2) {
      return NextResponse.json({ error: "re-enter passwords" }, { status: 400 });
    }

    //hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    user.password = hashedPassword;
    user.forgotPasswordToken = undefined;
    user.forgotPasswordTokenExpiry = undefined;
    await user.save();

    return NextResponse.json({
      message: "password changed successfully",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
