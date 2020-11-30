import React from 'react'
import { useCommunityMember } from 'community/store/CommunityMemberStore';

interface Props {
  activemenu: string,
}

const MemberHeaderTitle:React.FC<Props> = ({activemenu}) => {
  const memberCount = useCommunityMember();
  return (
    <>
      {
        activemenu === "member" || activemenu === "groups" ? (
          <div className="table-board-title">
            <div className="list-number">총 <strong>{memberCount?.totalCount || memberCount?.totalCount}</strong>명</div>
          </div>
        ) : null
      }
    </>
  )
}

export default MemberHeaderTitle;
