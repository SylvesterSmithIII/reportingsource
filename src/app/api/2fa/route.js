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

    console.log(process.env.AWS_REGION)

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
    if (err) {
        console.log(err, err.stack); // an error occurred
    } else {
        console.log(data);           // successful response
    }

    });

    return NextResponse.json({ message: "Email Sent" })

}