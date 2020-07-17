import React, {useEffect, useState} from 'react';
import {inject} from 'mobx-react';
import {Icon, Image} from 'semantic-ui-react';
import {mobxHelper} from '@nara.platform/accent';
import classNames from 'classnames';
import {RouteComponentProps, withRouter} from 'react-router';
import {ChallengeBadgeTitle} from '../view/ChallengeBoxElementsView';
import BadgeService from '../../present/logic/BadgeService';
import BadgeModel from '../model/BadgeModel';


interface Props extends RouteComponentProps {
  badgeService?: BadgeService,

  badge: BadgeModel,
}

const BadgeCompRight: React.FC<Props> = (Props) => {
  //
  const { badgeService, badge } = Props;
  const { badgeComposition } = badgeService!;
  const { badgeId, mainCategoryName, name } = badge;

  useEffect(() => {
    //
    findMyContent(badgeId);
  }, []);

  const findMyContent = async (id: string) => {
    //
    const compList = await badgeService!.findBadgeComposition(badgeId);
  };

  return (
    <div className="right-area">

      {/*분야 및 Badge명*/}
      <ChallengeBadgeTitle mainCategoryName={mainCategoryName} name={name}/>

      {/*Badge 구성학습 목록*/}
      <div className="challenge-list">
        <ul>
          { badgeComposition.map((learning, index) => {
            return (
              <li className={classNames('class-card')} key={`learning-${index}`}>
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
  );
};

export default inject(mobxHelper.injectFrom(
  'badge.badgeService',
))(withRouter(BadgeCompRight));
