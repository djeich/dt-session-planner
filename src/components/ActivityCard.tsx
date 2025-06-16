import type { Activity } from '../data/activities'

interface ActivityCardProps {
  activity: Activity;
  onSelect: (activity: Activity) => void;
  onAddToSession: () => void;
}

export const ActivityCard = ({ activity, onSelect, onAddToSession }: ActivityCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{activity.name}</h3>
        <p className="text-sm text-gray-600 mb-4">{activity.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-500">{activity.duration} minutes</span>
          <div className="space-x-2">
            <button
              onClick={() => onSelect(activity)}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Details
            </button>
            <button
              onClick={onAddToSession}
              className="text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 