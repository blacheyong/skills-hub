'use client';

import { useEffect, useState } from 'react';

interface ToastProps {
  message: string;
  visible: boolean;
  onHide: () => void;
  duration?: number;
}

export function Toast({ message, visible, onHide, duration = 2000 }: ToastProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (visible) {
      // Trigger enter animation on next frame
      requestAnimationFrame(() => setShow(true));
      const timer = setTimeout(() => {
        setShow(false);
        setTimeout(onHide, 300);
      }, duration);
      return () => clearTimeout(timer);
    } else {
      setShow(false);
    }
  }, [visible, duration, onHide]);

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-6 right-6 z-50 pointer-events-none"
      style={{
        transition: 'transform 0.3s cubic-bezier(0.23, 1, 0.32, 1), opacity 0.3s cubic-bezier(0.23, 1, 0.32, 1)',
        transform: show ? 'translateY(0)' : 'translateY(12px)',
        opacity: show ? 1 : 0,
      }}
    >
      <div className="pointer-events-auto rounded-lg bg-[#2e2e30] px-4 py-2.5 text-sm font-medium text-white shadow-lg">
        {message}
      </div>
    </div>
  );
}

export default Toast;
