import React from 'react';
import Icon from '../../../components/AppIcon';

const ModalHeader = ({ onClose, isSubmitting }) => {
  return (
    <div className="flex items-center justify-between p-4 md:p-6 border-b border-border">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center bg-primary/10">
          <Icon 
            name="Plus" 
            size={24} 
            color="var(--color-primary)" 
          />
        </div>
        <div>
          <h2 className="text-xl md:text-2xl font-semibold text-card-foreground">
            Add New Task
          </h2>
          <p className="text-xs md:text-sm text-muted-foreground mt-0.5">
            Create a task with priority and deadline
          </p>
        </div>
      </div>
      <button
        className="w-9 h-9 md:w-10 md:h-10 rounded-xl flex items-center justify-center cursor-pointer transition-all duration-250 hover:bg-muted active:scale-95"
        onClick={onClose}
        disabled={isSubmitting}
        aria-label="Close modal"
        type="button"
      >
        <Icon 
          name="X" 
          size={24} 
          color="var(--color-muted-foreground)" 
        />
      </button>
    </div>
  );
};

export default ModalHeader;