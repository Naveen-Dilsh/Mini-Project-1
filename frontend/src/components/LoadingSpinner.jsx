import React from "react";
import { Hourglass } from "lucide-react";

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <Hourglass className="text-blue-500 animate-bounce" size={48} />
      <p className="mt-4 text-lg text-gray-700">Loading...</p>
    </div>
  );
};

export default LoadingSpinner;