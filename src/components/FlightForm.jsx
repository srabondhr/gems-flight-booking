import React, { useState, useEffect } from "react";
import { getAirports, searchFlights } from "../utils/api";
import FlightList from "./FlightList";
import {
  MapPinIcon,
  CalendarDaysIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

const FlightForm = () => {
  const [airports, setAirports] = useState([]);
  const [form, setForm] = useState({
    from: "",
    to: "",
    date: "",
    returnDate: "",
    passengers: 1,
  });
  const [errors, setErrors] = useState({});
  const [flights, setFlights] = useState([]);
  const [apiError, setApiError] = useState("");

  useEffect(() => {
    getAirports()
      .then(setAirports)
      .catch(() => setApiError("Failed to fetch airport list."));
  }, []);

  const validate = () => {
    const err = {};
    if (!form.from) err.from = "Departure is required";
    if (!form.to) err.to = "Destination is required";
    if (form.from === form.to) err.same = "From and To cannot be the same";
    if (!form.date) err.date = "Departure date is required";
    if (form.returnDate && form.returnDate < form.date)
      err.returnDate = "Return date cannot be before departure";
    if (form.passengers < 1) err.passengers = "At least 1 passenger required";
    return err;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    if (Object.keys(err).length > 0) {
      setErrors(err);
      return;
    }

    setErrors({});
    setApiError("");
    setFlights([]);

    try {
      const result = await searchFlights(form);
      setFlights(result.length > 0 ? result : []);
    } catch (error) {
      setApiError("Something went wrong while searching flights.");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 sm:p-10 bg-white shadow-xl rounded-2xl border border-gray-100">
      <form onSubmit={handleSubmit} className="space-y-4">

        {/* FROM & TO */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {["from", "to"].map((field) => (
            <div key={field}>
              <label className="block mb-1 font-medium capitalize">{field}</label>
              <div className="flex items-center border border-gray-300 rounded-md p-3">
                <MapPinIcon className="w-5 h-5 text-gray-400 mr-2" />
                <select
                  name={field}
                  value={form[field]}
                  onChange={handleChange}
                  className="w-full bg-transparent outline-none"
                >
                  <option value="">Select Airport</option>
                  {airports.map((a) => (
                    <option key={a.code} value={a.code}>
                      {a.city} ({a.code})
                    </option>
                  ))}
                </select>
              </div>
              {errors[field] && (
                <p className="text-red-500 text-sm">{errors[field]}</p>
              )}
            </div>
          ))}
        </div>
        {errors.same && <p className="text-red-500 text-sm">{errors.same}</p>}

        {/* DATES */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { name: "date", label: "Departure Date" },
            { name: "returnDate", label: "Return Date" },
          ].map(({ name, label }) => (
            <div key={name}>
              <label className="block mb-1 font-medium">{label}</label>
              <div className="flex items-center border border-gray-300 rounded-md p-3">
                <CalendarDaysIcon className="w-5 h-5 text-gray-400 mr-2" />
                <input
                  type="date"
                  name={name}
                  value={form[name]}
                  onChange={handleChange}
                  className="w-full bg-transparent outline-none"
                />
              </div>
              {errors[name] && (
                <p className="text-red-500 text-sm">{errors[name]}</p>
              )}
            </div>
          ))}
        </div>

        {/* PASSENGERS */}
        <div>
          <label className="block mb-1 font-medium">Passengers</label>
          <div className="flex items-center border border-gray-300 rounded-md p-3">
            <UserIcon className="w-5 h-5 text-gray-400 mr-2" />
            <input
              type="number"
              name="passengers"
              min="1"
              value={form.passengers}
              onChange={handleChange}
              className="w-full bg-transparent outline-none"
            />
          </div>
          {errors.passengers && (
            <p className="text-red-500 text-sm">{errors.passengers}</p>
          )}
        </div>

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-full transition"
        >
          Search Flights
        </button>

        {/* API Error */}
        {apiError && (
          <p className="text-red-600 text-sm text-center">{apiError}</p>
        )}
      </form>

      {/* FLIGHT RESULTS */}
      <FlightList flights={flights} />
    </div>
  );
};

export default FlightForm;
