import React,{ useRef, useState, useCallback,useEffect } from 'react';
import { RouteComponentProps,withRouter } from 'react-router-dom';
import { useHistory } from 'react-router';
import CommunityMemberTabmenu from '../view/CommunityMemberView/CommunityMemberTabmenu';
import CommunityMemberApproveContainer from '../logic/CommunityMemberApproveContainer';


interface MatchParams {
  communityId:string
}

const MemberApprovePage:React.FC<RouteComponentProps<MatchParams>> = ({match}) => {
  const currentCommunity = match.params.communityId
  const [activemenu, setActiveMenu] = useState<string>("approve");
  const history = useHistory();
  
  const handleActiveMenu = useCallback((active: string) => {
    
    setActiveMenu(active);
    switch (active) {
      case 'member': history.push(`/community/${currentCommunity}/member`)
        break 
      case 'group': history.push(`/community/${currentCommunity}/member/group`)
        break 
      case 'approve': history.push(`/community/${currentCommunity}/member/approve`)
        break
      default:
    }

  },[activemenu])

  return (
    <>
    {/* Header */}
    <div className="course-info-header">
      <div className="survey-header border-none margin-none pt0">
        <div className="survey-header-left">
          Member
        </div>
      </div>
    </div>

    {/* Tab */}
    <CommunityMemberTabmenu 
      activemenu={activemenu}
      handleActiveMenu={handleActiveMenu}
    />

    {/* 카드영역 컴포넌트 */}
    <CommunityMemberApproveContainer currentCommunity={currentCommunity}/>
    </>
  )
}

export default withRouter(MemberApprovePage)