import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const menus = ['my-training', 'personalcube', 'certification', 'lecture'];

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const currentPathName = pathname.split('/')[1];
  const machesPathName = menus.includes(currentPathName);

  function cleanSessionStorage() {
    sessionStorage.removeItem('lectureOffset')
    sessionStorage.removeItem('communityOffset')
    sessionStorage.removeItem('postOffset')
    sessionStorage.removeItem('learningOffset')
    sessionStorage.removeItem('SCROLL_POS')
  }

  useEffect(() => {
    if (!machesPathName) {
      window.scrollTo(0, 0);
    }
    if (currentPathName === 'pages') {
      cleanSessionStorage();
    }
  }, [pathname]);

  return null;
}