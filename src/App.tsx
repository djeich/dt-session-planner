import React, { useState } from 'react'
import { activities } from './data/activities'
import type { Activity } from './data/activities'
import { ActivityCard } from './components/ActivityCard'
import { ActivityDetail } from './components/ActivityDetail'
import FilterBar from './components/FilterBar'
import { SessionExport } from './components/SessionExport'
import { GuidedTour } from './components/GuidedTour'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Heart,
  BarChart3,
  Lightbulb,
  Wrench,
  TestTube,
  Clock,
  BookOpen,
  GraduationCap,
  Users,
  Target,
  ArrowRight
} from 'lucide-react'
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
    Empathize: Heart,
    Define: BarChart3,
    Ideate: Lightbulb,
    Prototype: Wrench,
    Test: TestTube,
  }

  const phaseDescriptions = {
    Empathize: 'Understand your users and their needs through observation and interviews',
    Define: 'Analyze observations and define the core problems to solve',
    Ideate: 'Generate creative solutions through brainstorming and collaboration',
    Prototype: 'Create simple, low-cost versions of your solutions to test',
    Test: 'Try out your solutions with users and gather feedback'
  }

  const filteredActivities = activities.filter(activity => {
    const matchesPhase = filters.phase === 'All Phases' || activity.phase === filters.phase
    const matchesAgeGroup = filters.ageGroup === 'All Ages' || activity.ageGroup === filters.ageGroup
    return matchesPhase && matchesAgeGroup
  })

  const totalDuration = sessionActivities.reduce((sum, activity) => sum + activity.duration, 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <GuidedTour />
      
      {/* Header */}
      <motion.header 
        className="py-16 bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container">
          <motion.div 
            className="text-center max-w-4xl mx-auto"
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
              Design Thinking Session Planner
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Plan engaging design thinking activities for your classroom
            </p>
          </motion.div>
        </div>
      </motion.header>

      <main className="container py-12">
        {/* Overview Section */}
        <motion.section 
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <motion.div 
              className="card"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <GraduationCap className="w-8 h-8 text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Student-Centered</h3>
              <p className="text-gray-600">
                Engage students in hands-on, creative problem-solving experiences
              </p>
            </motion.div>

            <motion.div 
              className="card"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <Users className="w-8 h-8 text-purple-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Collaborative</h3>
              <p className="text-gray-600">
                Foster teamwork and communication through group activities
              </p>
            </motion.div>

            <motion.div 
              className="card"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <Target className="w-8 h-8 text-amber-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Goal-Oriented</h3>
              <p className="text-gray-600">
                Guide students through a structured creative process
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* Design Process Section */}
        <section className="mb-16">
          <motion.div 
            className="design-process"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="process-line" />
            <div className="flex flex-wrap md:flex-nowrap justify-between items-center relative z-10 gap-4">
              {phases.map((phase, index) => {
                const Icon = phaseIcons[phase]
                return (
                  <motion.div 
                    key={phase}
                    className="flex-1 min-w-[120px] flex justify-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <motion.button
                      onClick={() => setSelectedPhase(phase)}
                      className={`phase-button ${phase.toLowerCase()} ${
                        selectedPhase === phase ? 'active' : ''
                      }`}
                      whileHover={{ y: -8 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Icon className="w-6 h-6 mb-2" />
                      <span className="text-sm font-bold tracking-wide">
                        {phase.toUpperCase()}
                      </span>
                    </motion.button>
                  </motion.div>
                )
              })}
            </div>
            <div className="flex justify-between mt-8">
              <motion.span 
                className="px-4 py-2 rounded-full bg-blue-50 text-blue-700 font-medium text-sm"
                whileHover={{ y: -2 }}
              >
                Diverging (Explore & Generate)
              </motion.span>
              <motion.span 
                className="px-4 py-2 rounded-full bg-purple-50 text-purple-700 font-medium text-sm"
                whileHover={{ y: -2 }}
              >
                Converging (Refine & Focus)
              </motion.span>
            </div>
          </motion.div>
        </section>

        {/* Activities Section */}
        <AnimatePresence mode="wait">
          {selectedPhase && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="card mb-8">
                <div className="flex items-center gap-3 mb-4">
                  {phaseIcons[selectedPhase] && (
                    <div className={`p-2 rounded-lg bg-${selectedPhase.toLowerCase()}-50`}>
                      {React.createElement(phaseIcons[selectedPhase], {
                        className: `w-6 h-6 text-${selectedPhase.toLowerCase()}-600`
                      })}
                    </div>
                  )}
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedPhase} Phase</h2>
                    <p className="text-gray-600 mt-1">{phaseDescriptions[selectedPhase]}</p>
                  </div>
                </div>
                
                <FilterBar onFilterChange={filters => setFilters(filters)} />
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                  {filteredActivities.map((activity, index) => (
                    <motion.div
                      key={activity.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
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
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Session Plan Section */}
        {sessionActivities.length > 0 && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="session-plan"
          >
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Your Session Plan</h2>
                <p className="text-gray-600">Total Duration: {totalDuration} minutes</p>
              </div>
              <button
                onClick={() => setShowExport(true)}
                className="btn btn-primary flex items-center gap-2"
              >
                Export Plan
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              {sessionActivities.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="session-activity"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-900">{activity.name}</h3>
                      <p className="text-sm text-gray-600">{activity.duration} minutes</p>
                    </div>
                    <button
                      onClick={() => setSessionActivities(activities => 
                        activities.filter((_, i) => i !== index)
                      )}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Modals */}
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
