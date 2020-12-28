import React, { useEffect } from 'react';
import AdminMemberRegisterContainer from '../logic/AdminMemberRegisterContainer';
import { getMembers } from 'community/service/useMemberList/useMemberList';
import { useSearchBox, getSearchBox, setSearchBox } from 'community/store/SearchBoxStore';
import { getEmptySearchBox } from 'community/model/SearchBox';
import AdminGroupContainer from '../logic/AdminGroupContainer';
import { getAdminGroups } from 'community/service/useGroupList/useGroupList';

function AdminGroupPage(community:string) {
  useEffect(() => {
    setSearchBox(getEmptySearchBox());
    getAdminGroups(community);
  }, [community]);
    
  return <AdminGroupContainer />;
}

export default AdminGroupPage;
