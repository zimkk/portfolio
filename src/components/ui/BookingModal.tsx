import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';

      return () => {
        document.body.style.overflow = 'unset';
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[9999] p-2 sm:p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-black border border-gray-800/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 w-full max-w-sm sm:max-w-2xl lg:max-w-4xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">Schedule a Call</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-1 sm:p-2 hover:bg-gray-800/50 rounded-lg"
          >
            <X size={20} className="sm:w-6 sm:h-6" />
          </button>
        </div>
        <div className="relative w-full h-[400px] sm:h-[450px] lg:h-[500px]">
          <iframe
            src="https://cal.com/hassan-nazir"
            width="100%"
            height="100%"
            frameBorder="0"
            className="rounded-lg sm:rounded-xl border border-gray-800/50"
            title="Schedule a call with Hassan Nazir"
            allow="camera; microphone; fullscreen; speaker; display-capture"
          />
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
