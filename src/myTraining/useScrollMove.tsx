import { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

export const useScrollMove = () => {
  const history = useHistory();
  const [scrollPos, setScrollPos] = useState<any>(() => sessionStorage.getItem('SCROLL_POS'))
  const scrollTop = parseInt(scrollPos, 0) || 0;

  const scrollMove = () => {
    if (!scrollPos && scrollPos !== 0) {
      return;
    }
    sessionStorage.removeItem('SCROLL_POS');
    setScrollPos(sessionStorage.getItem('SCROLL_POS'));
    window.scrollTo(0, scrollPos);
  }

  const scrollOnceMove = useCallback(scrollMove, [scrollTop])

  const scrollSave = () => {
    const scrollPos: number = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop;
    return sessionStorage.setItem('SCROLL_POS', JSON.stringify(scrollPos))
  }

  useEffect(() => {
    // Pathname이 바뀔때 Save 하는영역
    // const listen = history.listen(scrollSave);
    // return () => listen();
  });

  return { scrollMove, scrollOnceMove, scrollSave };
}

