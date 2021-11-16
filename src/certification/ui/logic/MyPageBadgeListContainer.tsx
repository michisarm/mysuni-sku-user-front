/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useCallback } from 'react';
import { Button, Icon, Modal } from 'semantic-ui-react';
import { useHistory } from 'react-router';
import { inject, observer } from 'mobx-react';
import { mobxHelper } from '@nara.platform/accent';
import BadgeService from '../../present/logic/BadgeService';
import { NoSuchContentPanel } from '../../../shared';
import BadgeStyle from '../model/BadgeStyle';
import BadgeSize from '../model/BadgeSize';
import BadgeCountText from '../model/BadgeCountText';
import LineHeaderContainer from './LineHeaderContainer';
import BadgeRoutePaths from '../../routePaths';
import { BadgeLevel } from '../../model/BadgeLevel';
import BadgeView from '../view/BadgeView';
import { useRequestMyBadges } from '../../service/useRequestMyBadges';
import { MyBadge } from '../../model/MyBadge';
import MyBadgeModal from '../view/MyBadgeModal';
import { parsePolyglotString } from 'shared/viewmodel/PolyglotString';
import { PolyglotText } from 'shared/ui/logic/PolyglotText';
import { Area } from '@sku/skuniv-ui-lecture-card/lib/views/lectureCard.models';

interface MyPageBadgeListContainerProps {
  badgeService?: BadgeService;
}

function MyPageBadgeListContainer({
  badgeService,
}: MyPageBadgeListContainerProps) {
  const {
    myBadges,
    myBadgeCount,
    selectedLevel,
    setSelectedLevel,
    findBadge,
    badge,
  } = badgeService!;

  const history = useHistory();
  useRequestMyBadges();

  const onSelectLevel = useCallback((level: BadgeLevel) => {
    setSelectedLevel(level);
  }, []);

  const moveToBadgeList = useCallback(() => {
    history.push(BadgeRoutePaths.badgeTab());
  }, []);

  // const test = async (id: string) => {
  //   await badgeService!.findBadge(id);
  //   console.log("saffasdfsdafas", badge?.name)
  //   // return value;
  // };

  return (
    <>
      <div className="mypage_contents profile-badge-contents" data-area={Area.MYPAGE_MYBADGE}>
        <div className="ui segment full">
          <strong className="mypage_title">My Badge</strong>
          <LineHeaderContainer
            totalCount={myBadgeCount}
            countMessage={BadgeCountText.EarnedBadgeList}
            selectedLevel={selectedLevel}
            onSelectLevel={onSelectLevel}
          />
          <div className="group-wrapper">
            <div className="badge-list-type list-wrapper">
              <ul>
                {(myBadges &&
                  myBadges.length > 0 &&
                  myBadges.map((myBadge: MyBadge, index: number) => {
                    return (
                      <li key={`my-badge-${index}`}>
                        <BadgeView
                          id={myBadge.id}
                          name={parsePolyglotString(myBadge.name)}
                          level={myBadge.level}
                          iconUrl={myBadge.iconUrl}
                          categoryId={myBadge.categoryId}
                          badgeStyle={BadgeStyle.List}
                          badgeSize={BadgeSize.Small}
                        />
                        <div className="badge-name">
                          <span>{parsePolyglotString(myBadge.name)}</span>
                        </div>
                        {/* <Modal
                          open={open}
                          onOpen={this.onOpen}
                          className="base mypage-modal-pop"
                          on="click"
                          trigger={
                            <div className="button-area">
                              <Button
                                className="fix line"
                              >
                                인증서 보기
                              </Button>
                            </div>
                          }
                        > */}
                        <MyBadgeModal myBadge={myBadge} />
                        {/* </Modal> */}
                      </li>
                    );
                  })) || (
                  <NoSuchContentPanel
                    message={
                      <>
                        <div className="text">
                          <PolyglotText
                            defaultString="획득한 Badge가 없습니다."
                            id="Certification-mabd-뱃지없음"
                          />
                          <br />
                          <PolyglotText
                            defaultString="등록된 Badge 리스트에서 원하는 Badge에 도전해보세요."
                            id="Certification-mabd-뱃지도전"
                          />
                        </div>
                        <Button
                          icon
                          as="a"
                          className="right btn-blue2"
                          onClick={moveToBadgeList}
                        >
                          <span className="border">
                            <PolyglotText
                              defaultString="Badge List 바로가기"
                              id="Certification-mabd-바로가기"
                            />
                          </span>
                          <Icon className="morelink" />
                        </Button>
                      </>
                    }
                  />
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default inject(mobxHelper.injectFrom('badge.badgeService'))(
  observer(MyPageBadgeListContainer)
);
