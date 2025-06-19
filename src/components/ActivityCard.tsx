import React from 'react'
import type { Activity } from '../data/activities'
import { Clock, ClipboardList, Plus, ArrowRight, Users } from 'lucide-react'
import { motion } from 'framer-motion'

interface ActivityCardProps {
  activity: Activity
  onSelect: (activity: Activity) => void
  onAddToSession: () => void
  isSelected?: boolean
}

export function ActivityCard({ activity, onSelect, onAddToSession, isSelected = false }: ActivityCardProps) {
  const getPhaseColor = (phase: string) => {
    switch (phase) {
      case 'Empathize':
        return 'bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200 hover:from-amber-100 hover:to-amber-200'
      case 'Define':
        return 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:from-blue-100 hover:to-blue-200'
      case 'Ideate':
        return 'bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 hover:from-purple-100 hover:to-purple-200'
      case 'Prototype':
        return 'bg-gradient-to-br from-green-50 to-green-100 border-green-200 hover:from-green-100 hover:to-green-200'
      case 'Test':
        return 'bg-gradient-to-br from-red-50 to-red-100 border-red-200 hover:from-red-100 hover:to-red-200'
      default:
        return 'bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200'
    }
  }

  const getPhaseBadgeColor = (phase: string) => {
    switch (phase) {
      case 'Empathize':
        return 'bg-amber-100 text-amber-800 border-amber-200'
      case 'Define':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'Ideate':
        return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'Prototype':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'Test':
        return 'bg-red-100 text-red-800 border-red-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getAgeGroupColor = (ageGroup: string) => {
    switch (ageGroup) {
      case 'Elementary School':
        return 'bg-pink-50 text-pink-700 border border-pink-200'
      case 'Middle School':
        return 'bg-indigo-50 text-indigo-700 border border-indigo-200'
      case 'High School':
        return 'bg-cyan-50 text-cyan-700 border border-cyan-200'
      default:
        return 'bg-gray-50 text-gray-700 border border-gray-200'
    }
  }

  return (
    <motion.div
      className={`activity-card ${isSelected ? 'ring-2 ring-blue-500 ring-offset-2' : ''}`}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex justify-between items-start mb-4">
        <span className={`phase-badge ${getPhaseBadgeColor(activity.phase)}`}>
          {activity.phase}
        </span>
        <motion.button
          onClick={onAddToSession}
          className="p-2 rounded-full text-gray-400 hover:text-blue-500 hover:bg-blue-50 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Plus className="w-4 h-4" />
        </motion.button>
      </div>

      <motion.button
        onClick={() => onSelect(activity)}
        className="w-full text-left"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {activity.name}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {activity.description}
        </p>
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {activity.duration} min
          </span>
          <span className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            {activity.ageGroup}
          </span>
        </div>
      </motion.button>
    </motion.div>
  )
}

export type { ActivityCardProps } 