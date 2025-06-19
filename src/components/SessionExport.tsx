import React from 'react'
import { motion } from 'framer-motion'
import { X, Download, Clock, Users, CheckCircle } from 'lucide-react'
import type { Activity } from '../data/activities'

interface SessionExportProps {
  activities: Activity[]
  onClose: () => void
}

export function SessionExport({ activities, onClose }: SessionExportProps) {
  const totalDuration = activities.reduce((sum, activity) => sum + activity.duration, 0)

  const handleExport = () => {
    const content = `Design Thinking Session Plan\n\n` +
      `Total Duration: ${totalDuration} minutes\n\n` +
      activities.map((activity, index) => (
        `${index + 1}. ${activity.name}\n` +
        `   Phase: ${activity.phase}\n` +
        `   Duration: ${activity.duration} minutes\n` +
        `   Age Group: ${activity.ageGroup}\n` +
        `   Description: ${activity.description}\n` +
        `   Materials Needed:\n${activity.materials.map(m => `     - ${m}\n`).join('')}\n`
      )).join('\n')

    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'design-thinking-session-plan.txt'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={e => e.stopPropagation()}
      >
        <div className="p-6 md:p-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Export Session Plan</h2>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {totalDuration} minutes total
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle className="w-4 h-4" />
                  {activities.length} activities
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4 mb-8">
            {activities.map((activity, index) => (
              <motion.div
                key={activity.id}
                className="p-4 bg-gray-50 rounded-lg border border-gray-100"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {index + 1}. {activity.name}
                    </h3>
                    <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {activity.duration} minutes
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {activity.ageGroup}
                      </span>
                    </div>
                  </div>
                  <span className={`phase-badge ${activity.phase.toLowerCase()}`}>
                    {activity.phase}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="pt-6 border-t">
            <button
              onClick={handleExport}
              className="btn btn-primary w-full flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download Session Plan
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export type { SessionExportProps } 