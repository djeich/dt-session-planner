import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Clock, Users, Plus, ClipboardList, Target, ArrowRight } from 'lucide-react'
import type { Activity } from '../data/activities'

interface ActivityDetailProps {
  activity: Activity
  onClose: () => void
  onAddToSession: () => void
}

export function ActivityDetail({ activity, onClose, onAddToSession }: ActivityDetailProps) {
  const phaseColors = {
    Empathize: 'bg-amber-50 text-amber-700 border-amber-200',
    Define: 'bg-blue-50 text-blue-700 border-blue-200',
    Ideate: 'bg-purple-50 text-purple-700 border-purple-200',
    Prototype: 'bg-green-50 text-green-700 border-green-200',
    Test: 'bg-red-50 text-red-700 border-red-200'
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
              <span className={`phase-badge ${phaseColors[activity.phase]} mb-3 inline-block`}>
                {activity.phase}
              </span>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{activity.name}</h2>
              <div className="flex items-center gap-4 text-sm text-gray-500">
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
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-500" />
                Description
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {activity.description}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <ClipboardList className="w-5 h-5 text-blue-500" />
                Materials Needed
              </h3>
              <ul className="space-y-2">
                {activity.materials.map((material, index) => (
                  <motion.li
                    key={index}
                    className="flex items-start gap-3 text-gray-600"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <span className="inline-block w-1.5 h-1.5 bg-blue-400 rounded-full mt-2.5" />
                    <span>{material}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="pt-6 border-t">
              <button
                onClick={onAddToSession}
                className="btn btn-primary w-full flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add to Session Plan
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export type { ActivityDetailProps } 