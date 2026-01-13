import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmptyState = ({ onAddTask, hasFilters }) => {
  return (
    <div className="bg-card rounded-xl border border-border shadow-soft p-8 md:p-12 lg:p-16 text-center">
      <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-muted mx-auto mb-4 md:mb-6 flex items-center justify-center">
        <Icon 
          name={hasFilters ? "Search" : "ListTodo"} 
          size={40} 
          color="var(--color-muted-foreground)" 
        />
      </div>
      
      <h3 className="text-xl md:text-2xl font-semibold text-card-foreground mb-2 md:mb-3">
        {hasFilters ? 'No Tasks Found' : 'No Tasks Yet'}
      </h3>
      
      <p className="text-sm md:text-base text-muted-foreground mb-6 md:mb-8 max-w-md mx-auto">
        {hasFilters 
          ? 'No tasks match your current filters. Try adjusting your filter criteria or create a new task.' :'Get started by creating your first task. Stay organized and track your progress effortlessly.'}
      </p>
      
      {!hasFilters && (
        <Button
          variant="default"
          onClick={onAddTask}
          iconName="Plus"
          iconPosition="left"
        >
          Create Your First Task
        </Button>
      )}
    </div>
  );
};

export default EmptyState;