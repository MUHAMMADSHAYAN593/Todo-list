import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid'

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])

  // Load from localStorage on mount
  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos")) || []
    setTodos(savedTodos)
  }, [])

  // Save to localStorage
  const saveLTS = (todos) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  // Handle adding new todo
  const handleAdd = () => {
    if (todo.trim() === "") return alert("Please enter a todo before adding.")
    const newTodos = [...todos, { id: uuidv4(), todo, isCompleted: false }]
    setTodos(newTodos)
    saveLTS(newTodos)
    setTodo("")
  }

  // Handle deletion
  const handleDelete = (id) => {
    const newTodos = todos.filter(item => item.id !== id)
    setTodos(newTodos)
    saveLTS(newTodos)
  }

  // Handle edit
  const handleEdit = (id) => {
    const itemToEdit = todos.find(item => item.id === id)
    setTodo(itemToEdit.todo)
    const remainingTodos = todos.filter(item => item.id !== id)
    setTodos(remainingTodos)
    saveLTS(remainingTodos)
  }

  // Handle checkbox toggle
  const handleCheckBox = (e) => {
    const id = e.target.name
    const updatedTodos = todos.map(item =>
      item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
    )
    setTodos(updatedTodos)
    saveLTS(updatedTodos)
  }

  // Handle input change
  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const pendingTodos = todos.filter(item => !item.isCompleted)
  const completedTodos = todos.filter(item => item.isCompleted)

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="max-w-2xl mx-auto bg-violet-100 p-6 rounded-2xl shadow-xl">
          <h2 className="text-2xl font-bold mb-4 text-center text-violet-900">Add a Todo</h2>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <input
              onChange={handleChange}
              value={todo}
              className="p-3 rounded-md border border-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-500 flex-grow"
              type="text"
              placeholder="Enter your task..."
            />
            <button
              onClick={handleAdd}
              className="bg-violet-800 hover:bg-violet-950 text-white px-6 py-2 rounded-md transition"
            >
              Add
            </button>
          </div>

          {/* Pending Tasks */}
          <h3 className="text-lg font-semibold text-violet-800 mb-2">Pending Tasks</h3>
          {pendingTodos.length === 0 ? (
            <div className="text-gray-500 mb-4">No pending tasks.</div>
          ) : (
            pendingTodos.map(item => (
              <div key={item.id} className="flex flex-col sm:flex-row items-center justify-between bg-white p-4 mb-3 rounded-lg shadow">
                <div className="flex items-center gap-2">
                  <input
                    name={item.id}
                    onChange={handleCheckBox}
                    type="checkbox"
                    checked={item.isCompleted}
                  />
                  <span className="text-lg">{item.todo}</span>
                </div>
                <div className="mt-2 sm:mt-0 flex gap-2">
                  <button
                    onClick={() => handleEdit(item.id)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1 rounded-md"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded-md"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}

          {/* Completed Tasks */}
          <h3 className="text-lg font-semibold text-violet-800 mt-6 mb-2">Completed Tasks</h3>
          {completedTodos.length === 0 ? (
            <div className="text-gray-500">No completed tasks yet.</div>
          ) : (
            completedTodos.map(item => (
              <div key={item.id} className="flex flex-col sm:flex-row items-center justify-between bg-green-100 p-4 mb-3 rounded-lg shadow">
                <div className="flex items-center gap-2">
                  <input
                    name={item.id}
                    onChange={handleCheckBox}
                    type="checkbox"
                    checked={item.isCompleted}
                  />
                  <span className="line-through text-lg text-gray-600">{item.todo}</span>
                </div>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded-md mt-2 sm:mt-0"
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  )
}

export default App
