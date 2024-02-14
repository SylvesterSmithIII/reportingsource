'use client'

import { useState } from "react"
import { signIn } from "next-auth/react"
import axios from "axios"

export default function Login() {
    const [showForm, setShowForm] = useState(false)

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target

        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const user = await axios.post('/api/signin', formData)

        console.log('user data in login', user.data)

        await signIn("credentials", {
            ...user.data,
            callbackUrl: '/home'
        })
    }

    return (
        <>
            {!showForm 
            ?
            <button className="text-4xl text-offwhite opacity-90 transition-all hover:text-red-700 hover:opacity-100 ease-in-out" onClick={() => setShowForm(!showForm)}>Login</button>
            :
            <div className={`fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50 transition-all ${showForm ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <div className="bg-white p-8 rounded-lg shadow-lg">
                <button className="absolute top-0 right-0 p-4" onClick={() => setShowForm(false)}>Close</button>
                <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                    <input type="text" name="email" placeholder="Email" onChange={handleChange} />
                    <input type="text" name="password" placeholder="Password" onChange={handleChange} />
                    <input type="submit" value="Submit" className="bg-blue-500 text-white rounded-md py-2 cursor-pointer hover:bg-blue-600 transition-colors" />
                </form>
            </div>
        </div>
            }
        </>
    )
}