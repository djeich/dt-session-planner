interface FilterBarProps {
  onFilterChange: (filters: { phase: string; ageGroup: string }) => void;
}

const FilterBar = ({ onFilterChange }: FilterBarProps) => {
  const phases = ['All Phases', 'Empathize', 'Define', 'Ideate', 'Prototype', 'Test']
  const ageGroups = ['All Ages', 'Elementary School', 'Middle School', 'High School']

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phase</label>
          <select
            onChange={(e) => onFilterChange({ phase: e.target.value, ageGroup: 'All Ages' })}
            className="w-full p-2 border rounded-md"
          >
            {phases.map((phase) => (
              <option key={phase} value={phase}>
                {phase}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Age Group</label>
          <select
            onChange={(e) => onFilterChange({ phase: 'All Phases', ageGroup: e.target.value })}
            className="w-full p-2 border rounded-md"
          >
            {ageGroups.map((ageGroup) => (
              <option key={ageGroup} value={ageGroup}>
                {ageGroup}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}

export default FilterBar 