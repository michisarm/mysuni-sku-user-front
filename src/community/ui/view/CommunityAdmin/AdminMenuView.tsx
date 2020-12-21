import React from 'react';
import { Sticky, Menu, Segment } from 'semantic-ui-react';
import { Link, RouteComponentProps, useHistory } from 'react-router-dom';
import { getProfileItemMapFromCommunity } from 'community/service/useCommunityProfile/utility/getProfileItemMapFromCommunity';

interface AdminMenuViewProps{
  menuType: string;
  subMenuType: string;
  communityId: string;
}

const AdminMenuView: React.FC<AdminMenuViewProps> = function AdminMenuView({
  menuType, subMenuType, communityId
}) {
  const history = useHistory();
  return (
    <>
      <div className="admin_tab_top">
        <ul>
          <li className={menuType === 'memberManagement' ? 'active' : ''} onClick={e=>history.push(`/community/admin/${communityId}/memberManagement/member`)}>멤버 관리</li>
          <li className={menuType === 'menuManagement' ? 'active' : ''} onClick={e=>history.push(`/community/admin/${communityId}/menuManagement`)}>메뉴 관리</li>
          <li className={menuType === 'homeManagement' ? 'active' : ''} onClick={e=>history.push(`/community/admin/${communityId}/homeManagement`)}>홈 관리</li>
        </ul>
      </div>
      {menuType === 'memberManagement' ?
        <div className="admin_tab">
          <ul>
            <li className={subMenuType === 'member' ? 'active' : ''} onClick={e=>history.push(`/community/admin/${communityId}/memberManagement/member`)}>멤버</li>
            <li className={subMenuType === 'memberJoin' ? 'active' : ''} onClick={e=>history.push(`/community/admin/${communityId}/memberManagement/memberJoin`)}>가입대기</li>
            <li className={subMenuType === 'memberRegister' ? 'active' : ''} onClick={e=>history.push(`/community/admin/${communityId}/memberManagement/memberRegister`)}>멤버 일괄 등록</li>                
            <li className={subMenuType === 'group' ? 'active' : ''} onClick={e=>history.push(`/community/admin/${communityId}/memberManagement/group`)}>그룹</li>
          </ul>
        </div>            
        : null
      }
    </>
  );
};

export default AdminMenuView;
