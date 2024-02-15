import connectMongoDB from "@/libs/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
import * as bcrypt from "bcrypt";
import { ObjectId, connect } from "mongoose";

const saltRounds = 7 

export async function POST(request) {

    let userData = await request.json()
    const hash = await bcrypt.hash(userData.password, saltRounds)

    userData = {
        ...userData,
        'password': hash,
        'email': userData.email.toLowerCase()
    }

    await connectMongoDB()

    const existingUser = await User.findOne({ email: userData.email })

    if (existingUser) return NextResponse.json({ message: "user already exists" })

    const user = await User.create(userData)

    const clientUser = {
        _id: user._id,
        mod: user.mod,
        accepted: user.accepted
    }

    console.log(clientUser)

    return NextResponse.json(clientUser)
}

export async function PUT(request) {
    const { id, decision } = await request.json()

    await connectMongoDB()

    const user = await User.findById(id)

    user.accepted = decision

    user.save()

    return NextResponse.json({ message: 'changed' })

}