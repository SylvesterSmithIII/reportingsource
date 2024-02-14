import connectMongoDB from "@/libs/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
import * as bcrypt from "bcrypt";

export async function POST(request) {

    let { email, password } = await request.json()

    email = email.toLowerCase()

    await connectMongoDB()

    const user = await User.findOne({ email })

    if (!user) return NextResponse.json({ message: "Couldn't find user" }, { status: 404 })

    const isMatch = await bcrypt.compare(password, user.password)

    const clientUser = {
        _id: user._id,
        mod: user.mod,
        accepted: user.accepted
    }

    if (isMatch) {
        return NextResponse.json(clientUser)
    }
}