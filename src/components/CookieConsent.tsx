import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ReactGA from 'react-ga4';

export function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('analytics_consent');
    if (!consent) {
      setShow(true);
    } else if (consent === 'accepted') {
      initGA();
    }
  }, []);

  const initGA = () => {
    const trackingId = import.meta.env.VITE_GA_TRACKING_ID;
    if (trackingId) {
      ReactGA.initialize(trackingId);
      ReactGA.send({ hitType: "pageview", page: window.location.pathname, title: "Home Page" });
    }
  };

  const handleAccept = () => {
    localStorage.setItem('analytics_consent', 'accepted');
    setShow(false);
    initGA();
  };

  const handleDecline = () => {
    localStorage.setItem('analytics_consent', 'declined');
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 150, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 150, opacity: 0 }}
          transition={{ type: 'spring', bounce: 0.3 }}
          className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6 pointer-events-none"
        >
          <div className="max-w-4xl mx-auto glass-3d border border-brand-accent/30 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 pointer-events-auto shadow-[0_-10px_40px_rgba(255,106,0,0.1)] bg-brand-bg/95 backdrop-blur-xl">
            <div className="flex-1">
              <h3 className="text-lg font-bold text-white mb-2 font-mono uppercase tracking-widest text-brand-accent flex items-center gap-2">
                <span className="w-2 h-2 bg-brand-accent rounded-full animate-pulse" />
                Data Connection Approval
              </h3>
              <p className="text-sm opacity-80 text-brand-text/90 font-sans leading-relaxed">
                We utilize telemetry cookies (Google Analytics 4) to monitor system performance and understand interaction patterns. Acceptance initiates the tracking protocols.
              </p>
            </div>
            <div className="flex gap-4 shrink-0">
              <button 
                onClick={handleDecline}
                className="px-6 py-3 rounded-xl text-xs font-bold font-mono tracking-widest uppercase border border-white/10 hover:bg-white/5 transition-colors text-white/70"
              >
                Abort
              </button>
              <button 
                onClick={handleAccept}
                className="px-6 py-3 rounded-xl text-xs font-bold font-mono tracking-widest uppercase bg-brand-accent hover:bg-brand-accent/80 text-brand-bg hover:shadow-[0_0_15px_rgba(255,106,0,0.5)] transition-all"
              >
                Acknowledge & Connect
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
