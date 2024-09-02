"use client";
import { useState } from "react";

// Define the TypeScript interface for a Todo item
interface Todo {
  id: number; // Unique identifier for each task, should be a number under 2 digits
  task: string; // The task description
}

export default function Home() {
  // Initialize state with a counter for the next ID
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, task: "Solve LeetCode" },
  ]);
  const [inputVal, setInput] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [nextId, setNextId] = useState<number>(2); // Start with ID 2

  // Function to add a new task to the list
  const addItem = () => {
    if (inputVal.trim()) {
      // Ensure input is not empty
      setTodos([
        ...todos,
        { id: nextId % 100, task: inputVal }, // Use modulo to keep ID under 2 digits
      ]);
      setInput(""); // Clear the input field after adding
      setNextId((prevId) => (prevId + 1) % 100); // Increment ID, reset to 0 after 99
    }
  };

  // Function to delete a task by its ID
  const deleteItem = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id)); // Remove task with the given ID
  };

  // Function to prepare a task for editing
  const editItem = (id: number) => {
    const taskToEdit = todos.find((todo) => todo.id === id); // Find the task to edit
    if (taskToEdit) {
      setInput(taskToEdit.task); // Set input value to the task's current value
      setEditMode(true); // Enable edit mode
      setEditId(id); // Set the ID of the task being edited
    }
  };

  // Function to save the edited task and exit edit mode
  const saveEdit = () => {
    if (inputVal.trim() && editId !== null) {
      // Ensure input is not empty
      setTodos(
        todos.map((todo) =>
          todo.id === editId ? { ...todo, task: inputVal } : todo
        ) // Update the task with the new value
      );
      setInput(""); // Clear the input field
      setEditMode(false); // Disable edit mode
      setEditId(null); // Clear the edit ID
    }
  };

  return (
    <div id="main" className="max-w-4xl mx-auto rounded-2xl p-5">
      <h1 className="text-center font-bold text-5xl flex p-5 shadow-white hover:text-zinc-100">
        TODO APPLICATION
      </h1>
      {/* Input field and button for adding/editing tasks */}
      <div className="flex flex-col md:flex-row justify-between items-center py-7">
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Write your task here"
          className="w-full md:w-[80%] rounded-2xl text-lg px-5 py-2 text-green-950 mb-4 md:mb-0"
        />
        <button
          className="bg-gray-900 text-white rounded-2xl ml-4 px-4 py-[1.5px] flex items-center hover:bg-zinc-200 hover:text-gray-950"
          onClick={editMode ? saveEdit : addItem} // Toggle between add and save actions
        >
          {editMode ? "Save" : "ADD TASK"}
        </button>
      </div>
      <h2 className="text-center text-[20px] text-slate-800 hover:text-zinc-100 mt-5 flex items-center justify-center">
        TASK LIST
      </h2>
      {/* List of tasks */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
        {todos.map((item) => (
          <div
            className="shadow rounded-3xl p-4 text-lg bg-gray-800 text-white hover:bg-gray-700"
            key={item.id}
          >
            <div className="flex justify-between">
              <span className="rounded-full shadow h-8 w-8 text-center bg-white text-gray-900">
                {item.id < 10 ? `0${item.id}` : item.id}{" "}
                {/* Format ID to be two digits */}
              </span>
              <span
                className="rounded-full shadow-red-400 h-8 w-8 cursor-pointer text-red-700 text-center"
                onClick={() => deleteItem(item.id)} // Handle task deletion
              >
                X
              </span>
            </div>
            {/* Display the task content */}
            <div className="mt-5 text-xl text-white hover:text-cyan-200">
              {item.task}
            </div>
            <div>
              <button
                className="text-right cursor-pointer text-sm text-blue-400 hover:text-blue-600"
                onClick={() => editItem(item.id)} // Handle task editing
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
