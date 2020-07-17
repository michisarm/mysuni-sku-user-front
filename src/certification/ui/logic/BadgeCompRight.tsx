import React from 'react';
import {Icon, Image} from "semantic-ui-react";
import classNames from 'classnames';
import {ChallengeBadgeTitle} from '../view/ChallengeBoxElementsView';

import {learningData} from '../../present/apiclient/learningData';


interface Props {
  badgeId: string,
  mainCategoryName: string,
  name: string
}

const BadgeCompRight: React.FC<Props> = (Props) => {
  //
  const { mainCategoryName, name } = Props;

  return (
    <div className="right-area">

      {/*분야 및 Badge명*/}
      <ChallengeBadgeTitle mainCategoryName={mainCategoryName} name={name}/>

      {/*Badge 구성학습 목록*/}
      <div className="challenge-list">
        <ul>
          { learningData.map((learning, index) => {
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
  )
};

export default BadgeCompRight;
