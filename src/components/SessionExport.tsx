import type { Activity } from '../data/activities'

interface SessionExportProps {
  activities: Activity[];
  onClose: () => void;
}

export const SessionExport = ({ activities, onClose }: SessionExportProps) => {
  const totalDuration = activities.reduce((sum, activity) => sum + activity.duration, 0)

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-2xl font-bold text-gray-900 leading-tight">Session Plan</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              ✕
            </button>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-2 leading-tight">Session Overview</h3>
              <p className="text-gray-600 leading-relaxed">
                Total Duration: {totalDuration} minutes
              </p>
              <p className="text-gray-600 leading-relaxed">
                Number of Activities: {activities.length}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 leading-tight">Activities</h3>
              <div className="space-y-4">
                {activities.map((activity, index) => (
                  <div key={activity.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-gray-900 leading-tight">{index + 1}. {activity.name}</h4>
                        <p className="text-sm text-gray-600 mt-1 leading-relaxed">{activity.duration} minutes</p>
                      </div>
                      <span className="text-sm font-medium text-gray-500">{activity.phase}</span>
                    </div>
                    <div className="mt-4">
                      <h5 className="text-sm font-medium text-gray-700 mb-2 leading-tight">Materials Needed:</h5>
                      <ul className="space-y-1 text-sm text-gray-600">
                        {activity.materials.map((material, i) => (
                          <li key={i} className="flex items-start">
                            <span className="inline-block w-1 h-1 bg-gray-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                            <span className="leading-relaxed">{material}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
              >
                Close
              </button>
              <button
                onClick={handlePrint}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-200"
              >
                Print Session Plan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 