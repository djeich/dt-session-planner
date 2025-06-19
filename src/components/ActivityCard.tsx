import type { Activity } from '../data/activities'
import { Clock, ClipboardList } from 'lucide-react'

interface ActivityCardProps {
  activity: Activity
  onSelect: (activity: Activity) => void
  onAddToSession: () => void
}

export function ActivityCard({ activity, onSelect, onAddToSession }: ActivityCardProps) {
  const getPhaseColor = (phase: string) => {
    switch (phase) {
      case 'Empathize':
        return 'bg-amber-50 border-amber-200'
      case 'Define':
        return 'bg-blue-50 border-blue-200'
      case 'Ideate':
        return 'bg-purple-50 border-purple-200'
      case 'Prototype':
        return 'bg-green-50 border-green-200'
      case 'Test':
        return 'bg-red-50 border-red-200'
      default:
        return 'bg-gray-50 border-gray-200'
    }
  }

  const getAgeGroupColor = (ageGroup: string) => {
    switch (ageGroup) {
      case 'Elementary School':
        return 'bg-pink-100 text-pink-800'
      case 'Middle School':
        return 'bg-indigo-100 text-indigo-800'
      case 'High School':
        return 'bg-cyan-100 text-cyan-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className={`activity-card rounded-xl shadow-md overflow-hidden border-2 transition-all duration-300 hover:shadow-xl ${getPhaseColor(activity.phase)}`}>
      <div className="p-6 flex flex-col h-full">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold text-gray-900 leading-tight">{activity.name}</h3>
          <span className="phase-badge bg-white border px-3 py-1 text-xs font-bold uppercase tracking-wide shadow-sm">
            {activity.phase}
          </span>
        </div>
        <div className="space-y-4 flex-1">
          <p className="text-gray-700 leading-relaxed">{activity.description}</p>
          <div className="flex flex-wrap gap-2 items-center">
            <span className={`age-badge ${getAgeGroupColor(activity.ageGroup)}`}>{activity.ageGroup}</span>
            <span className="flex items-center gap-1 bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
              <Clock size={18} />
              {activity.duration} min
            </span>
          </div>
          <div className="mt-2">
            <h4 className="text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1">
              <ClipboardList size={18} className="text-gray-400" /> Materials Needed
            </h4>
            <ul className="space-y-1 text-sm text-gray-600">
              {activity.materials.map((material, index) => (
                <li key={index} className="flex items-start">
                  <span className="inline-block w-1 h-1 bg-gray-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                  <span className="leading-relaxed">{material}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-6 flex justify-between items-center gap-2">
          <button
            onClick={() => onSelect(activity)}
            className="text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors duration-200 underline"
          >
            View Details
          </button>
          <button
            onClick={onAddToSession}
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-5 py-2 rounded-lg font-semibold shadow hover:from-blue-600 hover:to-purple-600 transition-all duration-200"
          >
            + Add to Session
          </button>
        </div>
      </div>
    </div>
  )
} 