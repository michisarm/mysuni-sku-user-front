import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import ProfileMenuView from '../view/CommunityProfile/ProfileMenuView';
import AdminMenuView from '../view/CommunityAdmin/AdminMenuView';

interface Params {
  communityId: string;
}  

function CommunityAdminMenuContainer() {
  const { communityId } = useParams<Params>();
  
  const path = useLocation();
  let menuType = 'memberManagement';
  let subMenuType = 'member';

  if (path.pathname.indexOf('/memberManagement') > -1) {
    menuType = 'memberManagement';
    if (path.pathname.indexOf('/memberJoin') > -1) {
      subMenuType = 'memberJoin';
    } else if (path.pathname.indexOf('/memberRegister') > -1) {
      subMenuType = 'memberRegister';
    } else if (path.pathname.indexOf('/group') > -1) {
      subMenuType = 'group';
    } else if (path.pathname.indexOf('/member') > -1) {
      subMenuType = 'member';
    } 
  } else if (path.pathname.indexOf('/menuManagement') > -1) {
    menuType = 'menuManagement';
  } else if (path.pathname.indexOf('/homeManagement') > -1) {
    menuType = 'homeManagement';
  }

  return (
    <>
      <AdminMenuView menuType={menuType} subMenuType={subMenuType} communityId={communityId}/>
    </>
  );
}

export default CommunityAdminMenuContainer;
