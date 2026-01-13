import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DeleteConfirmation = ({ isOpen, onClose, onConfirm, taskTitle, isDeleting }) => {
  React.useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose?.();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[1100] flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose?.(); }}
      role="presentation"
    >
      <div 
        className="w-full max-w-md bg-card rounded-2xl shadow-xl"
        onClick={(e) => e?.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-title"
      >
        <div className="p-4 md:p-6">
          <div className="flex items-start gap-3 md:gap-4 mb-4 md:mb-6">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-error/10 flex items-center justify-center flex-shrink-0">
              <Icon name="AlertTriangle" size={20} color="var(--color-error)" className="md:w-6 md:h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 id="delete-title" className="text-lg md:text-xl font-semibold text-card-foreground mb-1 md:mb-2">
                Delete Task?
              </h3>
              <p className="text-xs md:text-sm text-muted-foreground">
                Are you sure you want to delete "{taskTitle}"? This action cannot be undone.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 md:gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isDeleting}
              size="sm"
              className="md:text-base"
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={onConfirm}
              loading={isDeleting}
              iconName="Trash2"
              iconPosition="left"
              size="sm"
              className="md:text-base"
            >
              Delete Task
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmation;