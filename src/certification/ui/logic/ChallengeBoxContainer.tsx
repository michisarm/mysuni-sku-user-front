
import React from 'react';
import {Button, Icon, Image} from 'semantic-ui-react';
import {inject, observer} from 'mobx-react';
import {mobxHelper} from '@nara.platform/accent';
import {RouteComponentProps, withRouter} from 'react-router';
import {Badge} from '../../shared/Badge';
import {ChallengeBadgeTitle, ChallengeBadgeStatus} from '../view/ChallengeBoxElementsView';

import ChallengeBoxCompanionModal from '../view/ChallengeBadgeCompanionModal';

interface Props extends RouteComponentProps {
  badges: any,
  badgeStyle: string,
  badgeSize: string,
}

const ChallengeBoxContainer: React.FC<Props> = (Props) => {
  //
  const { badges, badgeStyle, badgeSize } = Props;

  const handleCloseAlertWin = () => {
    alert('1');
  };

  return (
    <div className="challenge-wrap">

      {badges.map( (badge: any, index: number) => (
        <>
          <div className="challenge-badge" key={`challenge-badge-${index}`}>
            <div className="left-area">

              {/*Badge ui*/}
              <Badge
                badgeId={badge.badgeId}
                badgeLevel={badge.difficultyLevel}
                iconUrl={badge.iconUrl}
                mainCategory={badge.mainCategoryName}
                name={badge.name}
                badgeStyle={badgeStyle}
                badgeSize={badgeSize}
              />

              {/*Status info*/}
              <ChallengeBadgeStatus>

                {/*학습완료x, 뱃지발급 버튼 누른 경우*/}
                <ChallengeBoxCompanionModal/>

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

            {/*오른쪽 - 학습정보*/}
            <div className="right-area">

              {/*분야 및 Badge명*/}
              <ChallengeBadgeTitle mainCategoryName={badge.mainCategoryName} name={badge.name}/>

              {/*Badge 구성학습 목록*/}
              <div className="challenge-list">
                <ul>

                  {/*학습정보 반복*/}
                  <li className="class-card" key="123">
                    <a href="#">
                      <span className="class-icon">
                        <Image src="/images/all/icon-chanel-64-px.svg"/>
                      </span>
                      <span className="title">
                        Machine learning Complete for Calculus – Deep Learning
                      </span>
                      <span className="time">
                        <Icon className="card-time16"/> 1h 30m
                      </span>
                    </a>
                  </li>
                  <li className="class-card completed" key="124">
                    <a href="#">
                      <span className="class-icon">
                        <Image src="/images/all/icon-chanel-64-px.svg"/>
                      </span>
                      <span className="title">
                        Machine learning Complete for Calculus – Deep Learning
                      </span>
                      <span className="time">
                        <Icon className="card-time16"/> 1h 30m
                      </span>
                    </a>
                  </li>

                </ul>
              </div>

            </div>
          </div>
          <hr className="dividing"/>
        </>
      ))}

    </div>

  );
};

export default withRouter(ChallengeBoxContainer);
