import React from "react";

const FlightList = ({ flights }) => {
  if (!flights) return null;
  if (flights.length === 0) {
    return (
      <div className="mt-6 text-center text-gray-500">
        No flights found.
      </div>
    );
  }

  return (
    <div className="mt-6 space-y-4">
      <h2 className="text-lg font-semibold text-gray-700">Available Flights</h2>
      <ul className="space-y-2">
        {flights.map((flight, index) => (
          <li key={index} className="p-4 border rounded-lg bg-gray-50 shadow-sm">
            <p><strong>From:</strong> {flight.from}</p>
            <p><strong>To:</strong> {flight.to}</p>
            <p><strong>Date:</strong> {flight.date}</p>
            <p><strong>Passengers:</strong> {flight.passengers}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FlightList;
