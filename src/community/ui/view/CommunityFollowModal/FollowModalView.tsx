import React from 'react';
import FollowModalContainer from '../../logic/FollowModalIntro/FollowModalContainer';

const FollowerView: React.FC = function FollowerView() {
  return (
    <>
      <section className="content">
        <div className="scrolling-60vh">
          <FollowModalContainer />
        </div>
      </section>
    </>
  );
}

export default FollowerView;