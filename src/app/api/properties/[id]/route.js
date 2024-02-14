import connectMongoDB from "@/libs/mongodb";
import Property from "@/models/property";
import { NextResponse } from "next/server";

export async function DELETE(request, { params }) {
    const { id } = params
    await connectMongoDB()

    await Property.findByIdAndDelete(id)

    return NextResponse.json({ message: "deleted" })

}