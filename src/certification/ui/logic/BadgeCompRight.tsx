import React, { useEffect, useState } from 'react';
import { inject } from 'mobx-react';
import { Icon, Image } from 'semantic-ui-react';
import { mobxHelper } from '@nara.platform/accent';
import classNames from 'classnames';
import { RouteComponentProps, withRouter } from 'react-router';
import { dateTimeHelper } from 'shared';
import { ChallengeBadgeTitle } from '../view/ChallengeBoxElementsView';
import BadgeService from '../../present/logic/BadgeService';
import MyBadgeModel from '../model/MyBadgeModel';
import BadgeCompModel from '../model/BadgeCompModel';
import BadgeCourseData from '../model/BadgeCourseData';
import lectureRoutePaths from '../../../lecture/routePaths';

interface Props extends RouteComponentProps {
  badgeService?: BadgeService;

  badge: MyBadgeModel;
  compLearnings: BadgeCompModel[];
}

const BadgeCompRight: React.FC<Props> = Props => {
  //
  const { badgeService, badge, compLearnings, history } = Props;
  const { badgeId, mainCategoryName, name } = badge;

  const domainPath =
    process.env.NODE_ENV !== 'development'
      ? window.location.protocol + '//' + window.location.host
      : 'http://10.178.66.114';

  // 코스 페이지로 이동
  const moveToCoursePage = (course: BadgeCourseData, e: any) => {
    if (e) {
      e.preventDefault();
    }
  };

  // 코스/큐 페이지로 이동
  const moveToOverviewPage = (data: BadgeCompModel, e: any) => {
    if (e) {
      e.preventDefault();
    }

    const keyStr = data.patronKey.keyString;
    const cineroomId = keyStr.substring(keyStr.indexOf('@') + 1);
    const collegeId = data.category.college.id;
    /* 뱃지 학습리스트는 PROGRAM 이 제외되며 COURSE, CARD 만 포함됨. */
    /* URL 표현을 위한 변환. */
    const serviceType = data.serviceType === 'COURSE' ? 'Course' : 'Card';

    if (serviceType === 'Course') {
      history.push(
        lectureRoutePaths.courseOverview(
          cineroomId,
          collegeId,
          data.coursePlanId,
          serviceType,
          data.serviceId
        )
      );
    } else {
      history.push(
        lectureRoutePaths.lectureCardOverview(
          cineroomId,
          collegeId,
          data.cubeId,
          data.serviceId
        )
      );
    }
  };

  return (
    <div className="right-area">
      {/*분야 및 Badge명*/}
      <ChallengeBadgeTitle mainCategoryName={mainCategoryName} name={name} />

      {/*Badge 구성학습 목록*/}
      <div className="challenge-list">
        <ul>
          {compLearnings &&
            compLearnings.map((learning, index) => {
              return (
                <li
                  className={classNames(
                    'class-card',
                    learning.learningState === 'Passed' ? 'completed' : ''
                  )}
                  key={`learning-${index}`}
                >
                  <a href="#" onClick={e => moveToOverviewPage(learning, e)}>
                    <span className="class-icon">
                      <Image src={learning.iconBox?.baseUrl} />
                    </span>
                    <span className="title">{learning.name}</span>
                    <span className="time">
                      <Icon className="card-time16" />{' '}
                      {dateTimeHelper.timeToHourMinuteFormat(
                        learning.learningTime
                      )}
                    </span>
                  </a>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};

export default inject(mobxHelper.injectFrom('badge.badgeService'))(
  withRouter(BadgeCompRight)
);
