import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SuccessMessage = ({ taskTitle, onClose, onAddAnother }) => {
  return (
    <div className="p-6 md:p-8 text-center">
      <div className="w-16 h-16 md:w-20 md:h-20 mx-auto rounded-full bg-success/10 flex items-center justify-center mb-4 md:mb-6">
        <Icon 
          name="CheckCircle2" 
          size={40} 
          color="var(--color-success)" 
        />
      </div>
      
      <h3 className="text-xl md:text-2xl font-semibold text-card-foreground mb-2">
        Task Created Successfully!
      </h3>
      
      <p className="text-sm md:text-base text-muted-foreground mb-6 md:mb-8">
        <span className="font-medium text-foreground">"{taskTitle}"</span> has been added to your task list
      </p>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          iconName="ArrowLeft"
          iconPosition="left"
          fullWidth
          className="sm:w-auto"
        >
          Back to Dashboard
        </Button>
        <Button
          type="button"
          variant="default"
          onClick={onAddAnother}
          iconName="Plus"
          iconPosition="left"
          fullWidth
          className="sm:w-auto"
        >
          Add Another Task
        </Button>
      </div>
    </div>
  );
};

export default SuccessMessage;