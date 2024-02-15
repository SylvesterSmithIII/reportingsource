'use client'

import { useState } from "react"
import { signIn } from "next-auth/react"
import axios from "axios"

export default function SignUp() {
    const [showForm, setShowForm] = useState(false)

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        password: '',
        confirm: ''
    })

    const [authCode, setAuthCode] = useState(null)

    const [userAuthCode, setUserAuthCode] = useState(null)

    const handleChange = (e) => {

        const { name, value } = e.target

        if (!authCode) {
            
            setFormData({
                ...formData,
                [name]: value
            })
        } else {
            setUserAuthCode(Number(value))
        }

    }

    const handleSubmit = async (e) => {
        e.preventDefault()


        if (!authCode) {
            const code = Math.floor(Math.random() * 900000) + 100000

            setAuthCode(code)

            await axios.post('/api/2fa', {
                email: formData.email,
                authCode: code
            })

        } else {

            if (authCode === userAuthCode) {
                const user = await axios.post('/api/signup', formData)

                await signIn("credentials", { 
                    ...user.data,
                    callbackUrl: '/home' 
                })
            }
        }
    }

    return (
        <>
            {!showForm ?
                <button className="text-4xl text-offwhite opacity-90 transition-all hover:text-red-700 hover:opacity-100 ease-in-out" onClick={() => setShowForm(!showForm)}>Sign Up</button>
                :
                <div className={`fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50 transition-all ${showForm ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                    <div className="bg-white p-8 rounded-lg shadow-lg">
                        <button className="absolute top-0 right-0 p-4" onClick={() => setShowForm(false)}>Close</button>
                        {!authCode ?
                            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                                <input type="text" name="name" placeholder="Name" onChange={handleChange} />
                                <input type="text" name="email" placeholder="Email" onChange={handleChange} />
                                <input type="text" name="company" placeholder="Company" onChange={handleChange} />
                                <input type="text" name="password" placeholder="Password" onChange={handleChange} />
                                <input type="text" name="confirm" placeholder="Confirm Password" onChange={handleChange} />
                                <input type="submit" value="Submit" />
                            </form>
                            :
                            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                                <input type="number" name="userAuthCode" placeholder="Enter 2FA Code" onChange={handleChange} />
                                <input type="submit" value="Submit" className="bg-blue-500 text-white rounded-md py-2 cursor-pointer hover:bg-blue-600 transition-colors" />
                            </form>
                        }
                    </div>
                </div>
            }
        </>
    )
}