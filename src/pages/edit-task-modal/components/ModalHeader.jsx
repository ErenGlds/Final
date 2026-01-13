import React from 'react';
import Icon from '../../../components/AppIcon';

const ModalHeader = ({ taskTitle, onClose, isSubmitting }) => {
  return (
    <div className="flex items-center justify-between p-4 md:p-6 border-b border-border">
      <div className="flex-1 min-w-0 pr-4">
        <h2 className="text-xl md:text-2xl font-semibold text-card-foreground truncate">
          Edit Task
        </h2>
        <p className="text-xs md:text-sm text-muted-foreground mt-1 truncate">
          {taskTitle}
        </p>
      </div>
      <button
        className="w-8 h-8 md:w-9 md:h-9 rounded-xl flex items-center justify-center cursor-pointer transition-all duration-250 hover:bg-muted active:scale-95 flex-shrink-0"
        onClick={onClose}
        disabled={isSubmitting}
        aria-label="Close modal"
      >
        <Icon name="X" size={20} color="var(--color-muted-foreground)" className="md:w-6 md:h-6" />
      </button>
    </div>
  );
};

export default ModalHeader;