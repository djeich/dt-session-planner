import { useState, useEffect } from 'react'
import Joyride, { type CallBackProps, type Step, STATUS } from 'react-joyride'

const steps: Step[] = [
  {
    target: '.design-process',
    content: 'Welcome to the Design Thinking Session Planner! This is the process visualization that shows the five phases of design thinking.',
    placement: 'bottom' as const,
    disableBeacon: true,
  },
  {
    target: '.phase-button',
    content: 'Each phase has its own color and purpose. Hover over them to learn more!',
    placement: 'bottom' as const,
  },
  {
    target: '.diverging',
    content: 'The process alternates between diverging (exploring many ideas) and converging (focusing on the best ones).',
    placement: 'bottom' as const,
  },
  {
    target: '.filter-bar',
    content: 'Filter activities by phase and age group to find the perfect fit for your classroom.',
    placement: 'bottom' as const,
  },
  {
    target: '.activity-card',
    content: 'Each activity card shows key information like duration, materials needed, and age group.',
    placement: 'top' as const,
  },
  {
    target: '.session-plan',
    content: 'Build your session by adding activities. The total duration is automatically calculated.',
    placement: 'left' as const,
  },
  {
    target: '.export-button',
    content: 'Export your session plan when you\'re ready to use it in your classroom!',
    placement: 'left' as const,
  },
]

export function GuidedTour() {
  const [run, setRun] = useState(false)

  useEffect(() => {
    // Check if this is the user's first visit
    const hasSeenTour = localStorage.getItem('hasSeenTour')
    if (!hasSeenTour) {
      setRun(true)
    }
  }, [])

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status } = data
    if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
      // Save that the user has seen the tour
      localStorage.setItem('hasSeenTour', 'true')
      setRun(false)
    }
  }

  return (
    <Joyride
      steps={steps}
      run={run}
      continuous
      showProgress
      showSkipButton
      callback={handleJoyrideCallback}
      styles={{
        options: {
          primaryColor: '#3b82f6',
          zIndex: 1000,
        },
        tooltip: {
          fontSize: '1rem',
          padding: '1rem',
        },
        buttonNext: {
          backgroundColor: '#3b82f6',
          fontSize: '0.875rem',
          padding: '0.5rem 1rem',
        },
        buttonBack: {
          color: '#4b5563',
          marginRight: '0.5rem',
        },
        buttonSkip: {
          color: '#6b7280',
        },
      }}
    />
  )
} 