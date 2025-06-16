import { useState } from 'react'
import { activities } from './data/activities'
import type { Activity } from './data/activities'
import { ActivityCard } from './components/ActivityCard'
import { ActivityDetail } from './components/ActivityDetail'
import FilterBar from './components/FilterBar'
import { SessionExport } from './components/SessionExport'
import './App.css'

function App() {
  const [selectedPhase, setSelectedPhase] = useState<string | null>(null)
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null)
  const [sessionActivities, setSessionActivities] = useState<Activity[]>([])
  const [showExport, setShowExport] = useState(false)
  const [filters, setFilters] = useState({
    phase: 'All Phases',
    ageGroup: 'All Ages'
  })

  const phases = ['Empathize', 'Define', 'Ideate', 'Prototype', 'Test']

  const filteredActivities = activities.filter(activity => {
    const matchesPhase = filters.phase === 'All Phases' || activity.phase === filters.phase;
    const matchesAgeGroup = filters.ageGroup === 'All Ages' || activity.ageGroup === filters.ageGroup;
    return matchesPhase && matchesAgeGroup;
  })

  const totalDuration = sessionActivities.reduce((sum, activity) => sum + activity.duration, 0)

  const handleFilterChange = (newFilters: { phase: string; ageGroup: string }) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Design Thinking Session Planner</h1>
          <p className="mt-2 text-gray-600">Plan engaging design thinking activities for your classroom</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="design-process">
          <div className="process-line"></div>
          <div className="flex justify-between items-center relative z-10">
            {phases.map((phase) => (
              <button
                key={phase}
                onClick={() => setSelectedPhase(phase)}
                className={`phase-button ${phase.toLowerCase()} px-4 py-2 rounded-full ${
                  selectedPhase === phase ? 'active' : ''
                }`}
              >
                {phase}
              </button>
            ))}
          </div>
          <div className="flex justify-between mt-4 text-sm text-gray-600">
            <span className="diverging">Diverging</span>
            <span className="converging">Converging</span>
          </div>
        </div>

        {selectedPhase && (
          <>
            <FilterBar onFilterChange={handleFilterChange} />
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4">{selectedPhase} Activities</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredActivities.map((activity) => (
                  <ActivityCard
                    key={activity.id}
                    activity={activity}
                    onSelect={setSelectedActivity}
                    onAddToSession={() => {
                      if (!sessionActivities.find(a => a.id === activity.id)) {
                        setSessionActivities([...sessionActivities, activity])
                      }
                    }}
                  />
                ))}
              </div>
            </div>
          </>
        )}

        {sessionActivities.length > 0 && (
          <div className="mt-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Your Session Plan</h3>
                <button
                  onClick={() => setShowExport(true)}
                  className="export-button px-4 py-2 rounded-md"
                >
                  Export Session
                </button>
              </div>
              <div className="space-y-4">
                {sessionActivities.map((activity, index) => (
                  <div key={activity.id} className="session-activity p-4 bg-gray-50 rounded-md">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{activity.name}</h4>
                        <p className="text-sm text-gray-600">{activity.duration} minutes</p>
                      </div>
                      <button
                        onClick={() => setSessionActivities(sessionActivities.filter((_, i) => i !== index))}
                        className="text-gray-400 hover:text-red-500"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
                <div className="text-right text-sm text-gray-600">
                  Total Duration: {totalDuration} minutes
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedActivity && (
          <ActivityDetail
            activity={selectedActivity}
            onClose={() => setSelectedActivity(null)}
            onAddToSession={() => {
              if (!sessionActivities.find(a => a.id === selectedActivity.id)) {
                setSessionActivities([...sessionActivities, selectedActivity])
              }
              setSelectedActivity(null)
            }}
          />
        )}

        {showExport && (
          <SessionExport
            activities={sessionActivities}
            onClose={() => setShowExport(false)}
          />
        )}
      </main>
    </div>
  )
}

export default App
