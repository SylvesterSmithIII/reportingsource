import axios from "axios";

export default function PropertyCard({ id, address, parcelNumber, lastName, comments, user, owner, setReload }) {

    const handleDelete = async () => {
        await axios.delete(`/api/properties/${id}`)

        console.log("deleted")

        setReload(true)
    }

    return (
        <div className="w-96 bg-white shadow-lg rounded-lg p-4">
            <p className="text-lg font-semibold mb-2">{address}</p>
            <p className="text-gray-700 mb-2">Parcel Number: {parcelNumber}</p>
            <p className="text-gray-700 mb-2">Last Name: {lastName}</p>
            <p className="text-gray-700 mb-2">Comments: {comments}</p>
            <div className="border-t border-gray-200 py-2">
                <p className="text-sm font-semibold">Posted By:</p>
                <p className="text-gray-700">{user.name}</p>
                <p className="text-gray-700">{user.email}</p>
                <p className="text-gray-700">{user.company}</p>
            </div>
            {
                owner &&
                <div className="border-t border-gray-200 pt-4">
                    <p onClick={handleDelete} className="text-center cursor-pointer hover:text-red-700">Delete</p>
                </div>
            }
            
        </div>
    );
}
