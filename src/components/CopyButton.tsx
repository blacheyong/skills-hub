'use client';

import { useState, useCallback } from 'react';
import { Copy, Check } from 'lucide-react';
import { Toast } from './Toast';

interface CopyButtonProps {
  text: string;
  className?: string;
}

export function CopyButton({ text, className = '' }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleCopy = useCallback(async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setShowToast(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setShowToast(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [text]);

  const handleHideToast = useCallback(() => {
    setShowToast(false);
  }, []);

  return (
    <>
      <button
        onClick={handleCopy}
        className={`relative z-10 inline-flex items-center justify-center rounded-md p-1.5 transition-colors duration-150 hover:bg-black/[0.05] active:bg-black/[0.08] ${className}`}
        aria-label={copied ? 'Copie' : 'Copier dans le presse-papier'}
        type="button"
      >
        {copied ? (
          <Check size={16} strokeWidth={1.8} className="text-green-600" />
        ) : (
          <Copy size={16} strokeWidth={1.8} className="text-[#8a8a8f]" />
        )}
      </button>
      <Toast message="Copie !" visible={showToast} onHide={handleHideToast} />
    </>
  );
}

export default CopyButton;
