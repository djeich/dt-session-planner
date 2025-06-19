import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

const steps = [
  {
    id: 'welcome',
    title: 'Welcome to Design Thinking!',
    content: 'This tool helps you plan engaging design thinking sessions for your classroom. Let\'s take a quick tour!',
    target: null,
  },
  {
    id: 'process',
    title: 'The Design Thinking Process',
    content: 'This visual shows the five phases of design thinking. Each phase has its own color and purpose. Hover over them to learn more!',
    target: '.design-process',
  },
  {
    id: 'phases',
    title: 'Phase Buttons',
    content: 'Click on any phase to see activities for that stage. Each phase helps students develop different skills.',
    target: '.phase-button',
  },
  {
    id: 'diverging',
    title: 'Diverging & Converging',
    content: 'The process alternates between exploring many ideas (diverging) and focusing on the best ones (converging).',
    target: '.diverging',
  },
  {
    id: 'filters',
    title: 'Filter Activities',
    content: 'Use these filters to find activities that match your students\' age and the phase you\'re working on.',
    target: '.filter-bar',
  },
  {
    id: 'activities',
    title: 'Activity Cards',
    content: 'Each card shows key information like duration, materials needed, and age group. Click "View Details" for more info.',
    target: '.activity-card',
  },
  {
    id: 'session',
    title: 'Build Your Session',
    content: 'Add activities to build your session plan. The total duration is automatically calculated.',
    target: '.session-plan',
  },
  {
    id: 'export',
    title: 'Export Your Plan',
    content: 'When you\'re ready, export your session plan to use in your classroom!',
    target: '.export-button',
  },
]

export function GuidedTour() {
  const [isActive, setIsActive] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [showOverlay, setShowOverlay] = useState(false)

  useEffect(() => {
    // Check if this is the user's first visit
    const hasSeenTour = localStorage.getItem('hasSeenTour')
    if (!hasSeenTour) {
      // Delay the tour start to let the page load
      const timer = setTimeout(() => {
        setIsActive(true)
        setShowOverlay(true)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      handleFinish()
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleFinish = () => {
    localStorage.setItem('hasSeenTour', 'true')
    setIsActive(false)
    setShowOverlay(false)
  }

  const handleSkip = () => {
    handleFinish()
  }

  if (!isActive) return null

  const step = steps[currentStep]

  return (
    <>
      {/* Overlay */}
      <AnimatePresence>
        {showOverlay && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={handleNext}
          />
        )}
      </AnimatePresence>

      {/* Tour Tooltip */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed z-50 bg-white rounded-lg shadow-xl max-w-md p-6"
            style={{
              top: step.target ? '50%' : '20%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{step.title}</h3>
              <button
                onClick={handleSkip}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <p className="text-gray-600 mb-6">{step.content}</p>
            
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-500">
                {currentStep + 1} of {steps.length}
              </div>
              
              <div className="flex space-x-2">
                {currentStep > 0 && (
                  <button
                    onClick={handlePrevious}
                    className="px-3 py-2 text-gray-600 hover:text-gray-800 flex items-center"
                  >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Previous
                  </button>
                )}
                
                <button
                  onClick={handleNext}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
                >
                  {currentStep === steps.length - 1 ? 'Finish' : 'Next'}
                  {currentStep < steps.length - 1 && (
                    <ChevronRight className="w-4 h-4 ml-1" />
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
} 