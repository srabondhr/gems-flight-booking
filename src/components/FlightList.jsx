import React from "react";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import { CalendarDaysIcon, UserIcon } from "@heroicons/react/24/outline";

const mockAirlines = ["JetAir", "SkyWing", "FlyNow", "AeroBee", "Nimbus"];

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
    <div className="mt-8 space-y-6">
      <h2 className="text-xl font-semibold text-gray-700">Available Flights</h2>
      {flights.map((flight, index) => {
        const airline = mockAirlines[index % mockAirlines.length];
        const price = 150 + Math.floor(Math.random() * 200); // $150–$350
        const duration = ["2h 15m", "3h 40m", "1h 55m", "4h 10m"][index % 4];

        return (
          <div
            key={index}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center border border-gray-200 p-4 rounded-xl bg-gray-50 shadow-sm hover:shadow-md transition"
          >
            {/* Route Info */}
            <div className="flex items-center gap-2 text-lg font-medium text-gray-800">
              <span>{flight.from}</span>
              <ArrowRightIcon className="w-5 h-5 text-blue-500" />
              <span>{flight.to}</span>
            </div>

            {}
            <div className="flex flex-wrap gap-4 mt-3 sm:mt-0 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <CalendarDaysIcon className="w-4 h-4 text-gray-400" />
                {flight.date}
              </div>
              <div className="flex items-center gap-1">
                <UserIcon className="w-4 h-4 text-gray-400" />
                {flight.passengers || 1} Passenger{flight.passengers > 1 ? "s" : ""}
              </div>
              <div className="flex items-center gap-1">
                ✈️ Airline: <strong className="ml-1 text-gray-700">{airline}</strong>
              </div>
              <div className="flex items-center gap-1">
                🕓 Duration: <span className="ml-1">{duration}</span>
              </div>
              <div className="flex items-center gap-1">
                💵 Price: <span className="text-blue-600 font-bold">${price}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FlightList;
