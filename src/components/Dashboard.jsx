import { useEffect, useState } from 'react'

function Chip({ children, tone = 'gray' }) {
  const tones = {
    gray: 'bg-gray-100 text-gray-700',
    red: 'bg-red-100 text-red-700',
    green: 'bg-green-100 text-green-700',
    blue: 'bg-blue-100 text-blue-700',
    purple: 'bg-purple-100 text-purple-700',
    amber: 'bg-amber-100 text-amber-800',
  }
  return <span className={`px-2 py-0.5 text-xs rounded-full ${tones[tone]}`}>{children}</span>
}

function Dashboard() {
  const [tasks, setTasks] = useState([])
  const [filterEnergy, setFilterEnergy] = useState('')
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const loadTasks = async () => {
    const url = new URL(`${baseUrl}/api/tasks`)
    if (filterEnergy) url.searchParams.set('energy', filterEnergy)
    const res = await fetch(url)
    const data = await res.json()
    setTasks(data.tasks || [])
  }

  useEffect(() => { loadTasks() }, [filterEnergy])

  return (
    <section className="space-y-4">
      <div className="flex items-center gap-2">
        <select value={filterEnergy} onChange={(e) => setFilterEnergy(e.target.value)} className="px-3 py-2 rounded-lg border border-gray-300">
          <option value="">All energy</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button onClick={loadTasks} className="px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200">Refresh</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {tasks.map((t) => (
          <div key={t.id} className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-medium text-gray-900">{t.text}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {t.category && <Chip tone="purple">{t.category}</Chip>}
                  {t.energy && <Chip tone="blue">energy: {t.energy}</Chip>}
                  {typeof t.priority === 'number' && <Chip tone="amber">priority: {t.priority}</Chip>}
                  {typeof t.urgency === 'number' && <Chip tone="red">urgency: {t.urgency}</Chip>}
                  {t.due && <Chip tone="green">{t.due}</Chip>}
                </div>
              </div>
            </div>
            {t.tips && t.tips.length > 0 && (
              <ul className="mt-3 list-disc list-inside text-sm text-gray-600 space-y-1">
                {t.tips.map((tip, i) => (
                  <li key={i}>{tip}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
      {tasks.length === 0 && (
        <div className="text-gray-500 text-sm">No tasks yet. Add one above and they’ll appear here with smart sorting.</div>
      )}
    </section>
  )
}

export default Dashboard
