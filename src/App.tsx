import { useState } from 'react'
import { activities } from './data/activities'
import type { Activity } from './data/activities'
import { ActivityCard } from './components/ActivityCard'
import { ActivityDetail } from './components/ActivityDetail'
import FilterBar from './components/FilterBar'
import { SessionExport } from './components/SessionExport'
import { GuidedTour } from './components/GuidedTour'
import { EducationalContent } from './components/EducationalContent'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Heart,
  BarChart3,
  Lightbulb,
  Wrench,
  TestTube,
  Clock,
  X,
  FileDown,
  BookOpen,
  CheckCircle,
  ArrowRight
} from 'lucide-react'
import './App.css'

type Phase = 'Empathize' | 'Define' | 'Ideate' | 'Prototype' | 'Test'
type Tab = 'overview' | 'examples' | 'cases'

function App() {
  const [selectedPhase, setSelectedPhase] = useState<Phase | null>(null)
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null)
  const [sessionActivities, setSessionActivities] = useState<Activity[]>([])
  const [showExport, setShowExport] = useState(false)
  const [activeTab, setActiveTab] = useState<Tab>('overview')
  const [filters, setFilters] = useState({
    phase: 'All Phases',
    ageGroup: 'All Ages'
  })

  const phases: Phase[] = ['Empathize', 'Define', 'Ideate', 'Prototype', 'Test']

  const phaseIcons = {
    Empathize: Heart,
    Define: BarChart3,
    Ideate: Lightbulb,
    Prototype: Wrench,
    Test: TestTube,
  }

  const phaseColors = {
    Empathize: 'from-amber-200 to-amber-100 border-amber-300 hover:from-amber-300 hover:to-amber-200',
    Define: 'from-blue-200 to-blue-100 border-blue-300 hover:from-blue-300 hover:to-blue-200',
    Ideate: 'from-purple-200 to-purple-100 border-purple-300 hover:from-purple-300 hover:to-purple-200',
    Prototype: 'from-green-200 to-green-100 border-green-300 hover:from-green-300 hover:to-green-200',
    Test: 'from-red-200 to-red-100 border-red-300 hover:from-red-300 hover:to-red-200',
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <GuidedTour />
      
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="py-10 bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900"
      >
        <div className="max-w-4xl mx-auto px-4">
          <motion.div 
            className="text-center"
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 tracking-tight">
              Design Thinking Session Planner
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Plan engaging design thinking activities for your classroom
            </p>
          </motion.div>
        </div>
      </motion.header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <EducationalContent />

        <motion.div 
          className="bg-white rounded-2xl shadow-xl p-8 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Design Thinking in Education</h2>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            Design Thinking is a powerful approach to problem-solving that helps students develop empathy, creativity, and critical thinking skills.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-blue-900 mb-4">Benefits</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-blue-500 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Encourages student-centered learning</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-blue-500 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Promotes collaboration and teamwork</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-blue-500 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Develops real-world problem-solving skills</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-blue-500 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Builds confidence through hands-on experience</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-blue-500 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Fosters innovation and creativity</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-purple-900 mb-4">Tips for Teachers</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-purple-500 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                  <span className="text-gray-700">Start with simple, relatable problems</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-purple-500 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                  <span className="text-gray-700">Encourage wild ideas during ideation</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-purple-500 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                  <span className="text-gray-700">Use physical materials for prototyping</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-purple-500 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                  <span className="text-gray-700">Celebrate failures as learning opportunities</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-purple-500 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                  <span className="text-gray-700">Connect projects to real-world contexts</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="bg-white rounded-2xl shadow-xl p-8 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-2 mb-6">
            <BookOpen className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900">What is Design Thinking?</h2>
          </div>
          <p className="text-lg text-gray-600 leading-relaxed max-w-4xl">
            Design Thinking is a human-centered approach to problem-solving that encourages creativity and innovation. 
            It helps students develop solutions that meet real user needs through a structured, iterative process.
          </p>
        </motion.div>

        <motion.div 
          className="design-process mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="process-line"></div>
          <div className="flex flex-wrap md:flex-nowrap justify-between items-center relative z-10 gap-4">
            {phases.map((phase, index) => {
              const Icon = phaseIcons[phase]
              return (
                <motion.div 
                  key={phase} 
                  className="tooltip flex-1 min-w-[120px] flex justify-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <motion.button
                    onClick={() => setSelectedPhase(phase)}
                    className={`phase-button w-24 h-24 md:w-28 md:h-28 flex flex-col items-center justify-center px-0 py-0 rounded-xl font-semibold text-sm md:text-base border-2 shadow-md transition-all duration-300 bg-gradient-to-br ${phaseColors[phase]} ${
                      selectedPhase === phase ? 'scale-105 ring-4 ring-blue-300' : ''
                    } overflow-hidden`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="mb-2" size={20} />
                    <span className="font-bold tracking-wide mt-1">{phase.toUpperCase()}</span>
                  </motion.button>
                  <span className="tooltip-text">{phaseDescriptions[phase]}</span>
                </motion.div>
              )
            })}
          </div>
          <div className="flex justify-between mt-6 text-sm">
            <span className="diverging bg-blue-50 text-blue-700 px-4 py-2 rounded-full shadow-sm">
              Diverging (Explore & Generate)
            </span>
            <span className="converging bg-purple-50 text-purple-700 px-4 py-2 rounded-full shadow-sm">
              Converging (Refine & Focus)
            </span>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {selectedPhase && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div 
                className="bg-white rounded-xl shadow-soft p-6 mb-8 border border-gray-100"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{selectedPhase} Phase</h4>
                <p className="text-gray-600 leading-relaxed">{phaseDescriptions[selectedPhase]}</p>
              </motion.div>
              <FilterBar onFilterChange={handleFilterChange} />
              <motion.div 
                className="bg-white rounded-xl shadow-soft p-6 mt-4 border border-gray-100"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <h3 className="text-lg font-semibold mb-4">{selectedPhase} Activities</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredActivities.map((activity, index) => (
                    <motion.div
                      key={activity.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                    >
                      <ActivityCard
                        activity={activity}
                        onSelect={setSelectedActivity}
                        onAddToSession={() => {
                          if (!sessionActivities.find(a => a.id === activity.id)) {
                            setSessionActivities([...sessionActivities, activity])
                          }
                        }}
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {sessionActivities.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-8"
            >
              <motion.div 
                className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl shadow-soft p-8 border-2 border-blue-200"
                whileHover={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    <Clock className="w-6 h-6 text-blue-600" />
                    Your Session Plan
                  </h3>
                  <motion.button
                    onClick={() => setShowExport(true)}
                    className="export-button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FileDown className="w-5 h-5 mr-2 inline-block" />
                    Export Session
                  </motion.button>
                </div>
                <div className="space-y-4">
                  {sessionActivities.map((activity, index) => (
                    <motion.div
                      key={activity.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className="session-activity"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-semibold text-lg text-gray-900">{activity.name}</h4>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="flex items-center gap-1 text-blue-700 bg-blue-50 px-3 py-1 rounded-full text-sm font-medium">
                              <Clock className="w-4 h-4" />
                              {activity.duration} min
                            </span>
                            <span className="text-sm text-gray-500">{activity.phase}</span>
                          </div>
                        </div>
                        <motion.button
                          onClick={() => setSessionActivities(sessionActivities.filter((_, i) => i !== index))}
                          className="ml-4 p-2 rounded-full bg-red-50 text-red-600 hover:bg-red-100 transition-colors duration-200"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <X className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                  <motion.div 
                    className="flex justify-end items-center gap-2 mt-6 text-lg font-bold text-gray-900"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <Clock className="w-5 h-5 text-blue-600" />
                    Total Duration: {totalDuration} minutes
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
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
        </AnimatePresence>

        <AnimatePresence>
          {showExport && (
            <SessionExport
              activities={sessionActivities}
              onClose={() => setShowExport(false)}
            />
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}

export default App
