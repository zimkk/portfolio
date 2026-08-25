import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import Cal, { getCalApi } from '@calcom/embed-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (!isOpen) return;

    (async function initCal() {
      try {
        const cal = await getCalApi();
        cal('ui', {
          theme: 'dark',
          styles: { branding: { brandColor: '#000000' } },
          hideEventTypeDetails: false,
          layout: 'month_view',
        });
      } catch (err) {
        console.warn('Cal.com embed notice:', err);
      }
    })();

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

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[10000]">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />

          {/* Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', ease: [0.32, 0.72, 0, 1], duration: 0.35 }}
            role="dialog"
            aria-modal="true"
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

            <div className="flex-1 w-full h-full overflow-y-auto">
              <Cal
                calLink="hassan-nazir"
                style={{ width: '100%', height: '100%', overflow: 'auto' }}
                config={{ layout: 'month_view', theme: 'dark' }}
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default BookingModal;

