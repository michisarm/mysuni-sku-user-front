import React, { useRef, useState, useCallback, useEffect } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import CommunityGroupListContainer from '../logic/CommunityGroupListContainer';

interface MatchParams {
  communityId: string;
}

const MemberGroupPage: React.FC<RouteComponentProps<MatchParams>> = ({
  match,
}) => {
  window.location.href = `/suni-community/community/${match.params.communityId}/member/group`;
  return (
    <>
      <CommunityGroupListContainer
        currentCommunity={match.params.communityId}
      />
    </>
  );
};

export default withRouter(MemberGroupPage);
