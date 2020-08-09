import React, {Fragment, useEffect, useRef, useState} from 'react';
import {inject} from 'mobx-react';
import {RouteComponentProps, withRouter} from 'react-router';
import {mobxHelper} from '@nara.platform/accent';
import MyBadgeModel from '../model/MyBadgeModel';
import BadgeCompLeft from './BadgeCompLeft';
import BadgeCompRight from './BadgeCompRight';
import BadgeCompModel from '../model/BadgeCompModel';
import BadgeService from '../../present/logic/BadgeService';


interface Props extends RouteComponentProps {
  badgeService?: BadgeService,

  myBadge: MyBadgeModel,
  badgeStyle: string,
  badgeSize: string,
}

const ChallengeBoxContainer: React.FC<Props> = (Props) => {
  //
  const { badgeService, myBadge, badgeStyle, badgeSize } = Props;

  const [compLearnings, setCompLearnings] = useState<BadgeCompModel[]>([]);

  // 학습 카운트 정보
  const [learningCount, setLearningCount] = useState<number>(0);
  const [passedCount, setPassedCount] = useState<number>(0);

  useEffect(() => {
    findBadgeLearningInfo(myBadge.badgeId);
  }, []);

  // 뱃지 구성학습 조회
  const findBadgeLearningInfo = async (badgeId: string) => {
    //
    const badgeComp: BadgeCompModel[] = await badgeService!.findBadgeComposition(badgeId);
    
    // 구성 학습 정보 설정
    setCompLearnings(badgeComp);

    // 학습 개수
    setLearningCount(badgeComp.length);

    // 완료 학습 개수
    let count = 0;
    badgeComp.map((learning, index) => {
      if ( learning.learningState === 'Passed' ) { count++; }
    });

    setPassedCount(count);
  };

  // 도전중, 발급요청중인 뱃지 목록
  return (
    <div className="challenge-wrap">

      <Fragment key={`challenge-badge-${myBadge.badgeId}`}>
        <div className="challenge-badge">

          {/*Badge UI Information*/}
          <BadgeCompLeft
            badge={myBadge}
            badgeStyle={badgeStyle}
            badgeSize={badgeSize}
            learningCount={learningCount}
            passedCount={passedCount}
            passedAll={learningCount > 0 && learningCount === passedCount}
          />

          {/*도전중 뱃지별 학습리스트*/}
          <BadgeCompRight
            badge={myBadge}
            compLearnings={compLearnings}
          />

        </div>
        <hr className="dividing"/>
      </Fragment>

    </div>

  );
};

export default inject(mobxHelper.injectFrom(
  'badge.badgeService',
))(withRouter(ChallengeBoxContainer));
