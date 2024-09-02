import Image from "next/image";

export default function Home() {
  return (
    // Main div
    <div className="max-w-4xl  mx-auto  rounded-2xl p-5 ">
      <h1 className="text-center bold text-4xl justify-center flex p-5">
        TODO APPLICATION
      </h1>
      {/* INPUT */}
      <div className="flex justify-between py-10">
        <input
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
        <div>
          <div>
            <span>
              1

            </span>
            <span>X</span>
          </div>
          {/* Task Content */}
          <div>TasK Titless</div>
        </div>

      
        <div className="bg-blue-700">09</div>
      </div>
    </div>
  );
}
