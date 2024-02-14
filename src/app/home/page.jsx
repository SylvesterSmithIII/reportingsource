'use client'

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import PropertiesPage from "./PropetiesPage";
import { signOut } from "next-auth/react";

export default function Home() {
    const { data: session } = useSession();
    const accepted = session?.user?.accepted;

    useEffect(() => {
        if (!session) redirect('/');
    }, []);

    return (
        <>
            {
                accepted === "waitlisted" ?
                    <div className="w-full h-full flex flex-col justify-center items-center bg-gray-200">
                        <h1 className="text-center text-3xl mb-4">Please wait to be accepted...</h1>
                        <button onClick={signOut} className="px-4 py-2 bg-red-500 text-white rounded-md">Sign Out</button>
                    </div>
                    :
                    accepted === "denied" ?
                        <div className="w-full h-full flex flex-col justify-center items-center bg-gray-200">
                            <h1 className="text-center text-3xl mb-4">You were denied</h1>
                            <button onClick={signOut} className="px-4 py-2 bg-red-500 text-white rounded-md">Sign Out</button>
                        </div>
                        :
                        <PropertiesPage />
            }
        </>
    );
}
