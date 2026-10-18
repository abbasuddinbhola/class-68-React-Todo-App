import { useState } from "react";

type Todo = {
    id: string | number,
    title: string,
    serialNumber: number,
    completed: boolean,
}

type todoList = Todo[];

type FilterType = "all" | "pending" | "completed";

export default function AddToCart() {

    const [text, setText] = useState("");
    const [todos, setTodos] = useState<todoList>([]);
    const [filter, setFilter] = useState<FilterType>("all");
     


    const completedCount = todos.filter(
        (item) => item.completed
    ).length;
    const pendingCount = todos.filter(
        (item) => !item.completed
    ).length;
    



    const handleClick = () => {
        if (text.trim() === "") return;

        
        const newObj = {
            id: crypto.randomUUID(),
            title: text,
            serialNumber: todos.length + 1,
            completed: false,
        }
        setTodos([
            ...todos,
            newObj
        ]);

        setText("");
    }

    const handleDelete = (id: string | number) => {
        const updateTodoAfterDelet = todos.filter((item) => {
            return item.id != id;
        })
        setTodos(updateTodoAfterDelet);
    }
    
  const handleToggle = (id: string | number) => {
  const updatedTodos = todos.map((item) =>
    item.id === id
      ? { ...item, completed: !item.completed }
      : item
  );

  setTodos(updatedTodos);
    };
    


    const filteredTodos = todos.filter((item) => {
        if (filter === "pending") return !item.completed;
        
        if (filter === "completed") return item.completed;
        return true;
    });

  return (
    <main className="relative min-h-screen overflow-hidden bg-linear-to-br from-violet-50 via-white to-indigo-100 px-4 py-5 sm:px-6 sm:py-16">
      {/* Background Decoration */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-purple-300/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-24 h-96 w-96 rounded-full bg-indigo-300/25 blur-3xl" />

      <div className="relative mx-auto max-w-3xl">
        {/* Header */}
        <header className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white/80 px-4 py-2 text-sm font-semibold text-violet-700 shadow-sm">
            <span>✦</span>
            Daily Productivity
          </div>

          <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Daily Task{" "}
            <span className="bg-linear-to-r from-violet-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Manager
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-slate-500 sm:text-base">
            Organize your tasks, stay focused, and make every day productive.
          </p>
        </header>

        {/* Statistics */}
        <section className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-white bg-white/90 p-5 shadow-lg shadow-blue-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Total Tasks
                </p>
                <h2 className="mt-2 text-3xl font-extrabold text-slate-800">
                  {todos.length}
                </h2>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-100 text-2xl">
                📝
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white bg-white/90 p-5 shadow-lg shadow-purple-300">
            <div className="flex items-center justify-between">
                          <div>
                              <p className="text-sm font-medium text-slate-500">Completed</p>
                              <h2 className="mt-2 text-3xl font-extrabold text-emerald-600">{completedCount}</h2>
                          </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-2xl">
                ✓
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white bg-white/90 p-5 shadow-lg shadow-green-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">Pending</p>
                              <h2 className="mt-2 text-3xl font-extrabold text-amber-600">
                                  {pendingCount}
                              </h2>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-2xl">
                ⏳
              </div>
            </div>
          </div>
        </section>

        {/* Main Card */}
        <section className="rounded-3xl border border-white bg-white/90 p-5 shadow-2xl shadow-violet-200/40 backdrop-blur-xl sm:p-8">
              
          <div className="">
       <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <input value={text} onChange={(event) => setText(event.target.value)} type="text" placeholder="Enter your task here..." className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-100"/>

              <button onClick={handleClick} type="button" className="rounded-xl bg-linear-to-r from-violet-600 to-indigo-600 px-6 py-3 font-semibold text-white shadow-lg shadow-violet-200 transition hover:-translate-y-0.5 hover:shadow-xl active:scale-95">
                <span className="mr-2">+</span> Add Task</button>
            </div>
                  </div>

          {/* Task List Header */}
          <div className="mt-9 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold text-slate-800">My Tasks</h2>
              <p className="mt-1 text-sm text-slate-500">
                Your daily activity overview
              </p>
            </div>

            <span className="rounded-full bg-violet-100 px-4 py-2 text-sm font-bold text-violet-700">
              {todos.length} Tasks
            </span>
          </div>

                  {/* Filter Buttons */}
                  <div className="mt-5 flex flex-wrap gap-2">
                      {(["all", "pending", "completed"] as const).map((type) => (
                          <button key={type} type="button" onClick={() => setFilter(type)} className={`rounded-lg px-4 py-2 text-sm font-medium capitalize transition
                           ${filter === type ? "bg-violet-600 text-white shadow-sm" : "bg-slate-100 text-slate-600 hover:bg-violet-50 hover:text-violet-700"}`}>
                              {type === "all" ? "All Tasks" : type === "pending" ? "Active" : "Completed"}
                          </button>))}
                  </div>

                  {/* Scrollable Task List */}
                  <div className="mt-5 max-h-87.5 space-y-3 overflow-y-auto pr-2">
                      {filteredTodos.map((item) => (
                          <div key={item.id} className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4">
                            
                              <button onClick={() => handleToggle(item.id)}
                                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-sm font-bold transition ${item.completed ? "border-emerald-500 bg-emerald-500 text-white"
                                      : "border-slate-300 bg-white text-transparent hover:border-emerald-500"}`}
                                  aria-label={item.completed ? "Mark as pending" : "Mark as completed"}> ✓</button>
                              <div className="min-w-0 flex-1">
                                  <p className={`font-medium ${item.completed ? "text-slate-400 line-through" : "text-slate-800"}`}>
                                      {item.title}</p>
                                  <p className={`mt-1 text-xs ${item.completed ? "text-emerald-600" : "text-amber-600"}`}>
                                      {item.completed ? "Completed" : "Pending"}</p>
                              </div>
                              <button onClick={() => handleDelete(item.id)} className="rounded-lg bg-red-500 px-3 py-2 text-sm font-medium text-white transition hover:bg-red-700">Delete</button>
                          </div>
                      ))}
                  </div>
    
          
                  {/* Empty State */}
                  {filteredTodos.length === 0 && (
                      <div className="mt-5 rounded-2xl border-2 border-dashed border-slate-200 px-4 py-10 text-center">
                          <div className="text-4xl">📋</div>
                          <h3 className="mt-3 font-bold text-slate-700"> No tasks found </h3>
                          <p className="mt-1 text-sm text-slate-500">
                              {todos.length === 0 ? "Add a new task to get started." : "Try another filter to find your tasks."}</p>
                      </div>
                  )}


          {/* Bottom Actions */}
          <div className="mt-6 flex flex-col justify-between gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:items-center">
            <p className="text-sm text-slate-500">
              Keep going! Small steps matter. ✨
            </p>

                      <button onClick={() => setTodos([])} type="button" className="rounded-xl border border-red-200 px-4 py-2.5 
                      text-sm font-semibold bg-purple-500 text-white transition hover:bg-purple-700 active:scale-95">Clear All Tasks
                      </button>
                  </div>
              </section>
      </div>
    </main>
  );
}
