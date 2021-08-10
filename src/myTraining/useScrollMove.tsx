import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const useScrollMove = () => {
  const [scrollPos, setScrollPos] = useState<any>(() =>
    sessionStorage.getItem('SCROLL_POS')
  );
  const scrollTop = parseInt(scrollPos, 0) || 0;
  const { collegeId } = useParams<{ collegeId: string }>();

  const scrollMove = useCallback(() => {
    if (!scrollPos && scrollPos !== 0) {
      return;
    }
    sessionStorage.removeItem('SCROLL_POS');
    setScrollPos(sessionStorage.getItem('SCROLL_POS'));
    if (scrollPos !== '0') {
      window.scrollTo(0, scrollPos);
    }
  }, [scrollPos]);

  const scrollOnceMove = useCallback(scrollMove, [scrollTop]);

  const scrollSave = () => {
    const scrollPos: number = document.documentElement.scrollTop
      ? document.documentElement.scrollTop
      : document.body.scrollTop;
    return sessionStorage.setItem('SCROLL_POS', JSON.stringify(scrollPos));
  };

  useEffect(() => {
    if (!collegeId) {
      sessionStorage.removeItem('channelOffset');
      sessionStorage.removeItem('channelSort');
    }
  }, [collegeId]);

  return { scrollMove, scrollOnceMove, scrollSave };
};

export function scrollSave() {
  const scrollPos: number = document.documentElement.scrollTop
    ? document.documentElement.scrollTop
    : document.body.scrollTop;
  return sessionStorage.setItem('SCROLL_POS', JSON.stringify(scrollPos));
}
