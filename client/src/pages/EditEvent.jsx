import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { fetchEventById, updateEvent } from "../api/events";
import { formatDate } from "../utils/formatDate";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
const EditEvent = () => {
    const { id } = useParams();
    const [updating, setUpdating] = useState(false);
    const [event, setEvent] = useState();
    const [formData, setFormData] = useState({
        event_id: "",
        title: "",
        category: "",
        location: "",
        date: "",
        capacity: "",
        description: "",
    });
    const navigate = useNavigate();
    const {token} = useAuth();
   

    useEffect(() => {
        const loadEvent = async () => {
            try {
                const event = await fetchEventById(id,token);
                setEvent(event)
            } catch (err) {
                console.log(err.message);
            }
        }
        loadEvent();
    }
        , [])
    useEffect(() => {
        if (event) {
            setFormData({
                event_id: event.event_id || "",
                title: event.title || "",
                category: event.category || "",
                location: event.location || "Online",
                date: formatDate(event.date) || "",
                capacity: event.capacity || "",
                description: event.description || "",
            });
        }
    }, [event]);



    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUpdating(true);
        const toastId = toast.loading("updating event...");

        try {
            const res = await updateEvent(formData,token);
            toast.update(toastId, {
                render:'Event Updated!',
                isLoading: false,
                type: "success",
                autoClose: 1500,
                hideProgressBar: true,
            });
            navigate('/event/'+id);
            
        } catch (err) {
            console.error(err.message);
            toast.update(toastId, {
                render: "Failed to add event",
                isLoading: false,
                type: "error",
                autoClose: 1500,
                hideProgressBar: true,
            });
        } finally {
            setUpdating(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 px-6">
            <div className="bg-white p-10 rounded-xl shadow-lg w-full max-w-5xl md:w-3/5">
                <h2 className="text-3xl font-bold text-center text-red-600 mb-8">
                    Update Event
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Event ID */}
                    <div>
                        <label htmlFor="event_id" className="block text-sm font-medium text-gray-700">
                            Event ID*
                        </label>
                        <input
                            type="text"
                            id="event_id"
                            name="event_id"
                            value={formData.event_id}
                            onChange={handleChange}
                            required
                            maxLength={20}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm"
                        />
                    </div>

                    {/* Title */}
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            maxLength={100}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm"
                        />
                    </div>

                    {/* Category */}
                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                            Category
                        </label>
                        <input
                            type="text"
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            maxLength={50}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm"
                        />
                    </div>

                    {/* Location */}
                    <div>
                        <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                            Location
                        </label>
                        <select
                            id="location"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm"
                            required
                        >
                            <option value="Online">Online</option>
                            <option value="In-person">In-person</option>
                        </select>
                    </div>

                    {/* Date */}
                    <div>
                        <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                            Date
                        </label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm"
                        />
                    </div>

                    {/* Capacity */}
                    <div>
                        <label htmlFor="capacity" className="block text-sm font-medium text-gray-700">
                            Capacity
                        </label>
                        <input
                            type="number"
                            id="capacity"
                            name="capacity"
                            value={formData.capacity}
                            onChange={handleChange}
                            min="1"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm"
                        />
                    </div>

                    {/*  Description */}
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="4"
                            maxLength={500}
                            placeholder="Enter a short description about the event..."
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm"
                        ></textarea>
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={updating}
                        className="w-full py-3 px-4 bg-red-600 text-white font-semibold rounded-md shadow hover:bg-red-700 transition"
                    >
                        {updating ? "Updating..." : "Update Event"}
                    </button>
                </form>
            </div>
        </div>
    );
};



export default EditEvent;
