import React from "react";
import Timer from "../../components/Timer/Timer";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white px-4">
      <h1 className="text-4xl font-bold mb-6">Pomodoro Timer</h1>
      
      <div className="w-full max-w-md">
        <Timer />
      </div>
    </div>
  );
}
