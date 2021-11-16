import { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AppContext from '../../../layout/UserApp/ui/logic/AppContext';

export default function CommunityHomeBreadcrumb(breadcrumb: string) {
  const {
    breadcrumb: { setBreadcrumb },
  } = useContext(AppContext);
  const { pathname } = useLocation();
  useEffect(() => {
    setBreadcrumb([
      { text: 'community', path: '/community/main/my-communities' },
      {
        text: `${breadcrumb}`,
        path: `${pathname}`,
      },
    ]);
  }, [pathname]);
}
