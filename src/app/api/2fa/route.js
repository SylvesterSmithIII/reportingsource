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



    try {
        const data = await ses.sendEmail(params).promise();
        console.log(data);
        return NextResponse.json({ message: "Email Sent" })
    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json({ message: "Email Failed To Send" })
    }

}