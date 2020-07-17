
import React from 'react';
import {Icon, Image} from 'semantic-ui-react';
import {RouteComponentProps, withRouter} from 'react-router';
import {Badge} from '../../shared/Badge';
import {ChallengeBadgeTitle, ChallengeBadgeStatus} from '../view/ChallengeBoxElementsView';

import ChallengeBoxCompanionModal from '../view/ChallengeBadgeCompanionModal';

// 샘플
import {learningData} from '../../present/apiclient/learningData';

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

            {/*오른쪽 - 학습정보*/}
            <div className="right-area">

              {/*분야 및 Badge명*/}
              <ChallengeBadgeTitle mainCategoryName={badge.mainCategoryName} name={badge.name}/>

              {/*Badge 구성학습 목록*/}
              <div className="challenge-list">
                <ul>
                  { learningData.map((learning, index) => {
                    return (
                      <li className="class-card" key={`learning-${index}`}>
                        <a href="#">
                          <span className="class-icon">
                            <Image src={learning.iconBox.iconUrl} alt={learning.name}/>
                          </span>
                          <span className="title">{learning.name}</span>
                          <span className="time">
                            <Icon className="card-time16"/> {learning.learningTime}
                          </span>
                        </a>
                      </li>
                    );
                  })}
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
