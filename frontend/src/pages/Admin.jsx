import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminPage = () => {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  
  const isAdmin = localStorage.getItem("admin");

  useEffect(() => {
    if (isAdmin === "true") {
      fetchEvents();
    }
  }, [isAdmin]);

  
  const fetchEvents = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/auth/getallevents");
      if (Array.isArray(response.data)) {
        setEvents(response.data);
      } else {
        setMessage("Error loading events");
        setEvents([]);
      }
    } catch (error) {
      setMessage("Failed to load events");
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  
  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  
  const handleAddEvent = async () => {
    if (!selectedDate) {
      setMessage("Please select a date");
      clearMessageAfterDelay();
      return;
    }
    try {
      const response = await axios.post("http://localhost:5000/api/auth/setevents", {
        date: selectedDate,
      });
      setMessage(response.data.message);
      setSelectedDate("");
      fetchEvents();
      clearMessageAfterDelay();
    } catch (error) {
      const msg =
        error.response?.data?.message || "Failed to add event";
      setMessage(msg);
      clearMessageAfterDelay();
    }
  };

  
  const handleDeleteEvent = async (date) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/auth/deleteevents/`,{date}
      );
      setMessage(response.data.message);
      fetchEvents();
      clearMessageAfterDelay();
    } catch (error) {
      const msg =
        error.response?.data?.message || "Failed to delete event";
      setMessage(msg);
      clearMessageAfterDelay();
    }
  };

  
  const clearMessageAfterDelay = () => {
    setTimeout(() => setMessage(""), 3000);
  };

  if (isAdmin !== "true") {
    return (
      <div className="text-center text-red-600 mt-10 text-3xl font-semibold">
        404 Page Not Found
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 border border-gray-300 rounded-md shadow-md mt-10 bg-white">
      <h1 className="text-3xl font-bold text-center mb-6">Admin Event Management</h1>

      {message && (
        <div
          className={`mb-4 p-3 rounded-md ${
            message.toLowerCase().includes("success")
              ? "bg-green-100 text-green-700 border border-green-200"
              : "bg-red-100 text-red-700 border border-red-200"
          }`}
        >
          {message}
        </div>
      )}

      <div className="flex mb-6">
        <input
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Select event date"
        />
        <button
          onClick={handleAddEvent}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Add event"
        >
          Add
        </button>
      </div>

      {loading ? (
        <p className="text-gray-500 text-center">Loading events...</p>
      ) : events.length === 0 ? (
        <p className="text-gray-500 text-center">No events found.</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {events.map((event) => {
            const eventDate = new Date(event.dateofevent);
            const dateStr = eventDate.toISOString().split("T")[0]; 
            return (
              <li
                key={dateStr}
                className="flex justify-between items-center py-3"
              >
                <span>{eventDate.toLocaleDateString()}</span>
                <button
                  onClick={() => handleDeleteEvent(dateStr)}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                  aria-label={`Delete event on ${dateStr}`}
                >
                  Delete
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default AdminPage;
