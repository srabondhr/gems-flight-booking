import React from "react";
import FlightForm from "./components/FlightForm";

function App() {
  return (
<div className="min-h-screen bg-gradient-to-br from-blue-50 to-white px-4 py-6 sm:px-8 sm:py-12">
      <h1 className="text-2xl sm:text-3xl font-bold text-center text-blue-800 mb-6">
        GEMS Flight Booking
      </h1>
      <FlightForm />
      <footer className="mt-10 text-center text-gray-500 text-sm">
      © 2025 GEMS Frontend Task. Designed with 💙
      </footer>

    </div>
  );
}

export default App;
