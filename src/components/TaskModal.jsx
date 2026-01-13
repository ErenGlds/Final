import React, { useState, useEffect } from 'react';
import Icon from './AppIcon';
import Button from './ui/Button';
import Input from './ui/Input';
import Select from './ui/Select';

const TaskModal = ({ isOpen, onClose, onSubmit, taskData, mode = 'add' }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: '',
    status: 'pending'
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (taskData && mode === 'edit') {
      setFormData({
        title: taskData?.title || '',
        description: taskData?.description || '',
        priority: taskData?.priority || 'medium',
        dueDate: taskData?.dueDate || '',
        status: taskData?.status || 'pending'
      });
    } else {
      setFormData({
        title: '',
        description: '',
        priority: 'medium',
        dueDate: '',
        status: 'pending'
      });
    }
    setErrors({});
  }, [taskData, mode, isOpen]);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event?.key === 'Escape' && isOpen) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleClose = () => {
    if (!isSubmitting) {
      setFormData({
        title: '',
        description: '',
        priority: 'medium',
        dueDate: '',
        status: 'pending'
      });
      setErrors({});
      onClose();
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.title?.trim()) {
      newErrors.title = 'Task title is required';
    } else if (formData?.title?.trim()?.length < 3) {
      newErrors.title = 'Task title must be at least 3 characters';
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

  const handleSubmit = async (e) => {
    e?.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await onSubmit(formData);
      handleClose();
    } catch (error) {
      setErrors({ submit: 'Failed to save task. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
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

  const priorityOptions = [
    { value: 'low', label: 'Low Priority', description: 'Can be done later' },
    { value: 'medium', label: 'Medium Priority', description: 'Normal importance' },
    { value: 'high', label: 'High Priority', description: 'Important task' },
    { value: 'urgent', label: 'Urgent', description: 'Needs immediate attention' }
  ];

  const statusOptions = [
    { value: 'pending', label: 'Pending', description: 'Not started yet' },
    { value: 'in-progress', label: 'In Progress', description: 'Currently working on it' },
    { value: 'completed', label: 'Completed', description: 'Task finished' }
  ];

  if (!isOpen) return null;

  return (
    <div className="task-modal-backdrop" onClick={handleClose}>
      <div 
        className="task-modal-content" 
        onClick={(e) => e?.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="task-modal-header">
          <h2 id="modal-title" className="task-modal-title">
            {mode === 'edit' ? 'Edit Task' : 'Add New Task'}
          </h2>
          <button
            className="task-modal-close"
            onClick={handleClose}
            disabled={isSubmitting}
            aria-label="Close modal"
          >
            <Icon name="X" size={24} color="var(--color-muted-foreground)" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="task-modal-body">
            <div className="space-y-6">
              <Input
                label="Task Title"
                type="text"
                placeholder="Enter task title"
                value={formData?.title}
                onChange={(e) => handleChange('title', e?.target?.value)}
                error={errors?.title}
                required
                disabled={isSubmitting}
              />

              <Input
                label="Description"
                type="text"
                placeholder="Add task description (optional)"
                value={formData?.description}
                onChange={(e) => handleChange('description', e?.target?.value)}
                disabled={isSubmitting}
              />

              <Select
                label="Priority"
                options={priorityOptions}
                value={formData?.priority}
                onChange={(value) => handleChange('priority', value)}
                required
                disabled={isSubmitting}
              />

              <Input
                label="Due Date"
                type="date"
                value={formData?.dueDate}
                onChange={(e) => handleChange('dueDate', e?.target?.value)}
                error={errors?.dueDate}
                required
                disabled={isSubmitting}
              />

              {mode === 'edit' && (
                <Select
                  label="Status"
                  options={statusOptions}
                  value={formData?.status}
                  onChange={(value) => handleChange('status', value)}
                  required
                  disabled={isSubmitting}
                />
              )}

              {errors?.submit && (
                <div className="text-sm text-error bg-error/10 px-4 py-3 rounded-xl">
                  {errors?.submit}
                </div>
              )}
            </div>
          </div>

          <div className="task-modal-footer">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="default"
              loading={isSubmitting}
              iconName="Check"
              iconPosition="left"
            >
              {mode === 'edit' ? 'Update Task' : 'Create Task'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;