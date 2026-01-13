import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import ModalHeader from './components/ModalHeader';
import TaskForm from './components/TaskForm';
import SuccessMessage from './components/SuccessMessage';

const AddTaskModal = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [createdTaskTitle, setCreatedTaskTitle] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleEscape = (event) => {
      if (event?.key === 'Escape' && !isSubmitting) {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'auto';
    };
  }, [isSubmitting]);

  const handleClose = () => {
    if (!isSubmitting) {
      navigate('/main-dashboard');
    }
  };

  const handleSubmit = async (formData) => {
    setIsSubmitting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      const newTask = {
        id: Date.now(),
        title: formData?.title,
        description: formData?.description,
        priority: formData?.priority,
        dueDate: formData?.dueDate,
        status: 'pending',
        completed: false,
        createdAt: new Date()?.toISOString()
      };

      const existingTasks = JSON.parse(localStorage.getItem('taskflow_tasks') || '[]');
      existingTasks?.push(newTask);
      localStorage.setItem('taskflow_tasks', JSON.stringify(existingTasks));

      setCreatedTaskTitle(formData?.title);
      setShowSuccess(true);
    } catch (error) {
      console.error('Error creating task:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddAnother = () => {
    setShowSuccess(false);
    setCreatedTaskTitle('');
  };

  const handleBackToDashboard = () => {
    navigate('/main-dashboard');
  };

  return (
    <>
      <Helmet>
        <title>Add New Task - TaskFlow</title>
        <meta name="description" content="Create a new task with priority level and deadline in TaskFlow" />
      </Helmet>
      <div 
        className="fixed inset-0 bg-background/95 backdrop-blur-sm z-[1000] flex items-center justify-center p-4 md:p-6"
        onClick={handleClose}
      >
        <div 
          className="w-full max-w-2xl bg-card rounded-2xl shadow-xl overflow-hidden"
          onClick={(e) => e?.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          style={{
            maxHeight: 'calc(100vh - 32px)',
            animation: 'slideUp 250ms cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        >
          <style>
            {`
              @keyframes slideUp {
                from {
                  opacity: 0;
                  transform: translateY(20px);
                }
                to {
                  opacity: 1;
                  transform: translateY(0);
                }
              }
            `}
          </style>

          <ModalHeader 
            onClose={handleClose} 
            isSubmitting={isSubmitting} 
          />

          <div className="overflow-y-auto" style={{ maxHeight: 'calc(100vh - 180px)' }}>
            {showSuccess ? (
              <SuccessMessage
                taskTitle={createdTaskTitle}
                onClose={handleBackToDashboard}
                onAddAnother={handleAddAnother}
              />
            ) : (
              <div className="p-4 md:p-6">
                <TaskForm
                  onSubmit={handleSubmit}
                  onCancel={handleClose}
                  isSubmitting={isSubmitting}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AddTaskModal;