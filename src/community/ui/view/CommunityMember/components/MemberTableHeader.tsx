import React from 'react'
import MemberSearch from './MemberSearch'
import { useMemberList } from '../../../../service/useMemberList/useMemberList';

interface Props {
  activemenu: string,
}

const MemberHeaderTitle:React.FC<Props> = ({activemenu}) => {
  const [ member ] = useMemberList();
  
  return (
    <>
      {
        activemenu === "member" || activemenu === "groups" ? (
          <div className="table-board-title">
            <div className="list-number">총 <strong>{member?.totalCount || member?.totalCount}</strong>명</div>
            <div className="right-wrap member-search">
              <MemberSearch/>
            </div>
          </div>
        ) : null
      }
    </>
  )
}

export default MemberHeaderTitle;
