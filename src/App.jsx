import { useState } from 'react'
import Hero from './components/Hero'
import TaskInput from './components/TaskInput'
import Dashboard from './components/Dashboard'

function App() {
  const [adding, setAdding] = useState(false)
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const addTask = async (payload) => {
    setAdding(true)
    try {
      const res = await fetch(`${baseUrl}/api/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error('Failed to add task')
    } finally {
      setAdding(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        <Hero />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            <TaskInput onAdd={addTask} />
            <Dashboard />
          </div>
          <aside className="space-y-4">
            <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
              <h3 className="font-semibold text-gray-900">Energy-aware tips</h3>
              <p className="text-sm text-gray-600 mt-1">Add tasks by typing or holding the voice button. Your list will auto-sort by energy and urgency.</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
              <h3 className="font-semibold text-gray-900">What’s coming next</h3>
              <ul className="mt-2 list-disc list-inside text-sm text-gray-600 space-y-1">
                <li>Mood check-ins</li>
                <li>Google Fit integration</li>
                <li>AI coaching and habits</li>
              </ul>
            </div>
          </aside>
        </div>
        <div className="text-center text-xs text-gray-500">BrainDash · Built with love</div>
      </div>
    </div>
  )
}

export default App
