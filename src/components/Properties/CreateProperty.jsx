'use client'

import { useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";

export default function CreateProperty({ setReload }) {
    const { data: session } = useSession();

    const [formData, setFormData] = useState({
        address: '',
        parcelNumber: '',
        lastName: '',
        comments: ''
    });
    const [showForm, setShowForm] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/create', {
                ...formData,
                postedBy: session.user._id
            });
            setReload(true)
            setShowForm(false);
        } catch (error) {
            console.error("Error creating property:", error);
        }
    };
    

    return (
        <div className="max-w-[800px] mx-4">
            {!showForm ? (
                <div className="flex justify-center items-center mb-12">
                    <button onClick={() => setShowForm(true)} className="px-4 py-2 bg-blue-500 text-white rounded-md focus:outline-none hover:bg-blue-600">
                    Add New
                    </button>
                </div>
                
            ) : (
                <form onSubmit={handleSubmit} className="w-full mt-4 flex flex-col bg-white p-6 rounded-md shadow-md mb-12">
                    <div className="flex justify-evenly">
                        <input
                            type="text"
                            name="address"
                            placeholder="Address"
                            onChange={handleChange}
                            className="block w-[45%] mt-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-500"
                            required
                        />
                        <input
                            type="text"
                            name="parcelNumber"
                            placeholder="Parcel Number"
                            onChange={handleChange}
                            className="block w-[45%] mt-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-500"
                            required
                        />
                    </div>
                    <div className="flex justify-center">
                        <input
                            type="text"
                            name="lastName"
                            placeholder="Last Name"
                            onChange={handleChange}
                            className="block w-[45%]  mt-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-500"
                            required
                        />
                    </div>
                    
                    <textarea
                        name="comments"
                        placeholder="Comments"
                        onChange={handleChange}
                        className="block mb-4 w-full mt-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-500"
                    ></textarea>
                    <div className="mt-2 border-t-2 pt-4 flex justify-center gap-20">
                        <button type="submit" className="px-4 py-2 bg-gray-500 text-white rounded-md focus:outline-none hover:bg-green-600">
                            Submit
                        </button>
                        <button onClick={() => setShowForm(false)} className="ml-2 px-4 py-2 bg-gray-500 text-white rounded-md focus:outline-none hover:bg-red-600">
                            Cancel
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}
