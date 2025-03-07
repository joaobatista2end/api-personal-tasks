import { X } from "lucide-react";
import { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-black/50" 
        onClick={onClose}
      />
      
      <div className="relative bg-white rounded-lg w-full max-w-md p-4 shadow-lg">
      
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-zinc-800">{title}</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-zinc-100 rounded-full transition-colors"
          >
            <X size={20} className="text-zinc-500" />
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}; 