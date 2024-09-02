"use client";
import { useState } from "react";

// Define the TypeScript interface for a Todo item
interface Todo {
  id: number;  // Unique identifier for each task, should be a number under 2 digits
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
    if (inputVal.trim()) { // Ensure input is not empty
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
    if (inputVal.trim() && editId !== null) { // Ensure input is not empty
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
    <div className="max-w-4xl mx-auto rounded-2xl p-5">
      <h1 className="text-center font-bold text-4xl flex p-5">
        TODO APPLICATION
      </h1>
      {/* Input field and button for adding/editing tasks */}
      <div className="flex justify-between py-10">
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Write your task here"
          className="w-[80%] rounded-2xl text-lg px-5 text-green-950"
        />
        <button
          className="bg-green-950 text-white rounded-2xl p-3"
          onClick={editMode ? saveEdit : addItem} // Toggle between add and save actions
        >
          {editMode ? "Save" : "ADD TASK"}
        </button>
      </div>
      <h1 className="text-center text-[40px] underline mt-5 flex items-center">
        TASK LIST
      </h1>
      {/* List of tasks */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        {todos.map((item) => (
          <div className="shadow p-4 text-lg" key={item.id}>
            <div className="flex justify-between">
              <span className="rounded-full shadow h-8 w-8 text-center">
                {item.id < 10 ? `0${item.id}` : item.id} {/* Format ID to be two digits */}
              </span>
              <span
                className="rounded-full shadow h-8 w-8 cursor-pointer text-red-700 text-center"
                onClick={() => deleteItem(item.id)} // Handle task deletion
              >
                X
              </span>
            </div>
            {/* Display the task content */}
            <div className="mt-5 text-30px text-gray-600">{item.task}</div>
            <div>
              <button
                className="text-right cursor-pointer"
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
