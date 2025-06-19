import type { Activity } from '../data/activities'
import { ClipboardList, Clock } from 'lucide-react'
import { CheckCircleIcon, XMarkIcon } from '@heroicons/react/24/outline'

interface ActivityDetailProps {
  activity: Activity;
  onClose: () => void;
  onAddToSession: () => void;
}

export const ActivityDetail = ({ activity, onClose, onAddToSession }: ActivityDetailProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border-2 border-blue-100">
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-t-2xl px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold text-white drop-shadow">{activity.name}</h2>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-blue-100 transition-colors duration-200"
            aria-label="Close"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="font-semibold mb-2 flex items-center gap-1"><Clock size={18} /> Duration</h3>
              <p className="text-gray-600">{activity.duration} minutes</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2 flex items-center gap-1"><ClipboardList size={18} /> Age Group</h3>
              <p className="text-gray-600">{activity.ageGroup}</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl border border-blue-100 p-4 shadow-sm">
              <h3 className="text-lg font-semibold text-blue-700 mb-2 flex items-center gap-2">
                <ClipboardList size={18} /> Materials Needed
              </h3>
              <ul className="space-y-1 text-gray-700">
                {activity.materials.map((material, index) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-block w-3 h-3 bg-blue-400 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                    <span className="leading-relaxed">{material}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-xl border border-purple-100 p-4 shadow-sm">
              <h3 className="text-lg font-semibold text-purple-700 mb-2 flex items-center gap-2">
                <Clock size={18} /> Instructions
              </h3>
              <ol className="space-y-1 text-gray-700">
                {activity.instructions.map((instruction, index) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-block w-6 h-6 bg-purple-100 text-purple-700 rounded-full text-xs font-bold flex items-center justify-center mt-0.5 mr-2 flex-shrink-0">
                      {index + 1}
                    </span>
                    <span className="leading-relaxed">{instruction}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
          <div className="bg-green-50 rounded-xl border border-green-100 p-4 shadow-sm">
            <h3 className="text-lg font-semibold text-green-700 mb-2 flex items-center gap-2">
              <CheckCircleIcon className="w-4 h-4 text-green-400" /> Tips
            </h3>
            <ul className="space-y-1 text-gray-700">
              {activity.tips.map((tip, index) => (
                <li key={index} className="flex items-start">
                  <span className="inline-block w-3 h-3 bg-green-400 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                  <span className="leading-relaxed">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex justify-end items-center pt-4 border-t border-gray-100 mt-2 gap-4">
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-lg bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 transition-colors duration-200"
            >
              Close
            </button>
            <button
              onClick={onAddToSession}
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-lg font-semibold shadow hover:from-blue-600 hover:to-purple-600 transition-all duration-200"
            >
              + Add to Session
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 