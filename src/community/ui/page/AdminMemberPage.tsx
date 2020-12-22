import React, { useEffect } from 'react';
import AdminMemberContainer from '../logic/AdminMemberContainer';
import { getMembers } from 'community/service/useMemberList/useMemberList';
import { useSearchBox, getSearchBox, setSearchBox } from 'community/store/SearchBoxStore';
import { getEmptySearchBox } from 'community/model/SearchBox';

function AdminMemberPage(community:string, approveMember:boolean) {
  useEffect(() => {
    setSearchBox(getEmptySearchBox(approveMember));
    getMembers(community);
  }, [community,approveMember]);
    
  return <AdminMemberContainer />;
}

export default AdminMemberPage;
