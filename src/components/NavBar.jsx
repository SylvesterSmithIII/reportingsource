'use client'

import { useSession } from "next-auth/react"
import { signOut } from "next-auth/react"
import Link from "next/link"

export default function NavBar() {
    const { data: session } = useSession()

    return (
        <nav className=" mt-2 flex border-b-black border-b-2 mx-8 justify-between">
            <h1 className="text-xl font-bold"><Link href='/'>The Reporting Source</Link></h1>

            { session?.user?.mod && <Link href='/admin'>Admin Page</Link> }

            { session && <><Link href='/home'>Properties Page</Link></> }

            

            { session && <button className="text-gray-600 hover:text-red-700 transition-all duration-300 ease-in-out" onClick={signOut}>Sign Out</button> }

        </nav>
    )
}