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
    const scrollPos: any = window.pageYOffset; // window.scrollY
    return sessionStorage.setItem('SCROLL_POS', scrollPos)
  }

  useEffect(() => {
    const listen = history.listen(scrollSave);
    return () => listen();
  });

  return { scrollMove, scrollOnceMove, scrollSave };
}

