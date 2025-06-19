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

  const phaseColors = {
    Empathize: 'from-amber-200 to-amber-100 border-amber-300',
    Define: 'from-blue-200 to-blue-100 border-blue-300',
    Ideate: 'from-purple-200 to-purple-100 border-purple-300',
    Prototype: 'from-green-200 to-green-100 border-green-300',
    Test: 'from-red-200 to-red-100 border-red-300',
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <GuidedTour />
      
      <header className="py-10">
        <div className="max-w-3xl mx-auto px-4">
          <div className="bg-gradient-to-r from-blue-600 to-purple-500 rounded-2xl shadow-lg p-8 flex flex-col items-center mb-6">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow mb-2 text-center">Design Thinking Session Planner</h1>
            <p className="mt-2 text-blue-100 text-lg text-center font-medium">Plan engaging design thinking activities for your classroom</p>
          </div>
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

        <div className="design-process mb-10">
          <div className="process-line"></div>
          <div className="flex flex-wrap justify-between items-center relative z-10 gap-4 md:gap-0">
            {phases.map((phase) => {
              const Icon = phaseIcons[phase]
              return (
                <div key={phase} className="tooltip flex-1 min-w-[120px] flex justify-center">
                  <button
                    onClick={() => setSelectedPhase(phase)}
                    className={`phase-button w-32 h-32 flex flex-col items-center justify-center px-0 py-0 rounded-xl font-semibold text-lg border-2 shadow transition-all duration-200 bg-gradient-to-br ${phaseColors[phase]} ${
                      selectedPhase === phase ? 'scale-105 ring-4 ring-blue-300' : 'hover:scale-105 hover:ring-2 hover:ring-blue-200'
                    }`}
                    style={{ minWidth: '8rem', minHeight: '8rem', maxWidth: '8rem', maxHeight: '8rem' }}
                  >
                    <Icon className="w-12 h-12 mb-2" />
                    <span className="text-base font-bold tracking-wide mt-1">{phase.toUpperCase()}</span>
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
            <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-2xl shadow-lg p-8 session-plan border-2 border-blue-200">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-blue-900 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2a4 4 0 014-4h6m-6 0V7a4 4 0 00-4-4H5a4 4 0 00-4 4v10a4 4 0 004 4h6a4 4 0 004-4z" /></svg>
                  Your Session Plan
                </h3>
                <button
                  onClick={() => setShowExport(true)}
                  className="export-button px-6 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold shadow hover:from-blue-600 hover:to-purple-600 transition-all duration-200"
                >
                  Export Session
                </button>
              </div>
              <div className="space-y-4">
                {sessionActivities.map((activity, index) => (
                  <div key={activity.id} className="session-activity p-4 bg-white rounded-xl border border-blue-100 flex justify-between items-center shadow-sm">
                    <div>
                      <h4 className="font-semibold text-lg text-gray-900 leading-tight">{activity.name}</h4>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="flex items-center gap-1 text-blue-700 bg-blue-50 px-2 py-1 rounded-full text-xs font-medium">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3" /></svg>
                          {activity.duration} min
                        </span>
                        <span className="text-xs text-gray-500">{activity.phase}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => setSessionActivities(sessionActivities.filter((_, i) => i !== index))}
                      className="ml-4 px-3 py-1 rounded bg-red-100 text-red-700 font-semibold hover:bg-red-200 transition-colors duration-200"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <div className="text-right text-lg text-blue-900 font-bold mt-4">
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
