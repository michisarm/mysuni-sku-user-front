import React,{ useState, useCallback,useEffect } from 'react';
import { RouteComponentProps,withRouter } from 'react-router-dom';
import { useHistory } from 'react-router';
import CommunityMemberTabmenu from '../view/CommunityMemberView/CommunityMemberTabmenu';
import CommunityMemberListContainer from '../logic/CommunityMemberContainer';

interface MatchParams {
  communityId:string
}

const MemberPage:React.FC<RouteComponentProps<MatchParams>> = ({match}) => {
  const currentCommunity = match.params.communityId
  const [activemenu, setActiveMenu] = useState<string>("member");
  const history = useHistory();

  useEffect(() => {

  },[currentCommunity])

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
      // approve={approve.totalCount}
    />

    {/* 카드영역 컴포넌트 */}
    <CommunityMemberListContainer currentCommunity={currentCommunity}/>
    
    </>
  )
}

export default withRouter(MemberPage)