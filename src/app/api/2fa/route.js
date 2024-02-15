import connectMongoDB from "@/libs/mongodb";
import { NextResponse } from "next/server";
import * as AWS from 'aws-sdk'


export async function POST(request) {

    const { email, authCode } = await request.json()

    AWS.config.update({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.AWS_REGION
    })

    const ses = new AWS.SES();

    const params = {
    Source: 'sylvestermsmithiii@gmail.com', // Sender's email address
    Destination: {
        ToAddresses: [
            email // Receiver's email address
        ]
    },
    Message: {
        Subject: {
        Data: `2FA Code`
        },
        Body: {
        Text: {
            Data: `This is your 2FA code: ${authCode}`
        }
        }
    }
    };



    ses.sendEmail(params, (err, data) => {
        console.log(data)
    if (err) {
        return NextResponse.json({ message: "There was a problem while seding the 2FA code" })
    } else {
        return NextResponse.json({ message: "Email was sent successfully" })
    }

    });



    return NextResponse.json({ message: "Email Sent" })

}