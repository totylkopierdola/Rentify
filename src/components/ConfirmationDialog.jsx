import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/Dialog';
import { Button } from '@/components/ui';

const ConfirmationDialog = ({
  trigger,
  title,
  description,
  confirmLabel,
  onConfirm,
}) => {
  const [open, setOpen] = useState(false);

  const handleConfirm = () => {
    onConfirm();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div className=''>
        <DialogTrigger asChild>
          <div onClick={() => setOpen(true)}>{trigger}</div>
        </DialogTrigger>
        <DialogContent className='w-[90%] lg:w-auto'>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          <div className='flex flex-row justify-center gap-1'>
            <Button
              variant='destructive'
              className='w-full lg:w-40'
              onClick={handleConfirm}
            >
              {confirmLabel}
            </Button>
          </div>
        </DialogContent>
      </div>
    </Dialog>
  );
};

export default ConfirmationDialog;
