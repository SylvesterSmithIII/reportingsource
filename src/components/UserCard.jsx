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
        <div className="w-96 bg-white shadow-lg rounded-lg p-4">
            <p className="text-lg font-semibold mb-2">{name}</p>
            <p className="text-gray-700 mb-2">{email}</p>
            <p className="text-gray-700 mb-2">{company}</p>
            <div className="border-t border-gray-200 pt-4 flex justify-evenly">
                <button className="bg-gray-500 hover:bg-green-600 text-white rounded-md p-2" onClick={handleClick} name="accepted">Accept</button>
                <button className="bg-gray-500 hover:bg-red-600 text-white rounded-md p-2" onClick={handleClick} name="denied">Reject</button>
            </div>
        </div>
    )
}