import React, {useEffect, useState} from 'react';
import {inject} from 'mobx-react';
import {Icon, Image} from 'semantic-ui-react';
import {mobxHelper} from '@nara.platform/accent';
import classNames from 'classnames';
import {RouteComponentProps, withRouter} from 'react-router';
import {dateTimeHelper} from 'shared';
import {ChallengeBadgeTitle} from '../view/ChallengeBoxElementsView';
import BadgeService from '../../present/logic/BadgeService';
import MyBadgeModel from '../model/MyBadgeModel';
import BadgeCompModel from '../model/BadgeCompModel';
import BadgeCourseData from '../model/BadgeCourseData';
import lectureRoutePaths from '../../../lecture/routePaths';


interface Props extends RouteComponentProps {
  badgeService?: BadgeService,

  badge: MyBadgeModel,
}

const BadgeCompRight: React.FC<Props> = (Props) => {
  //
  const { badgeService, badge, history } = Props;
  const { badgeComposition } = badgeService!;
  const { badgeId, mainCategoryName, name } = badge;

  const [ compList, setCompList ] = useState<BadgeCompModel[]>([]);

  const domainPath = process.env.REACT_APP_ENVIRONMENT === undefined || process.env.REACT_APP_ENVIRONMENT === 'server'?
    '' /*window.location.protocol + '//' + window.location.host*/ : process.env.REACT_APP_PUBLIC_URL;

  useEffect(() => {
    //
    findMyContent(badgeId);
  }, []);

  const findMyContent = async (id: string) => {
    //
    const list = await badgeService!.findBadgeComposition(badgeId);
    setCompList(list);
  };

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

    if (data.serviceType === 'COURSE') {
      history.push(
        lectureRoutePaths.courseOverview(
          cineroomId,
          collegeId,
          data.coursePlanId,
          data.serviceType,
          data.serviceId
        )
      );
    }
    else {
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
      <ChallengeBadgeTitle mainCategoryName={mainCategoryName} name={name}/>

      {/*Badge 구성학습 목록*/}
      <div className="challenge-list">
        <ul>
          { compList.map((learning, index) => {
            return (
              <li className={classNames('class-card', (learning.learningState === 'Passed') ? 'completed' : '')} key={`learning-${index}`}>
                <a href="#" onClick={(e) => moveToOverviewPage(learning, e)}>
                  <span className="class-icon">
                    <Image src={domainPath + learning.iconBox?.iconUrl} />
                  </span>
                  <span className="title">{learning.name}</span>
                  <span className="time">
                    <Icon className="card-time16"/> {dateTimeHelper.timeToHourMinuteFormat(learning.learningTime)}
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

export default inject(mobxHelper.injectFrom(
  'badge.badgeService',
))(withRouter(BadgeCompRight));
