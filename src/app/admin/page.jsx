import User from "@/models/user"
import UserCard from "./userCard"

export default async function Admin() {

    const waitlistedUsers = await User.find({ accepted: 'waitlisted' })

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