import type { Activity } from '../data/activities'

interface ActivityDetailProps {
  activity: Activity;
  onClose: () => void;
  onAddToSession: () => void;
}

export const ActivityDetail = ({ activity, onClose, onAddToSession }: ActivityDetailProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold text-gray-900">{activity.name}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-600">{activity.description}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Materials Needed</h3>
              <ul className="list-disc list-inside text-gray-600">
                {activity.materials.map((material, index) => (
                  <li key={index}>{material}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Instructions</h3>
              <ol className="list-decimal list-inside text-gray-600">
                {activity.instructions.map((instruction, index) => (
                  <li key={index}>{instruction}</li>
                ))}
              </ol>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Tips</h3>
              <ul className="list-disc list-inside text-gray-600">
                {activity.tips.map((tip, index) => (
                  <li key={index}>{tip}</li>
                ))}
              </ul>
            </div>

            <div className="flex justify-between items-center pt-4 border-t">
              <span className="text-gray-600">Duration: {activity.duration} minutes</span>
              <button
                onClick={onAddToSession}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Add to Session
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 