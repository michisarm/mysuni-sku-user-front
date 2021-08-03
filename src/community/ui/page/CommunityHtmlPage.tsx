import { requestCommunityMenus } from 'community/service/useCommunityHome/requestCommunity';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCommunityHome } from '../../store/CommunityHomeStore';

interface Params {
  communityId: string;
  menuId: string;
}

function CommunityHtmlPage() {
  const { communityId, menuId } = useParams<Params>();
  window.location.href = `/suni-community/community/${communityId}/html/${menuId}`;

  useEffect(() => {
    requestCommunityMenus(communityId); // 메뉴 클릭시 재호출(관리자에서 수정된 html 바로 적용)
  }, [communityId]);

  const communityHome = useCommunityHome();
  return (
    <>
      {communityHome !== undefined &&
        communityHome.menus.find((c) => c.menuId === menuId) !== undefined && (
          <div
            dangerouslySetInnerHTML={{
              __html: communityHome.menus.find((c) => c.menuId === menuId)!
                .html,
            }}
          />
        )}
    </>
  );
}

export default CommunityHtmlPage;
