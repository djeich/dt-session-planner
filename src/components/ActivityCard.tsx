import type { Activity } from '../data/activities'

interface ActivityCardProps {
  activity: Activity
  onSelect: (activity: Activity) => void
  onAddToSession: () => void
}

export function ActivityCard({ activity, onSelect, onAddToSession }: ActivityCardProps) {
  const getPhaseColor = (phase: string) => {
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
    <div className="activity-card bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold text-gray-900">{activity.name}</h3>
          <span className={`phase-badge ${getPhaseColor(activity.phase)}`}>
            {activity.phase}
          </span>
        </div>
        
        <div className="space-y-4">
          <p className="text-gray-600">{activity.description}</p>
          
          <div className="flex flex-wrap gap-2">
            <span className={`age-badge ${getAgeGroupColor(activity.ageGroup)}`}>
              {activity.ageGroup}
            </span>
            <span className="age-badge bg-blue-100 text-blue-800">
              {activity.duration} min
            </span>
          </div>

          <div className="mt-4">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Materials Needed:</h4>
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
              {activity.materials.map((material, index) => (
                <li key={index}>{material}</li>
              ))}
            </ul>
          </div>

          <div className="mt-4 flex justify-between items-center">
            <button
              onClick={() => onSelect(activity)}
              className="text-blue-600 hover:text-blue-800 font-medium text-sm"
            >
              View Details
            </button>
            <button
              onClick={onAddToSession}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
            >
              Add to Session
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 