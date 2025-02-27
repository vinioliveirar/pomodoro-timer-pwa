import React from "react";
import Timer from "../../components/Timer/Timer";

export default function Home() {
  return (
    <div className="flex items-center flex-col justify-center h-screen bg-gray-900 text-white">
      <h1 className="text-4xl font-bold">
        Pomodoro Timer
      </h1>
      <Timer />
    </div>
  );
}
