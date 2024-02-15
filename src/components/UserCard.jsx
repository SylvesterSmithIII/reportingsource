'use client'

import axios from "axios"
import { useState } from "react"

export default function UserCard({ id, name, email, company }) {

    const [isHidden, setIsHidden] = useState(false)

    const handleClick = async (e) => {
        const { name } = e.target

        await axios.put('/api/signup', {
            id,
            decision: name
        })

        setIsHidden(true)

    }

    if (isHidden) return null

    return (
        <div>
            <ul>
                <li>{name}</li>
                <li>{email}</li>
                <li>{company}</li>
                <button onClick={handleClick} name="accepted">Accept</button>
                <button onClick={handleClick} name="denied">Reject</button>
            </ul>
        </div>
    )
}