import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleOutside = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node | null;
      if (modalRef.current && target && !modalRef.current.contains(target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleOutside, true);
    document.addEventListener('touchstart', handleOutside, true);

    return () => {
      document.removeEventListener('mousedown', handleOutside, true);
      document.removeEventListener('touchstart', handleOutside, true);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;


  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-start justify-center z-[9999] p-2 sm:p-4 pt-8 sm:pt-10 pointer-events-none"
    >
      <div ref={modalRef} className="bg-black border border-gray-800/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 w-full max-w-sm sm:max-w-2xl lg:max-w-4xl shadow-2xl pointer-events-auto" role="dialog" aria-modal="true">
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">Schedule a Call</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-1 sm:p-2 hover:bg-gray-800/50 rounded-lg"
          >
            <X size={20} className="sm:w-6 sm:h-6" />
          </button>
        </div>
        <div className="relative w-full h-[70vh] sm:h-[75vh]">
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
