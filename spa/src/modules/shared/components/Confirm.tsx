import { ReactNode } from "react";
import { Modal } from "./Modal";

interface ConfirmProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  children: ReactNode;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'warning' | 'info';
}

const variants = {
  danger: {
    button: 'bg-red-500 hover:bg-red-600 focus:ring-red-500',
    icon: 'text-red-500',
  },
  warning: {
    button: 'bg-yellow-500 hover:bg-yellow-600 focus:ring-yellow-500',
    icon: 'text-yellow-500',
  },
  info: {
    button: 'bg-blue-500 hover:bg-blue-600 focus:ring-blue-500',
    icon: 'text-blue-500',
  },
};

export const Confirm = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  children,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  variant = 'danger'
}: ConfirmProps) => {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="space-y-4">
        <div className="text-gray-600">
          {children}
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-zinc-700 bg-zinc-100 rounded-md hover:bg-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className={`px-4 py-2 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${variants[variant].button}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
}; 