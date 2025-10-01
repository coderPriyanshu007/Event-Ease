import { useState } from "react";
import { toast } from "react-toastify";
import { submitEvent } from "../api/events";


const CreateEvent = () => {

  const [adding, setAdding] = useState(false);

  const [formData, setFormData] = useState({
    event_id: generateEventId(),
    title: "",
    category: "",
    location: "Online",
    date: "",
    capacity: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAdding(true);
    const toastId = toast.loading("Adding event...");

    try {
      const res = await submitEvent(formData); 
      toast.update(toastId, {
        render: res.message || "Event created!",
        isLoading: false,
        type: "success",
        autoClose: 1500,
        hideProgressBar: true,
      });
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
      setAdding(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-6">
      <div className="bg-white p-10 rounded-xl shadow-lg w-full max-w-5xl md:w-3/5">
        <h2 className="text-3xl font-bold text-center text-red-600 mb-8">
          Create New Event
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
            disabled={adding}
            className="w-full py-3 px-4 bg-red-600 text-white font-semibold rounded-md shadow hover:bg-red-700 transition"
          >
            {adding ? "Creating..." : "Create Event"}
          </button>
        </form>
      </div>
    </div>
  );
};

const generateEventId = () => {
  const months = [
    "JAN","FEB","MAR","APR","MAY","JUN",
    "JUL","AUG","SEP","OCT","NOV","DEC"
  ];
  const now = new Date();
  const month = months[now.getMonth()];
  const year = now.getFullYear();
  const randomStr = Math.random().toString(36).substring(2, 5).toUpperCase();
  return `EVT-${month}${year}-${randomStr}`;
};

export default CreateEvent;
