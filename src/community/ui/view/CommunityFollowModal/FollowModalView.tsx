import React from 'react';
import FollowModalContainer from '../../logic/FollowModalIntro/FollowModalContainer';

const FollowerView: React.FC = function FollowerView() {
  return (
    <>
      <section className="content">
        <FollowModalContainer />
      </section>
    </>
  );
}

export default FollowerView;