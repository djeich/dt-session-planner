import type { Activity } from '../data/activities'

interface ActivityDetailProps {
  activity: Activity;
  onClose: () => void;
  onAddToSession: () => void;
}

export const ActivityDetail = ({ activity, onClose, onAddToSession }: ActivityDetailProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold text-gray-900 leading-tight">{activity.name}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              ✕
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 leading-tight">Description</h3>
              <p className="text-gray-600 leading-relaxed">{activity.description}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 leading-tight">Materials Needed</h3>
              <ul className="space-y-1 text-gray-600">
                {activity.materials.map((material, index) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-block w-1 h-1 bg-gray-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                    <span className="leading-relaxed">{material}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 leading-tight">Instructions</h3>
              <ol className="space-y-1 text-gray-600">
                {activity.instructions.map((instruction, index) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-block w-5 h-5 bg-blue-100 text-blue-800 rounded-full text-xs font-medium flex items-center justify-center mt-0.5 mr-2 flex-shrink-0">
                      {index + 1}
                    </span>
                    <span className="leading-relaxed">{instruction}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 leading-tight">Tips</h3>
              <ul className="space-y-1 text-gray-600">
                {activity.tips.map((tip, index) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-block w-1 h-1 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                    <span className="leading-relaxed">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-gray-200">
              <span className="text-gray-600 leading-relaxed">Duration: {activity.duration} minutes</span>
              <button
                onClick={onAddToSession}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-200"
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