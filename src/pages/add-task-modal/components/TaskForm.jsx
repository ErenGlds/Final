import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const TaskForm = ({ onSubmit, onCancel, isSubmitting }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: ''
  });

  const [errors, setErrors] = useState({});

  const priorityOptions = [
    { 
      value: 'low', 
      label: 'Low Priority', 
      description: 'Can be completed later without urgency' 
    },
    { 
      value: 'medium', 
      label: 'Medium Priority', 
      description: 'Normal importance task' 
    },
    { 
      value: 'high', 
      label: 'High Priority', 
      description: 'Important task requiring attention' 
    }
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.title?.trim()) {
      newErrors.title = 'Task title is required';
    } else if (formData?.title?.trim()?.length < 3) {
      newErrors.title = 'Task title must be at least 3 characters';
    } else if (formData?.title?.trim()?.length > 100) {
      newErrors.title = 'Task title must not exceed 100 characters';
    }

    if (!formData?.dueDate) {
      newErrors.dueDate = 'Due date is required';
    } else {
      const selectedDate = new Date(formData.dueDate);
      const today = new Date();
      today?.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        newErrors.dueDate = 'Due date cannot be in the past';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();

    if (!validateForm()) {
      return;
    }

    onSubmit(formData);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const getTodayDate = () => {
    const today = new Date();
    const year = today?.getFullYear();
    const month = String(today?.getMonth() + 1)?.padStart(2, '0');
    const day = String(today?.getDate())?.padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
      <Input
        label="Task Title"
        type="text"
        placeholder="Enter task title (e.g., Complete project report)"
        value={formData?.title}
        onChange={(e) => handleChange('title', e?.target?.value)}
        error={errors?.title}
        required
        disabled={isSubmitting}
        description="Provide a clear and concise task name"
      />
      <Input
        label="Description"
        type="text"
        placeholder="Add optional task details or notes"
        value={formData?.description}
        onChange={(e) => handleChange('description', e?.target?.value)}
        disabled={isSubmitting}
        description="Additional context about the task (optional)"
      />
      <Select
        label="Priority Level"
        options={priorityOptions}
        value={formData?.priority}
        onChange={(value) => handleChange('priority', value)}
        required
        disabled={isSubmitting}
        description="Select task importance level"
      />
      <Input
        label="Due Date"
        type="date"
        value={formData?.dueDate}
        onChange={(e) => handleChange('dueDate', e?.target?.value)}
        error={errors?.dueDate}
        required
        disabled={isSubmitting}
        min={getTodayDate()}
        description="Choose task completion deadline"
      />
      <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-3 pt-2 md:pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isSubmitting}
          fullWidth
          className="sm:w-auto"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="default"
          loading={isSubmitting}
          iconName="Plus"
          iconPosition="left"
          fullWidth
          className="sm:w-auto"
        >
          Create Task
        </Button>
      </div>
    </form>
  );
};

export default TaskForm;