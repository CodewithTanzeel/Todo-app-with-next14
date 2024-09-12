import { prisma } from "./db";
import { revalidatePath } from "next/cache";

async function getData() {
  const data = await prisma.todo.findMany({
    select: {
      title: true,
      id: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return data;
}

async function create(data: FormData) {
  "use server";
  const title = data.get("input")?.valueOf();
  if (typeof title !== "string" || title.length === 0) {
    throw new Error("Invalid Title");
  }
  await prisma.todo.create({ data: { title: title } });
  revalidatePath("/");
}

async function deleteItem(data: FormData) {
  "use server";
  const inputId = data.get("inputId")?.valueOf();
  if (typeof inputId !== "string" || inputId.length === 0) {
    throw new Error("Invalid Id");
  }
  await prisma.todo.delete({ where: { id: inputId } });
  revalidatePath("/");
}

export default async function Home() {
  const data = await getData();
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 p-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="px-8 pt-8 pb-6">
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-6">
            Awesome Todo List
          </h1>
          <form action={create} className="mb-6 flex gap-2">
            <input
              type="text"
              name="input"
              className="flex-grow rounded-full border-2 border-purple-300 px-4 py-2 text-purple-900 placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition duration-300 ease-in-out"
              placeholder="Add a new task..."
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-purple-400 to-pink-500 text-white font-bold py-2 px-6 rounded-full hover:from-purple-500 hover:to-pink-600 transition duration-300 ease-in-out transform hover:scale-105"
            >
              Add
            </button>
          </form>
        </div>
        <ul className="divide-y divide-purple-100">
          {data.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center gap-4 px-8 py-4 hover:bg-purple-50 transition duration-300 ease-in-out"
            >
              <span className="flex-grow text-purple-900 font-medium">
                {todo.title}
              </span>
              <form action={deleteItem}>
                <input type="hidden" name="inputId" value={todo.id} />
                <button className="text-pink-500 hover:text-pink-700 transition duration-300 ease-in-out transform hover:scale-110">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </form>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
