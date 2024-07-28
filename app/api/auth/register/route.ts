import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User";
import dbConnect from "@/lib/db";

export async function POST(req: NextRequest) {
  const { username, password, email, phone, accname, accnum, bsb, bankname } =
    await req.json();

  await dbConnect();

  try {
    const user = new User({
      username,
      password: password,
      email: email,
      phone: phone,
      accname: accname,
      accnum: accnum,
      bsb: bsb,
      bankname: bankname,
    });
    await user.save();
    return NextResponse.json(
      { userId: user._id, message: "User created successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error creating user", error },
      { status: 500 }
    );
  }
}
