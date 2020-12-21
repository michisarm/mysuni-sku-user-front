import React, { useEffect } from 'react';
import AdminMemberContainer from '../logic/AdminMemberContainer';
import { getMembers } from 'community/service/useMemberList/useMemberList';

function AdminMemberPage(community:string) {
  useEffect(() => {
    getMembers(community);
  }, [community]);
    
  return <AdminMemberContainer />;
}

export default AdminMemberPage;
