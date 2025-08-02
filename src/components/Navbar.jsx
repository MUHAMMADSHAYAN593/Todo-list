import React from 'react'

function Navbar() {
  return (
    <nav className="bg-violet-900 text-white px-6 py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">📝 Todo List</h1>
        <span className="text-sm">Built with React + Tailwind CSS</span>
      </div>
    </nav>
  )
}

export default Navbar
