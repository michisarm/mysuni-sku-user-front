import React, {useEffect, useState} from 'react';
import {inject} from 'mobx-react';
import {Icon, Image} from 'semantic-ui-react';
import {mobxHelper} from '@nara.platform/accent';
import classNames from 'classnames';
import {RouteComponentProps, withRouter} from 'react-router';
import {dateTimeHelper} from 'shared';
import {ChallengeBadgeTitle} from '../view/ChallengeBoxElementsView';
import BadgeService from '../../present/logic/BadgeService';
import BadgeModel from '../model/MyBadgeModel';
import BadgeCompModel from '../model/BadgeCompModel';


interface Props extends RouteComponentProps {
  badgeService?: BadgeService,

  badge: BadgeModel,
}

const BadgeCompRight: React.FC<Props> = (Props) => {
  //
  const { badgeService, badge } = Props;
  const { badgeComposition } = badgeService!;
  const { badgeId, mainCategoryName, name } = badge;

  const [ compList, setCompList ] = useState<BadgeCompModel[]>([]);

  const domainPath = process.env.REACT_APP_ENVIRONMENT === undefined || process.env.REACT_APP_ENVIRONMENT === 'server'?
    window.location.protocol + '//' + window.location.host : 'http://ma.mysuni.sk.com';

  useEffect(() => {
    //
    findMyContent(badgeId);
  }, []);

  const findMyContent = async (id: string) => {
    //
    const list = await badgeService!.findBadgeComposition(badgeId);
    setCompList(list);
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
              <li className={classNames('class-card')} key={`learning-${index}`}>
                <a href="#">
                  <span className="class-icon">
                    <Image src={learning.iconBox && (domainPath + learning.iconBox?.iconUrl)} />
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
