import { useEffect, useRef } from 'react';
import ReactGA from 'react-ga4';

export const trackEvent = (eventName: string, params: Record<string, any> = {}) => {
  const consent = localStorage.getItem('analytics_consent');
  if (consent === 'accepted') {
    ReactGA.event(eventName, params);
  }
};

export const useAnalyticsTracking = () => {
  const depthsTracked = useRef<Set<number>>(new Set());

  useEffect(() => {
    // Time on page tracking (60s)
    const timer = setTimeout(() => {
      trackEvent('time_on_page', { duration: 60 });
    }, 60000);

    // Scroll depth tracking
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      const depth = Math.round((scrolled / scrollHeight) * 100);

      const milestones = [25, 50, 75, 100];
      for (const m of milestones) {
        if (depth >= m && !depthsTracked.current.has(m)) {
          depthsTracked.current.add(m);
          trackEvent('scroll_depth', { percent: m });
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
};
