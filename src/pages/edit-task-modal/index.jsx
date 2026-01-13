import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import TaskForm from './components/TaskForm';
import DeleteConfirmation from './components/DeleteConfirmation';
import ModalHeader from './components/ModalHeader';
import ModalActions from './components/ModalActions';

const EditTaskModal = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const taskData = location?.state?.task;

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: '',
    status: 'pending'
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    if (!taskData) {
      navigate('/main-dashboard');
      return;
    }

    setFormData({
      title: taskData?.title || '',
      description: taskData?.description || '',
      priority: taskData?.priority || 'medium',
      dueDate: taskData?.dueDate || '',
      status: taskData?.status || 'pending'
    });
  }, [taskData, navigate]);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event?.key === 'Escape' && !showDeleteConfirm) {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [showDeleteConfirm]);

  const handleClose = () => {
    if (!isSubmitting && !isDeleting) {
      navigate('/main-dashboard');
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
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      navigate('/main-dashboard', { 
        state: { 
          updatedTask: { 
            ...taskData, 
            ...formData,
            updatedAt: new Date()?.toISOString()
          },
          message: 'Task updated successfully'
        } 
      });
    } catch (error) {
      setErrors({ submit: 'Failed to update task. Please try again.' });
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      navigate('/main-dashboard', { 
        state: { 
          deletedTaskId: taskData?.id,
          message: 'Task deleted successfully'
        } 
      });
    } catch (error) {
      setErrors({ submit: 'Failed to delete task. Please try again.' });
      setIsDeleting(false);
      setShowDeleteConfirm(false);
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

  if (!taskData) {
    return null;
  }

  return (
    <>
      <div 
        className="fixed inset-0 bg-background z-[1000] flex items-center justify-center p-0 sm:p-5"
        onClick={handleClose}
      >
        <div 
          className="w-full h-full sm:h-auto sm:max-w-2xl bg-card sm:rounded-2xl shadow-xl overflow-y-auto"
          onClick={(e) => e?.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <ModalHeader 
            taskTitle={taskData?.title}
            onClose={handleClose}
            isSubmitting={isSubmitting || isDeleting}
          />

          <form onSubmit={handleSubmit}>
            <div className="p-4 md:p-6">
              <TaskForm
                formData={formData}
                errors={errors}
                isSubmitting={isSubmitting || isDeleting}
                onChange={handleChange}
              />
            </div>

            <ModalActions
              onCancel={handleClose}
              onDelete={() => setShowDeleteConfirm(true)}
              onSave={handleSubmit}
              isSubmitting={isSubmitting}
              isDeleting={isDeleting}
            />
          </form>
        </div>
      </div>
      <DeleteConfirmation
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleDelete}
        taskTitle={formData?.title}
        isDeleting={isDeleting}
      />
    </>
  );
};

export default EditTaskModal;