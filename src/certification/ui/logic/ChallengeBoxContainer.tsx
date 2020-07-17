
import React from 'react';
import {RouteComponentProps, withRouter} from 'react-router';
import {Badge} from '../../shared/Badge';
import {ChallengeBadgeStatus} from '../view/ChallengeBoxElementsView';
import ChallengeBoxCompanionModal from '../view/ChallengeBadgeCompanionModal';
import BadgeModel from '../model/BadgeModel';
import BadgeCompRight from './BadgeCompRight';

interface Props extends RouteComponentProps {
  badges: any,
  badgeStyle: string,
  badgeSize: string,
}

const ChallengeBoxContainer: React.FC<Props> = (Props) => {
  //
  const { badges, badgeStyle, badgeSize } = Props;

  return (
    <div className="challenge-wrap">

      {badges.map( (badge: BadgeModel, index: number) => (
        <>
          <div className="challenge-badge" key={`challenge-badge-${index}`}>
            <div className="left-area">

              {/*Badge ui*/}
              <Badge
                badge={badge}
                badgeStyle={badgeStyle}
                badgeSize={badgeSize}
              />

              {/*Status info*/}
              <ChallengeBadgeStatus>

                {/*학습완료x, 뱃지발급 버튼 누른 경우*/}
                { (badge.autoIssued) && (
                  // 발급요청 버튼은 수동발급인 경우에만 노출, 반려시 재노출
                  <ChallengeBoxCompanionModal/>
                )}

                {/*데이터 확인 후 수정할 것*/}
                <span className="number">
                  <span className="ing-txt">진행중</span>
                  <span><b>3</b>/11</span>
                </span>
                <span className="txt">
                  Badge 도전 학습 모두 완료 시<br/>자동으로 Badge가 발급됩니다.
                </span>
              </ChallengeBadgeStatus>
            </div>
            <BadgeCompRight badge={badge} />
          </div>
          <hr className="dividing"/>
        </>
      ))}

    </div>

  );
};

export default withRouter(ChallengeBoxContainer);
