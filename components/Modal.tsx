import React, { ReactNode } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
};

const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  if (!isOpen) return null;

  
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 px-4 sm:px-4 py-6"
      onClick={handleOverlayClick}
    
    >
      <div className="relative w-full max-w-lg  rounded-2xl shadow-xl max-h-[90vh] overflow-y-auto p-4 sm:p-6"
        onClick={e => e.stopPropagation()}
       
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl focus:outline-none transition"
          aria-label="Close"
        >
          ✖
        </button>

        {title && (
          <h2 className="text-xl font-semibold text-center text-gray-800 mb-4 ">
            {title}
          </h2>
        )}

        <div className="w-full py-7 sm:py-4">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
