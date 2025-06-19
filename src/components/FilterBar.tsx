import React from 'react'
import { Filter } from 'lucide-react'

interface FilterBarProps {
  onFilterChange: (filters: { phase: string; ageGroup: string }) => void
}

export default function FilterBar({ onFilterChange }: FilterBarProps) {
  const phases = ['All Phases', 'Empathize', 'Define', 'Ideate', 'Prototype', 'Test']
  const ageGroups = ['All Ages', 'Elementary', 'Middle School', 'High School', 'University']

  return (
    <div className="filter-bar">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="w-5 h-5 text-blue-500" />
        <h3 className="font-semibold text-gray-900">Filter Activities</h3>
      </div>
      
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="phase" className="block text-sm font-medium text-gray-700 mb-1">
            Phase
          </label>
          <select
            id="phase"
            onChange={(e) => onFilterChange({ phase: e.target.value, ageGroup: 'All Ages' })}
            className="w-full p-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {phases.map(phase => (
              <option key={phase} value={phase}>
                {phase}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="ageGroup" className="block text-sm font-medium text-gray-700 mb-1">
            Age Group
          </label>
          <select
            id="ageGroup"
            onChange={(e) => onFilterChange({ phase: 'All Phases', ageGroup: e.target.value })}
            className="w-full p-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {ageGroups.map(age => (
              <option key={age} value={age}>
                {age}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
} 