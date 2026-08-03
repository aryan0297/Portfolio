'use client';

import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

export function GlobalUI() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const progress = total > 0 ? (window.scrollY / total) * 100 : 0;
      setScrollProgress(progress);
      setShowBackToTop(window.scrollY > 300);
    };

    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-[60] h-1 bg-transparent">
        <div className="h-full bg-gradient-to-r from-blue-400 to-cyan-400" style={{ width: `${scrollProgress}%` }} />
      </div>

      {showBackToTop ? (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 z-50 rounded-full bg-blue-500 p-3 text-white shadow-glow transition hover:bg-blue-400"
          aria-label="Back to top"
        >
          <ArrowUp size={18} />
        </button>
      ) : null}
    </>
  );
}
