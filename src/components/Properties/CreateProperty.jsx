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
        <div>
            {!showForm ? (
                <button onClick={() => setShowForm(true)} className="px-4 py-2 bg-blue-500 text-white rounded-md focus:outline-none hover:bg-blue-600">
                    Add New
                </button>
            ) : (
                <form onSubmit={handleSubmit} className="mt-4">
                    <input
                        type="text"
                        name="address"
                        placeholder="Address"
                        onChange={handleChange}
                        className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        required
                    />
                    <input
                        type="text"
                        name="parcelNumber"
                        placeholder="Parcel Number"
                        onChange={handleChange}
                        className="block w-full mt-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        required
                    />
                    <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        onChange={handleChange}
                        className="block w-full mt-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        required
                    />
                    <textarea
                        name="comments"
                        placeholder="Comments"
                        onChange={handleChange}
                        className="block w-full mt-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    ></textarea>
                    <div className="mt-2">
                        <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded-md focus:outline-none hover:bg-green-600">
                            Submit
                        </button>
                        <button onClick={() => setShowForm(false)} className="ml-2 px-4 py-2 bg-red-500 text-white rounded-md focus:outline-none hover:bg-red-600">
                            Cancel
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}
