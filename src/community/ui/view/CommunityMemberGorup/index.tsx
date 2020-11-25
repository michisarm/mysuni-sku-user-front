import React,{ useState, useEffect } from 'react'
import MemberCard from '../CommunityMember/components/MemberCard';
import AdminIcon from '../../../../style/media/icon-community-manager.png';
import { useMemberList } from '../../../service/useMemberList/useMemberList';

const CommunityMemberGorup:React.FC = () => {

  const [cardopen, setCardOpen] = useState<any>(false);
  const [member, approved, getAllMember,getApproveMember ] = useMemberList();

  useEffect(() => {
    getApproveMember('COMMUNITY-f')
  },[])

  return (
    <div className="mycommunity-card-list" style={{marginBottom:"20px"}}>
      <div className="card-group">
        <div className="card-group-list">
          <h3>1분과 그룹</h3>
          <div className="card-group-span">
            <img src={AdminIcon} className="community-manager" />
            <span>nickname</span>
            <span>멤버</span>
            <span>{member && member.totalCount}</span>
            <button onClick={() => setCardOpen(!cardopen)} type="button" title="열기닫기" className={cardopen ? "community-btn-open" : "community-btn-close"}><span>열기닫기</span></button>
          </div>
        </div>
      </div>
      <div className="card-group-body" style={cardopen ? {display:"block"} : {display:"none"}}>
        <p>그룹에 대한 안내 문구가 들어갑니다.</p>
        <MemberCard member={member}/>
      </div>
    </div>
  );
}

export default CommunityMemberGorup;

export const MemberGroupCard:React.FC = () => {

  return (
    // TEST L
    <>
      <CommunityMemberGorup />
      <CommunityMemberGorup />
      <CommunityMemberGorup />
      <CommunityMemberGorup />
    </>
  )
}