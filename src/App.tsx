import { useState } from 'react'
import { activities } from './data/activities'
import type { Activity } from './data/activities'
import { ActivityCard } from './components/ActivityCard'
import { ActivityDetail } from './components/ActivityDetail'
import FilterBar from './components/FilterBar'
import { SessionExport } from './components/SessionExport'
import { GuidedTour } from './components/GuidedTour'
import { EducationalContent } from './components/EducationalContent'
import {
  HeartIcon,
  LightBulbIcon,
  BeakerIcon,
  WrenchScrewdriverIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline'
import './App.css'

type Phase = 'Empathize' | 'Define' | 'Ideate' | 'Prototype' | 'Test'

function App() {
  const [selectedPhase, setSelectedPhase] = useState<Phase | null>(null)
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null)
  const [sessionActivities, setSessionActivities] = useState<Activity[]>([])
  const [showExport, setShowExport] = useState(false)
  const [filters, setFilters] = useState({
    phase: 'All Phases',
    ageGroup: 'All Ages'
  })

  const phases: Phase[] = ['Empathize', 'Define', 'Ideate', 'Prototype', 'Test']

  const phaseIcons = {
    Empathize: HeartIcon,
    Define: ChartBarIcon,
    Ideate: LightBulbIcon,
    Prototype: WrenchScrewdriverIcon,
    Test: BeakerIcon,
  }

  const phaseDescriptions: Record<Phase, string> = {
    Empathize: 'Understand your users and their needs through observation and interviews',
    Define: 'Analyze observations and define the core problems to solve',
    Ideate: 'Generate creative solutions through brainstorming and collaboration',
    Prototype: 'Create simple, low-cost versions of your solutions to test',
    Test: 'Try out your solutions with users and gather feedback'
  }

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
      <GuidedTour />
      
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900 leading-tight">Design Thinking Session Planner</h1>
          <p className="mt-2 text-gray-600 leading-relaxed">Plan engaging design thinking activities for your classroom</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <EducationalContent />

        <div className="educational-content mb-8">
          <h4 className="text-lg font-semibold text-gray-900 leading-tight">What is Design Thinking?</h4>
          <p className="text-gray-600 leading-relaxed">
            Design Thinking is a human-centered approach to problem-solving that encourages creativity and innovation. 
            It's a process that helps students develop empathy, think critically, and create solutions that meet real user needs.
          </p>
        </div>

        <div className="design-process">
          <div className="process-line"></div>
          <div className="flex justify-between items-center relative z-10">
            {phases.map((phase) => {
              const Icon = phaseIcons[phase]
              return (
                <div key={phase} className="tooltip">
                  <button
                    onClick={() => setSelectedPhase(phase)}
                    className={`phase-button ${phase.toLowerCase()} px-4 py-2 rounded-full ${
                      selectedPhase === phase ? 'active' : ''
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Icon className="w-5 h-5" />
                      <span>{phase}</span>
                    </div>
                  </button>
                  <span className="tooltip-text">{phaseDescriptions[phase]}</span>
                </div>
              )
            })}
          </div>
          <div className="flex justify-between mt-4 text-sm text-gray-600">
            <span className="diverging">Diverging (Explore & Generate)</span>
            <span className="converging">Converging (Refine & Focus)</span>
          </div>
        </div>

        {selectedPhase && (
          <>
            <div className="educational-content mt-8">
              <h4 className="text-lg font-semibold text-gray-900 leading-tight">{selectedPhase} Phase</h4>
              <p className="text-gray-600 leading-relaxed">{phaseDescriptions[selectedPhase]}</p>
            </div>
            <FilterBar onFilterChange={handleFilterChange} />
            <div className="bg-white rounded-lg shadow p-6 mt-4">
              <h3 className="text-lg font-semibold mb-4 leading-tight">{selectedPhase} Activities</h3>
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
            <div className="bg-white rounded-lg shadow p-6 session-plan">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold leading-tight">Your Session Plan</h3>
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
                        <h4 className="font-medium leading-tight">{activity.name}</h4>
                        <p className="text-sm text-gray-600 leading-relaxed">{activity.duration} minutes</p>
                      </div>
                      <button
                        onClick={() => setSessionActivities(sessionActivities.filter((_, i) => i !== index))}
                        className="text-gray-400 hover:text-red-500 transition-colors duration-200"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
                <div className="text-right text-sm text-gray-600 leading-relaxed">
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
