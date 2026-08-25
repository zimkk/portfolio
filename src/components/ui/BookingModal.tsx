import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Calendar, Check, Clock, Copy, Globe, Mail, ShieldCheck, X } from 'lucide-react';
import Cal, { getCalApi } from '@calcom/embed-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [bookingCompleted, setBookingCompleted] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    let mounted = true;
    (async function initCal() {
      try {
        const cal = await getCalApi();
        if (mounted) {
          cal('ui', {
            theme: 'dark',
            styles: { branding: { brandColor: '#08090c' } },
            hideEventTypeDetails: false,
            layout: 'month_view',
          });

          cal('on', {
            action: 'bookingSuccessful',
            callback: () => {
              if (mounted) setBookingCompleted(true);
            },
          });
        }
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
      mounted = false;
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, onClose]);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText('https://cal.com/hassan-nazir');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[10000] flex justify-end" role="dialog" aria-modal="true" aria-label="Schedule a working session">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/65 backdrop-blur-sm"
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', ease: [0.32, 0.72, 0, 1], duration: 0.35 }}
            className="relative z-10 h-full w-full sm:w-[88%] lg:w-[48%] max-w-2xl bg-[#08090c] border-l border-neutral-800 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex justify-between items-center px-6 py-4 border-b border-neutral-800 bg-[#08090c]">
              <div>
                <h2 className="text-base font-medium text-white flex items-center gap-2">
                  <Calendar size={16} className="text-neutral-400" />
                  Schedule a working session
                </h2>
                <p className="mt-0.5 text-xs text-neutral-400">Technical discovery, architecture review, or AI automations</p>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href="https://cal.com/hassan-nazir"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:inline-flex items-center gap-1.5 text-xs text-neutral-300 hover:text-white px-3 py-1.5 rounded border border-neutral-800 bg-neutral-900/60 hover:bg-neutral-800 transition-colors"
                >
                  <span>Open in Cal.com</span>
                  <ArrowUpRight size={13} />
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

            {/* Session Info Ribbon */}
            <div className="px-6 py-3 border-b border-neutral-900 bg-neutral-950/70 flex flex-wrap items-center justify-between gap-3 text-xs text-neutral-400">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5"><Clock size={13} className="text-neutral-500" /> 30 min session</span>
                <span className="flex items-center gap-1.5"><Globe size={13} className="text-neutral-500" /> US / Global timezones</span>
              </div>
              <button
                type="button"
                onClick={handleCopyLink}
                className="text-neutral-300 hover:text-white flex items-center gap-1.5 transition-colors"
              >
                {copied ? <><Check size={12} className="text-emerald-400" /> Copied!</> : <><Copy size={12} /> Copy direct link</>}
              </button>
            </div>

            {/* Success Notification if user completes booking */}
            {bookingCompleted && (
              <div className="mx-6 mt-4 p-4 rounded-lg bg-emerald-950/40 border border-emerald-800/60 text-xs text-emerald-200 flex items-start gap-3">
                <ShieldCheck size={18} className="text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-sm text-emerald-100 font-medium mb-0.5">Session Booked Successfully</strong>
                  <span>A calendar invite with Google Meet video link has been sent to your email. Looking forward to speaking!</span>
                </div>
              </div>
            )}

            {/* Cal.com Embed Container */}
            <div className="flex-1 w-full h-full overflow-y-auto bg-[#08090c] relative">
              <Cal
                calLink="hassan-nazir"
                style={{ width: '100%', height: '100%', minHeight: '620px', overflow: 'auto' }}
                config={{ layout: 'month_view', theme: 'dark' }}
              />

              {/* Instant Direct Action Bar at bottom */}
              <div className="p-4 border-t border-neutral-900 bg-neutral-950/80 flex items-center justify-between text-xs text-neutral-400">
                <span>Prefer asynchronous brief?</span>
                <a
                  href="mailto:hassannazir955@gmail.com?subject=Technical%20Working%20Session%20Brief"
                  className="flex items-center gap-1.5 text-neutral-300 hover:text-white hover:underline transition-colors"
                >
                  <Mail size={13} />
                  hassannazir955@gmail.com
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default BookingModal;

