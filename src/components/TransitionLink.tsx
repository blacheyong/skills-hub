'use client';

import { useRouter } from 'next/navigation';
import { navigateWithTransition } from '@/lib/navigate';
import type { CSSProperties, MouseEvent, ReactNode } from 'react';

interface TransitionLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  onMouseEnter?: (e: MouseEvent<HTMLAnchorElement>) => void;
  onMouseLeave?: (e: MouseEvent<HTMLAnchorElement>) => void;
}

export function TransitionLink({
  href,
  children,
  className,
  style,
  onMouseEnter,
  onMouseLeave,
}: TransitionLinkProps) {
  const router = useRouter();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    // Let cmd/ctrl/shift/middle-click open in new tab as expected
    if (
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey ||
      e.altKey ||
      e.button !== 0
    ) {
      return;
    }
    e.preventDefault();
    navigateWithTransition(router, href);
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className={className}
      style={style}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </a>
  );
}

export default TransitionLink;
