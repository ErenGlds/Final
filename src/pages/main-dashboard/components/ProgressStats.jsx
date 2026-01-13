import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressStats = ({ tasks }) => {
  const totalTasks = tasks?.length;
  const completedTasks = tasks?.filter(task => task?.status === 'completed')?.length;
  const pendingTasks = tasks?.filter(task => task?.status === 'pending')?.length;
  const inProgressTasks = tasks?.filter(task => task?.status === 'in-progress')?.length;
  
  const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const getOverdueTasks = () => {
    const today = new Date();
    today?.setHours(0, 0, 0, 0);
    return tasks?.filter(task => {
      const dueDate = new Date(task.dueDate);
      dueDate?.setHours(0, 0, 0, 0);
      return dueDate < today && task?.status !== 'completed';
    })?.length;
  };

  const overdueTasks = getOverdueTasks();

  const stats = [
    {
      label: 'Total Tasks',
      value: totalTasks,
      icon: 'ListTodo',
      color: 'var(--color-primary)',
      bgColor: 'bg-primary/10'
    },
    {
      label: 'Completed',
      value: completedTasks,
      icon: 'CheckCircle2',
      color: 'var(--color-success)',
      bgColor: 'bg-success/10'
    },
    {
      label: 'In Progress',
      value: inProgressTasks,
      icon: 'Clock',
      color: 'var(--color-accent)',
      bgColor: 'bg-accent/10'
    },
    {
      label: 'Overdue',
      value: overdueTasks,
      icon: 'AlertCircle',
      color: 'var(--color-error)',
      bgColor: 'bg-error/10'
    }
  ];

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="bg-card rounded-xl border border-border shadow-soft p-4 md:p-6">
        <div className="flex items-center justify-between mb-3 md:mb-4">
          <h3 className="text-base md:text-lg font-semibold text-card-foreground">
            Overall Progress
          </h3>
          <span className="text-xl md:text-2xl font-bold text-primary">
            {completionPercentage}%
          </span>
        </div>
        
        <div className="w-full bg-muted rounded-full h-3 md:h-4 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500 rounded-full"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
        
        <p className="text-xs md:text-sm text-muted-foreground mt-2 md:mt-3">
          {completedTasks} of {totalTasks} tasks completed
        </p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {stats?.map((stat, index) => (
          <div 
            key={index}
            className="bg-card rounded-xl border border-border shadow-soft p-4 md:p-5 transition-all duration-250 hover:shadow-medium"
          >
            <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl ${stat?.bgColor} flex items-center justify-center mb-3 md:mb-4`}>
              <Icon name={stat?.icon} size={20} color={stat?.color} />
            </div>
            <div className="text-2xl md:text-3xl font-bold text-card-foreground mb-1">
              {stat?.value}
            </div>
            <div className="text-xs md:text-sm text-muted-foreground">
              {stat?.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressStats;