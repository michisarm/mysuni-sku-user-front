import { useEffect, useState } from 'react';

interface useIntersectionObserverProps {
  root?: null;
  rootMargin?: string;
  threshold?: number;
  onIntersect: IntersectionObserverCallback;
}

export function useIntersectionObserver({
  root,
  rootMargin = '0px',
  threshold = 0,
  onIntersect,
}: useIntersectionObserverProps) {
  const [target, setTarget] = useState<HTMLElement | null | undefined>(null);
  console.log(target);
  useEffect(() => {
    if (!target) return;

    const observer: IntersectionObserver = new IntersectionObserver(
      onIntersect,
      { root, rootMargin, threshold }
    );
    observer.observe(target);

    return () => {
      observer.unobserve(target);
      observer.disconnect();
    };
  }, [onIntersect, root, rootMargin, target, threshold]);

  return { setTarget };
}
