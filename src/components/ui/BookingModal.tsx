import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, onClose]);

  return createPortal(
    <div className={`fixed inset-0 z-[10000]${isOpen ? '' : ' pointer-events-none'}`} aria-hidden={!isOpen}>
      <motion.div
        initial={false}
        animate={{ opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
      />

      <motion.div
        initial={false}
        animate={{ x: isOpen ? 0 : '100%' }}
        transition={{ type: 'tween', ease: [0.32, 0.72, 0, 1], duration: 0.35 }}
        role="dialog"
        aria-modal={isOpen}
        aria-label="Schedule a call"
        className="absolute right-0 top-0 h-full w-full sm:w-[80%] lg:w-[45%] bg-black border-l border-neutral-800 flex flex-col"
      >
            <div className="flex justify-between items-center px-6 py-5 border-b border-neutral-900">
              <div>
                <h2 className="text-base font-medium text-white">Schedule a call</h2>
                <p className="mt-0.5 text-xs text-neutral-500">Pick a time that works for you</p>
              </div>
              <button
                onClick={onClose}
                aria-label="Close"
                className="p-2 rounded-md text-neutral-500 hover:text-white hover:bg-white/5 transition-colors duration-200"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex-1">
              <iframe
                src="https://cal.com/hassan-nazir"
                width="100%"
                height="100%"
                frameBorder="0"
                loading="eager"
                className="w-full h-full"
                title="Schedule a call with Hassan Nazir"
                allow="camera; microphone; fullscreen; speaker; display-capture"
              />
            </div>
      </motion.div>
    </div>,
    document.body
  );
};

export default BookingModal;
