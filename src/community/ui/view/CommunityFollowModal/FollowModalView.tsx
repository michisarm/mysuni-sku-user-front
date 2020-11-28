import React from 'react';
import FollowModalContainer from '../../logic/FollowModalIntro/FollowModalContainer';

interface ModalOpenProps {
  open: boolean;
}

const FollowerView: React.FC<ModalOpenProps> = function FollowerView ({
  open
}) {
  return(
    <>
      <section className="content">
        <FollowModalContainer open={open} />
      </section>
    </>
  );
}

export default FollowerView;