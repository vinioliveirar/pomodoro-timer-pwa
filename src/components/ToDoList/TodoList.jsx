import { useState } from "react";
import { CirclePlus, Trash2 } from "lucide-react";

export default function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");

  const addTask = (e) => {
    e.preventDefault();
    if (!task.trim()) return;
    setTasks([...tasks, { text: task, completed: false }]);
    setTask("");
  };

  const toggleTask = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  const removeTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <div className="p-4 bg-gray-800 text-white rounded-xl">
      <h2 className="text-xl font-bold mb-2">Lista de Tarefas</h2>
      <form onSubmit={addTask} className="flex gap-2">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Adicionar uma nova tarefa"
          className="p-2 rounded bg-gray-700 text-white flex-1 focus:outline-none"
        />
        <button
          type="submit"
          className="bg-blue-500 px-4 py-2 rounded cursor-pointer"
        >
          <CirclePlus />
        </button>
      </form>
      <ul className="mt-4 space-y-2">
        {tasks.map((t, index) => (
          <li
            key={index}
            className={`flex justify-between items-center p-2 rounded ${t.completed ? "line-through text-gray-400" : ""}`}
          >
            <span
              onClick={() => toggleTask(index)}
              className="cursor-pointer flex-1"
            >
              {t.text}
            </span>
            <button
              onClick={() => removeTask(index)}
              className="bg-red-500 px-2 py-1 rounded cursor-pointer"
            >
              <Trash2 />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
