import React from 'react';
import Button from '../../../components/ui/Button';

const ModalActions = ({ onCancel, onDelete, onSave, isSubmitting, isDeleting }) => {
  return (
    <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-2 md:gap-3 p-4 md:p-6 border-t border-border">
      <Button
        type="button"
        variant="destructive"
        onClick={onDelete}
        disabled={isSubmitting || isDeleting}
        iconName="Trash2"
        iconPosition="left"
        size="sm"
        className="w-full sm:w-auto md:text-base"
      >
        Delete Task
      </Button>
      
      <div className="flex items-center gap-2 md:gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isSubmitting || isDeleting}
          size="sm"
          className="flex-1 sm:flex-none md:text-base"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="default"
          loading={isSubmitting}
          iconName="Check"
          iconPosition="left"
          size="sm"
          className="flex-1 sm:flex-none md:text-base"
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default ModalActions;