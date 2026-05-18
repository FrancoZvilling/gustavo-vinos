import './PillFilter.css';

export default function PillFilter({ filters, activeFilter, onFilterChange }) {
  return (
    <div className="pill-filter" role="tablist">
      {filters.map((filter) => (
        <button
          key={filter.value}
          role="tab"
          aria-selected={activeFilter === filter.value}
          className={`pill-filter__item ${activeFilter === filter.value ? 'pill-filter__item--active' : ''}`}
          onClick={() => onFilterChange(filter.value)}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}
