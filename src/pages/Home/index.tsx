import React from "react";
import Timer from "../../components/Timer/Timer";
import TodoList from "../../components/ToDoList/index.jsx";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white px-4">
      <div className="w-full max-w-md">
        <Timer />
        <TodoList />
      </div>
    </div>
  );
}
