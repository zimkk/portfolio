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
          styles: { branding: { brandColor: '#08090c' } },
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
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', ease: [0.32, 0.72, 0, 1], duration: 0.35 }}
            role="dialog"
            aria-modal="true"
            aria-label="Schedule a session with Hassan Nazir"
            className="absolute right-0 top-0 h-full w-full sm:w-[85%] lg:w-[48%] max-w-2xl bg-[#08090c] border-l border-neutral-800/80 flex flex-col shadow-2xl"
          >
            {/* Personalized Header */}
            <div className="flex justify-between items-center px-6 py-4 border-b border-neutral-900 bg-[#08090c]">
              <div className="flex items-center gap-3.5">
                <div className="relative w-10 h-10 rounded-full overflow-hidden border border-neutral-700/60 shrink-0 bg-neutral-900">
                  <img
                    src="/images/profile-hero.webp"
                    alt="Hassan Nazir"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-[#08090c]" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-sm font-medium text-white tracking-tight">Hassan Nazir</h2>
                    <span className="inline-block px-1.5 py-0.2 rounded text-[10px] font-mono uppercase tracking-wider text-neutral-400 bg-neutral-900 border border-neutral-800">30 min</span>
                  </div>
                  <p className="text-xs text-neutral-400">Forward Deployed Engineering · Pick a time</p>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="p-2 rounded-md text-neutral-400 hover:text-white hover:bg-white/5 transition-colors duration-200"
              >
                <X size={18} />
              </button>
            </div>

            {/* Calendar Canvas */}
            <div className="flex-1 w-full h-full overflow-y-auto bg-[#08090c]">
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


