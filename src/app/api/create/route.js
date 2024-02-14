import connectMongoDB from "@/libs/mongodb";
import Property from "@/models/property";
import { NextResponse } from "next/server";

export async function POST(request) {

    const { address, parcelNumber, lastName, comments, postedBy } = await request.json()

    await connectMongoDB()

    console.log(postedBy)

    await Property.create({
        address,
        parcelNumber,
        lastName,
        comments,
        postedBy
    })

    return NextResponse.json({ message: "Property Created" })

}