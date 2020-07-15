
import React from 'react';
import {NoSuchContentPanel} from 'shared';
import {Button, Icon} from 'semantic-ui-react';

import LineHeaderContainer from './LineHeaderContainer';
import ChallengeBoxContainer from './ChallengeBoxContainer';

import BadgeStyle from '../model/BadgeStyle';
import BadgeSize from '../model/BadgeSize';


// 샘플데이터
import {challengingBadgeData} from '../../present/apiclient/badgeData';



const ChallengingBadgeContainer: React.FC = () => {
  //

  return (
    <>
      <LineHeaderContainer
        totalCount={challengingBadgeData.totalCount}
      />


      {challengingBadgeData.totalCount > 0 ? (
        <>
          <ChallengeBoxContainer
            badges={challengingBadgeData.results}
            badgeStyle={BadgeStyle.Detail}
            badgeSize={BadgeSize.Small}
          />
        </>
      ) : (
        <NoSuchContentPanel message={(
          <>
            <div className="text">도전중인 Badge가 없습니다.<br/>새로운 Badge에 도전해보시겠습니까?</div>
            <Button
              icon
              as="a"
              className="right btn-blue2"
            >
              Badge List 바로가기 <Icon className="morelink"/>
            </Button>
          </>
        )}
        />
      )}

    </>
  );
};

export default ChallengingBadgeContainer;
