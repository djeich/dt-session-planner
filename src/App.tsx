import { useState } from 'react'
import './App.css'

function App() {
  const [sessions, setSessions] = useState<Array<{ id: number; title: string; date: string }>>([])
  const [newSessionTitle, setNewSessionTitle] = useState('')
  const [newSessionDate, setNewSessionDate] = useState('')

  const addSession = () => {
    if (newSessionTitle && newSessionDate) {
      setSessions([
        ...sessions,
        {
          id: Date.now(),
          title: newSessionTitle,
          date: newSessionDate
        }
      ])
      setNewSessionTitle('')
      setNewSessionDate('')
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">DT Session Planner</h1>
      
      <div className="mb-8 p-4 bg-white rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Add New Session</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Session Title</label>
            <input
              type="text"
              value={newSessionTitle}
              onChange={(e) => setNewSessionTitle(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter session title"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Date</label>
            <input
              type="date"
              value={newSessionDate}
              onChange={(e) => setNewSessionDate(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <button
            onClick={addSession}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Session
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <h2 className="text-xl font-semibold p-4 border-b">Upcoming Sessions</h2>
        {sessions.length === 0 ? (
          <p className="p-4 text-gray-500">No sessions planned yet</p>
        ) : (
          <ul className="divide-y">
            {sessions.map((session) => (
              <li key={session.id} className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">{session.title}</h3>
                    <p className="text-sm text-gray-500">{session.date}</p>
                  </div>
                  <button
                    onClick={() => setSessions(sessions.filter(s => s.id !== session.id))}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default App
