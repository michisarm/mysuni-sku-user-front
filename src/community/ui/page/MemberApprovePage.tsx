import React from 'react';
import { RouteComponentProps,withRouter } from 'react-router-dom';
import CommunityMemberApproveContainer from '../logic/CommunityMemberApproveContainer';

interface MatchParams {
  communityId:string
}

const MemberApprovePage:React.FC<RouteComponentProps<MatchParams>> = ({match}) => {

  return (
    <>
      <CommunityMemberApproveContainer currentCommunity={match.params.communityId}/>
    </>
  )
}

export default withRouter(MemberApprovePage)