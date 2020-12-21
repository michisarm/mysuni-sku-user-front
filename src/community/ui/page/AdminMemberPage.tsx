import React, { useEffect } from 'react';
import AdminMemberContainer from '../logic/AdminMemberContainer';
import { getMembers } from 'community/service/useMemberList/useMemberList';
import { useSearchBox } from 'community/store/SearchBoxStore';

function AdminMemberPage(community:string) {
  const searchBox =  useSearchBox();
  useEffect(() => {
    getMembers(community,searchBox);
  }, [community]);
    
  return <AdminMemberContainer />;
}

export default AdminMemberPage;
