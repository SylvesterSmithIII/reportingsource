import User from "@/models/user"
import UserCard from "@/components/UserCard"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "../api/auth/[...nextauth]/route"
import connectMongoDB from "@/libs/mongodb"

export default async function Admin() {

    const session = await getServerSession(authOptions)

    if (session.user?.mod !== 'true') return redirect('/')

    await connectMongoDB()

    const waitlistedUsers = await User.find({ accepted: 'waitlisted' })

    if (waitlistedUsers.length === 0) {
        return (
            <div className="h-screen flex flex-col justify-center items-center">
                <h1 className="text-6xl">No One</h1>
                <h1 className="text-6xl">To Verify</h1>
            </div>
        )
    }

    const waitlistedUserElements = waitlistedUsers.map((user, idx) => { 

        const id = user._id.toString()

        return <UserCard key={idx} id={id} name={user.name} email={user.email} company={user.company}/>
    })

    return (
        <div>
            {waitlistedUserElements}
        </div>
    ) 
}