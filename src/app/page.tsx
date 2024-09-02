"use client";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  // Defining State

  const [todos, setTodos] = useState([{ task: "Solve LeetCode" }]);
  const [inputVal, setInput] = useState("");
  // console.log("inputva",inputVal)
  return (
    // Main div
    <div className="max-w-4xl  mx-auto  rounded-2xl p-5 ">
      <h1 className="text-center bold text-4xl justify-center flex p-5">
        TODO APPLICATION
      </h1>
      {/* INPUT */}
      <div className="flex justify-between py-10">
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInput(e.target.value)}
          
          placeholder="Write your task here"
          className=" w-[80%] rounded-2xl text-lg px-5 text-green-950"
        />

        <button className="bg-green-950 text-white rounded-2xl p-3">
          ADD TASK
        </button>
        {/* INPUT End */}
        {/* TASK LIST */}
      </div>
      <h1 className="text-center text-[40px] underline mt-5 justify-center flex items-center">
        TASK LIST
      </h1>
      {/* COLOUMNS */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        {/* Grid Items */}
        {todos.map((item: any, i: any) => {
          return (
            <div className="shadow p-4 text-lg" key={i}>
              <div className="flex justify-between ">
                <span className="rounded-full shadow h-8 w-8   text-center  ">
                  1
                </span>
                <span className="rounded-full shadow h-8 w-8 cursor-pointer text-red-700  text-center ">
                  X
                </span>
              </div>
              {/* Task Content */}
              <div className="mt-5 text-30px text-gray-600">{item.task}</div>
              <div>
                <button className="text-right cursor-pointer">Delete</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
