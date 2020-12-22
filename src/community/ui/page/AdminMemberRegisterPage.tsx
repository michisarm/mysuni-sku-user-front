import React, { useEffect } from 'react';
import AdminMemberRegisterContainer from '../logic/AdminMemberRegisterContainer';
import { getMembers } from 'community/service/useMemberList/useMemberList';
import { useSearchBox, getSearchBox, setSearchBox } from 'community/store/SearchBoxStore';
import { getEmptySearchBox } from 'community/model/SearchBox';

function AdminMemberRegisterPage(community:string, approveMember:boolean) {
  useEffect(() => {
    setSearchBox(getEmptySearchBox(approveMember));
    getMembers(community);
  }, [community,approveMember]);
    
  return <AdminMemberRegisterContainer />;
}

export default AdminMemberRegisterPage;
