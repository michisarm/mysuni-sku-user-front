import React from 'react';
import { useParams } from 'react-router-dom';
import { useCommunityHome } from '../../store/CommunityHomeStore';

interface Params {
  menuId: string;
}

function CommunityHtmlPage() {
  const { menuId } = useParams<Params>();
  const communityHome = useCommunityHome();
  return (
    <>
      {communityHome !== undefined &&
        communityHome.menus.find(c => c.menuId === menuId) !== undefined && (
          <div
            dangerouslySetInnerHTML={{
              __html: communityHome.menus.find(c => c.menuId === menuId)!.html,
            }}
          />
        )}
    </>
  );
}

export default CommunityHtmlPage;
