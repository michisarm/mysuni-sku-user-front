import React,{useEffect} from 'react';
import MemberCard from './components/MemberCard';
import { useMemberList } from '../../../service/useMemberList/useMemberList';

const CommunityMember:React.FC = () => {
  const [ member, approved, getAllMember ] = useMemberList();
  
  useEffect(() => {
    getAllMember('COMMUNITY-f')
  },[])

  return (
    <div className="mycommunity-card-list">
      <MemberCard member={member} />
    </div>
  );
}

export default CommunityMember;