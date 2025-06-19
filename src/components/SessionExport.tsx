import type { Activity } from '../data/activities'
import { ClipboardDocumentListIcon, ClockIcon, XMarkIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline'

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
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border-2 border-blue-100">
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-t-2xl px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ArrowDownTrayIcon className="w-8 h-8 text-white" />
            <h2 className="text-2xl font-bold text-white drop-shadow">Session Plan Export</h2>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-blue-100 transition-colors duration-200"
            aria-label="Close"
          >
            <XMarkIcon className="w-7 h-7" />
          </button>
        </div>
        <div className="p-6 space-y-8">
          <div className="bg-blue-50 rounded-xl p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-3">
              <ClockIcon className="w-6 h-6 text-blue-400" />
              <span className="text-blue-900 font-semibold text-lg">Total Duration: {totalDuration} minutes</span>
            </div>
            <span className="text-blue-700 font-medium">Number of Activities: {activities.length}</span>
          </div>
          <div>
            <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
              <ClipboardDocumentListIcon className="w-6 h-6 text-blue-400" /> Activities
            </h3>
            <div className="space-y-4">
              {activities.map((activity, index) => (
                <div key={activity.id} className="border border-blue-100 rounded-xl p-4 bg-white shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h4 className="font-semibold text-lg text-gray-900 leading-tight mb-1">{index + 1}. {activity.name}</h4>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="flex items-center gap-1 text-blue-700 bg-blue-50 px-2 py-1 rounded-full text-xs font-medium">
                        <ClockIcon className="w-4 h-4" />
                        {activity.duration} min
                      </span>
                      <span className="text-xs text-gray-500">{activity.phase}</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h5 className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                      <ClipboardDocumentListIcon className="w-4 h-4 text-gray-400" /> Materials Needed
                    </h5>
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
          <div className="flex justify-end space-x-4 pt-4 border-t border-gray-100">
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-lg bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 transition-colors duration-200"
            >
              Close
            </button>
            <button
              onClick={handlePrint}
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-lg font-semibold shadow hover:from-blue-600 hover:to-purple-600 transition-all duration-200"
            >
              Print Session Plan
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 