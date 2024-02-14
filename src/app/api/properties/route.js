import Property from "@/models/property";
import User from "@/models/user";
import connectMongoDB from "@/libs/mongodb";
import { NextResponse } from "next/server";

export async function GET() {

    await connectMongoDB()

    const properties = await Property.find({}).populate({
        path: 'postedBy',
        select: 'name email company _id'
    })

    console.log(properties)

    return NextResponse.json(properties)

}