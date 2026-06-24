import { ChevronDown } from 'lucide-react'
import '../styles/ChecklistGroup.css'

export default function ChecklistGroup({
  group,
  items,
  checkedItems,
  onCheckboxChange,
  isExpanded,
  onToggleExpand,
}) {
  const totalItems = items.length
  const checkedCount = items.filter((item) => checkedItems[item.id]).length
  const percentage =
    totalItems > 0 ? Math.round((checkedCount / totalItems) * 100) : 0

  return (
    <div className="checklist-group">
      <button
        type="button"
        className="group-header"
        onClick={() => onToggleExpand(group.id)}
      >
        <ChevronDown
          className={`chevron-icon ${isExpanded ? 'expanded' : ''}`}
        />
        <div className="group-header-content">
          <h3 className="group-title">{group.name}</h3>
          <div className="group-stats">
            <span className="group-percentage">
              {checkedCount}/{totalItems} ({percentage}%)
            </span>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        </div>
      </button>

      {isExpanded && (
        <div className="group-items">
          {items.map((item) => (
            <div key={item.id} className="checkbox-item">
              <input
                type="checkbox"
                id={item.id}
                name={item.id}
                checked={checkedItems[item.id] || false}
                onChange={(e) => onCheckboxChange(item.id, e.target.checked)}
              />
              <label htmlFor={item.id}>{item.label}</label>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
