// components/filters/ItemFilter.tsx
import React from "react";
interface ItemFilterProps {
  filters: {
    type: string;
    dateRange: string;
    customFrom: string;
    customTo: string;
    titleSearch: string;
  };
  onChange: (name: string, value: string) => void;
  onReset?: () => void;
}

const ItemFilter: React.FC<ItemFilterProps> = ({ filters, onChange, onReset }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    onChange(name, value);
  };

    return (
      <div className="grid grid-cols-6 gap-2 w-full">
        <select
          name="type"
          value={filters.type}
          onChange={handleChange}
          className="border rounded px-1 py-1 w-full"
        >
          <option value="">All Types</option>
          <option value="company">Company</option>
          <option value="school">School</option>
        </select>

        <select
          name="dateRange"
          value={filters.dateRange}
          onChange={handleChange}
          className="border rounded px-1 py-1 w-full"
        >
          <option value="all">All Dates</option>
          <option value="today">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="year">This Year</option>
          <option value="custom">Custom Range</option>
        </select>

        {filters.dateRange === "custom" && (
          <>
            <input
              type="date"
              name="customFrom"
              value={filters.customFrom}
              onChange={handleChange}
              className="border rounded px-1 py-1 w-full"
            />
            <input
              type="date"
              name="customTo"
              value={filters.customTo}
              onChange={handleChange}
              className="border rounded px-1 py-1 w-full"
            />
          </>
        )}

        <input
          type="text"
          name="titleSearch"
          value={filters.titleSearch}
          onInput={(e) =>
            onChange(e.currentTarget.name, e.currentTarget.value)
          }
          placeholder="Search by title"
          className="border rounded px-1 py-1 w-full"
        />

        <button
          onClick={onReset}
          className="text-sm px-1 py-1 text-gray-700 border rounded hover:bg-gray-100 w-[100px] cursor-pointer w-full"
          type="button"
        >
          Reset Filters
        </button>
      </div>

  );
};

export default ItemFilter;
