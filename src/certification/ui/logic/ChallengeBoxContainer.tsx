
import React, {Fragment} from 'react';
import {RouteComponentProps, withRouter} from 'react-router';
import BadgeModel from '../model/MyBadgeModel';
import BadgeCompLeft from './BadgeCompLeft';
import BadgeCompRight from './BadgeCompRight';

interface Props extends RouteComponentProps {
  badges: any,
  badgeStyle: string,
  badgeSize: string,
}

const ChallengeBoxContainer: React.FC<Props> = (Props) => {
  //
  const { badges, badgeStyle, badgeSize } = Props;

  // 도전중, 발급요청중인 뱃지 목록
  return (
    <div className="challenge-wrap">

      {badges.map( (badge: BadgeModel, index: number) => (
        <Fragment key={`challenge-badge-${index}`}>
          <div className="challenge-badge">

            {/*Badge UI Information*/}
            <BadgeCompLeft
              badge={badge}
              badgeStyle={badgeStyle}
              badgeSize={badgeSize}
            />

            {/*도전중 뱃지별 학습리스트*/}
            <BadgeCompRight badge={badge} />

          </div>
          <hr className="dividing"/>
        </Fragment>
      ))}

    </div>

  );
};

export default withRouter(ChallengeBoxContainer);
