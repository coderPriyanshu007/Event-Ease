import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getAttendees,removeAttendee } from "../api/events"; 
import { useAuth } from "../context/AuthContext";


const AttendeesList = ({ eventId }) => {
  
  const [attendees, setAttendees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState(null);
  const {token} = useAuth();

  useEffect(() => {
    const fetchAttendees = async () => {
      try {
        const data = await getAttendees(eventId,token);
        setAttendees(data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch attendees");
      } finally {
        setLoading(false);
      }
    };
    fetchAttendees();
  }, [eventId]);

  const handleRemove = async (attendeeId) => {
    const confirm = window.confirm("Are you sure you want to remove this attendee?");
    if (!confirm) return;

    setRemovingId(attendeeId);
    const toastId = toast.loading("Removing attendee...");
    try {
      await removeAttendee(attendeeId,token);
      setAttendees((prev) => prev.filter((a) => a.id !== attendeeId));
      toast.update(toastId, {
        render: "Attendee removed!",
        type: "success",
        isLoading: false,
        autoClose: 1500,
      });
    } catch (err) {
      console.error(err);
      toast.update(toastId, {
        render: "Failed to remove attendee",
        type: "error",
        isLoading: false,
        autoClose: 1500,
      });
    } finally {
      setRemovingId(null);
    }
  };

  if (loading) return <p className="text-center py-10">Loading attendees...</p>;
  if (!attendees.length) return <p className="text-center py-10">No attendees yet.</p>;

  return (
    <div className="overflow-x-auto p-6  bg-white mt-10">
    <h1 className="mb-4 text-4xl">List of Attendees</h1>
      <div className="grid grid-cols-5 gap-4 bg-gray-100 p-3 rounded-t-md font-semibold">
        <div>ID</div>
        <div>Name</div>
        <div>Email</div>
        <div>Seats</div>
        <div>Action</div>
      </div>
      {attendees.map((attendee) => (
        <div
          key={attendee.id}
          className="grid grid-cols-5 gap-4 items-center border-b p-3 hover:bg-gray-50"
        >
          <div>{attendee.id}</div>
          <div>{attendee.name}</div>
          <div>{attendee.email}</div>
          <div>{attendee.seats}</div>
          <div>
            <button
              onClick={() => handleRemove(attendee.id)}
              disabled={removingId === attendee.id}
              className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
            >
              {removingId === attendee.id ? "Removing..." : "Remove"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AttendeesList;
