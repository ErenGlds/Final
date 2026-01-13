import React from 'react';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';

const FilterControls = ({ activeFilter, onFilterChange, activePriority, onPriorityChange }) => {
  const statusOptions = [
    { value: 'all', label: 'All Tasks', description: 'Show all tasks' },
    { value: 'pending', label: 'Pending', description: 'Not started yet' },
    { value: 'in-progress', label: 'In Progress', description: 'Currently working' },
    { value: 'completed', label: 'Completed', description: 'Finished tasks' }
  ];

  const priorityOptions = [
    { value: 'all', label: 'All Priorities', description: 'Show all priority levels' },
    { value: 'urgent', label: 'Urgent', description: 'Needs immediate attention' },
    { value: 'high', label: 'High Priority', description: 'Important tasks' },
    { value: 'medium', label: 'Medium Priority', description: 'Normal importance' },
    { value: 'low', label: 'Low Priority', description: 'Can be done later' }
  ];

  return (
    <div className="bg-card rounded-xl border border-border shadow-soft p-4 md:p-5 lg:p-6">
      <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-5">
        <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <Icon name="Filter" size={20} color="var(--color-primary)" />
        </div>
        <h3 className="text-base md:text-lg font-semibold text-card-foreground">
          Filter Tasks
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
        <Select
          label="Status"
          options={statusOptions}
          value={activeFilter}
          onChange={onFilterChange}
        />

        <Select
          label="Priority"
          options={priorityOptions}
          value={activePriority}
          onChange={onPriorityChange}
        />
      </div>
    </div>
  );
};

export default FilterControls;