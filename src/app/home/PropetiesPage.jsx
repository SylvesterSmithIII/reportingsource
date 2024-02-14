'use client'

import { useEffect, useState } from "react";
import axios from "axios";
import PropertyCard from "./PropertyCard";
import CreateProperty from "@/components/Properties/CreateProperty";
import { useSession } from "next-auth/react";

export default function PropertiesPage() {
    const [properties, setProperties] = useState([]);
    const [filteredProperties, setFilteredProperties] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [reload, setReload] = useState(false);

    const { data: session } = useSession()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/properties');
                setProperties(response.data);
                setFilteredProperties(response.data);
            } catch (error) {
                console.error("Error fetching properties:", error);
            }
        };

        fetchData();
    }, [reload]);

    const handleSearch = () => {
        if (searchTerm.trim() === "") return setFilteredProperties(properties)
        const filtered = properties.filter(property =>
            property.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
            property.parcelNumber.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredProperties(filtered);
    };
    

    return (
        <div className="my-12">
            <CreateProperty setReload={setReload} />
            <div className="px-4 max-w-[800px] mx-auto flex mb-8">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by address or parcel number..."
                    className="px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-gray-600"
                />
                <button
                    onClick={handleSearch}
                    className="ml-4 px-4 py-2 bg-gray-500 text-white rounded-md focus:outline-none hover:bg-gray-600 "
                >
                    Search
                </button>
            </div>
            
            <div className="flex flex-wrap p-4 gap-4 justify-center mt-4">
                {filteredProperties.map((property, idx) => (
                    <PropertyCard
                        key={property._id}
                        id={property._id}
                        address={property.address}
                        parcelNumber={property.parcelNumber}
                        lastName={property.lastName}
                        comments={property.comments}
                        user={property.postedBy}
                        owner={property.postedBy._id === session.user._id || session.user.mod === true}
                        setReload={setReload}
                    />
                ))}
            </div>
        </div>
    );
}
