import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, X } from 'lucide-react';
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
        console.warn('Cal.com embed init notice:', err);
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
        <div className="fixed inset-0 z-[10000] flex justify-end" role="dialog" aria-modal="true" aria-label="Schedule a call">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', ease: [0.32, 0.72, 0, 1], duration: 0.35 }}
            className="relative z-10 h-full w-full sm:w-[85%] lg:w-[48%] bg-[#08090c] border-l border-neutral-800 flex flex-col shadow-2xl"
          >
            <div className="flex justify-between items-center px-6 py-4 border-b border-neutral-800 bg-[#08090c]">
              <div>
                <h2 className="text-base font-medium text-white">Schedule a call</h2>
                <p className="mt-0.5 text-xs text-neutral-400">Pick a time that works for you</p>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href="https://cal.com/hassan-nazir"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs text-neutral-400 hover:text-white px-2.5 py-1.5 rounded-md hover:bg-white/5 transition-colors"
                  title="Open booking page in a new tab"
                >
                  <span>Open direct</span>
                  <ArrowUpRight size={14} />
                </a>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close modal"
                  className="p-2 rounded-md text-neutral-400 hover:text-white hover:bg-white/5 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            <div className="flex-1 w-full h-full overflow-y-auto bg-[#08090c]">
              <Cal
                calLink="hassan-nazir"
                style={{ width: '100%', height: '100%', minHeight: '600px', overflow: 'auto' }}
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
