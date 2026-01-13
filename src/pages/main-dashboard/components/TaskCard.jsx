import React from 'react';
import Icon from '../../../components/AppIcon';
import { Checkbox } from '../../../components/ui/Checkbox';

const TaskCard = ({ task, onToggleComplete, onEdit, onDelete }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent':
        return 'bg-error/10 border-error text-error';
      case 'high':
        return 'bg-warning/10 border-warning text-warning';
      case 'medium':
        return 'bg-accent/10 border-accent text-accent';
      case 'low':
        return 'bg-success/10 border-success text-success';
      default:
        return 'bg-muted border-border text-muted-foreground';
    }
  };

  const getPriorityLabel = (priority) => {
    switch (priority) {
      case 'urgent':
        return 'Urgent';
      case 'high':
        return 'High';
      case 'medium':
        return 'Medium';
      case 'low':
        return 'Low';
      default:
        return 'Normal';
    }
  };

  const isOverdue = () => {
    const today = new Date();
    today?.setHours(0, 0, 0, 0);
    const dueDate = new Date(task.dueDate);
    dueDate?.setHours(0, 0, 0, 0);
    return dueDate < today && task?.status !== 'completed';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    today?.setHours(0, 0, 0, 0);
    const taskDate = new Date(dateString);
    taskDate?.setHours(0, 0, 0, 0);
    
    const diffTime = taskDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    if (diffDays === -1) return 'Yesterday';
    if (diffDays < 0) return `${Math.abs(diffDays)} days overdue`;
    if (diffDays <= 7) return `In ${diffDays} days`;
    
    return date?.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div 
      className={`bg-card rounded-xl border transition-all duration-250 ${
        task?.status === 'completed' 
          ? 'border-border opacity-60' 
          : isOverdue() 
            ? 'border-error shadow-medium' 
            : 'border-border shadow-soft hover:shadow-medium'
      }`}
    >
      <div className="p-4 md:p-5 lg:p-6">
        <div className="flex items-start gap-3 md:gap-4">
          <div className="flex-shrink-0 mt-1">
            <Checkbox
              checked={task?.status === 'completed'}
              onChange={() => onToggleComplete(task?.id)}
              size="lg"
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4 mb-2 md:mb-3">
              <h3 
                className={`text-base md:text-lg font-medium leading-tight ${
                  task?.status === 'completed' 
                    ? 'line-through text-muted-foreground' :'text-card-foreground'
                }`}
              >
                {task?.title}
              </h3>
              
              <div className="flex items-center gap-2 flex-shrink-0">
                <span 
                  className={`px-2 md:px-3 py-1 rounded-lg text-xs md:text-sm font-medium border ${getPriorityColor(task?.priority)}`}
                >
                  {getPriorityLabel(task?.priority)}
                </span>
              </div>
            </div>

            {task?.description && (
              <p className="text-sm md:text-base text-muted-foreground mb-3 md:mb-4 line-clamp-2">
                {task?.description}
              </p>
            )}

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex items-center gap-2 text-xs md:text-sm">
                <Icon 
                  name="Calendar" 
                  size={16} 
                  color={isOverdue() ? 'var(--color-error)' : 'var(--color-muted-foreground)'} 
                />
                <span className={isOverdue() ? 'text-error font-medium' : 'text-muted-foreground'}>
                  {formatDate(task?.dueDate)}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onEdit(task)}
                  className="p-2 rounded-lg hover:bg-muted transition-colors duration-250"
                  aria-label="Edit task"
                >
                  <Icon name="Edit2" size={18} color="var(--color-primary)" />
                </button>
                <button
                  onClick={() => onDelete(task?.id)}
                  className="p-2 rounded-lg hover:bg-error/10 transition-colors duration-250"
                  aria-label="Delete task"
                >
                  <Icon name="Trash2" size={18} color="var(--color-error)" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;