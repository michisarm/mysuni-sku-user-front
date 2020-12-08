import React,{ useState, useCallback,useEffect } from 'react';
import { RouteComponentProps,withRouter } from 'react-router-dom';
import { useHistory } from 'react-router';
import CommunityMemberTabmenu from '../view/CommunityMemberView/CommunityMemberTabmenu';
import CommunityMemberListContainer from '../logic/CommunityMemberContainer';

interface MatchParams {
  communityId:string
}

const MemberPage:React.FC<RouteComponentProps<MatchParams>> = ({match}) => {

  return (
    <>
      <CommunityMemberListContainer currentCommunity={match.params.communityId}/>
    </>
  )
}

export default withRouter(MemberPage)