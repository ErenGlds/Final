import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const TaskForm = ({ formData, errors, isSubmitting, onChange }) => {
  const priorityOptions = [
    { 
      value: 'low', 
      label: 'Low Priority', 
      description: 'Can be done later' 
    },
    { 
      value: 'medium', 
      label: 'Medium Priority', 
      description: 'Normal importance' 
    },
    { 
      value: 'high', 
      label: 'High Priority', 
      description: 'Important task' 
    },
    { 
      value: 'urgent', 
      label: 'Urgent', 
      description: 'Needs immediate attention' 
    }
  ];

  const statusOptions = [
    { 
      value: 'pending', 
      label: 'Pending', 
      description: 'Not started yet' 
    },
    { 
      value: 'in-progress', 
      label: 'In Progress', 
      description: 'Currently working on it' 
    },
    { 
      value: 'completed', 
      label: 'Completed', 
      description: 'Task finished' 
    }
  ];

  return (
    <div className="space-y-4 md:space-y-6">
      <Input
        label="Task Title"
        type="text"
        placeholder="Enter task title"
        value={formData?.title}
        onChange={(e) => onChange('title', e?.target?.value)}
        error={errors?.title}
        required
        disabled={isSubmitting}
      />
      <Input
        label="Description"
        type="text"
        placeholder="Add task description (optional)"
        value={formData?.description}
        onChange={(e) => onChange('description', e?.target?.value)}
        disabled={isSubmitting}
      />
      <Select
        label="Priority"
        options={priorityOptions}
        value={formData?.priority}
        onChange={(value) => onChange('priority', value)}
        required
        disabled={isSubmitting}
      />
      <Input
        label="Due Date"
        type="date"
        value={formData?.dueDate}
        onChange={(e) => onChange('dueDate', e?.target?.value)}
        error={errors?.dueDate}
        required
        disabled={isSubmitting}
      />
      <Select
        label="Status"
        options={statusOptions}
        value={formData?.status}
        onChange={(value) => onChange('status', value)}
        required
        disabled={isSubmitting}
      />
      {errors?.submit && (
        <div className="text-xs md:text-sm text-error bg-error/10 px-3 py-2 md:px-4 md:py-3 rounded-xl">
          {errors?.submit}
        </div>
      )}
    </div>
  );
};

export default TaskForm;