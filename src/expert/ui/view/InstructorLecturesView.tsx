import React, { Component, useState, useEffect } from 'react';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { ReviewService } from '@nara.drama/feedback/src/snap/snap';
import { PageService } from 'shared/stores';
import { NoSuchContentPanel } from 'shared';
import { Lecture, SeeMoreButton } from 'lecture';
import { CardWithCardRealtedCount } from '../../../lecture/model/CardWithCardRealtedCount';
import CardView from '../../../lecture/shared/Lecture/ui/view/CardVIew';
import { Area } from '@sku/skuniv-ui-lecture-card/lib/views/lectureCard.models';
import { getPolyglotText } from 'shared/ui/logic/PolyglotText';
import {
  LectureCardView,
  CardProps,
  parseCommunityLectureCards,
} from '@sku/skuniv-ui-lecture-card';

import { findCards } from '../../apis/instructorApi';
import { parseLanguage } from 'shared/viewmodel/PolyglotString';
import { SkProfileService } from 'profile/stores';
import { hoverTrack } from 'tracker/present/logic/ActionTrackService';
import { Segment } from 'semantic-ui-react';

interface RequestMore {
  (): void;
}

interface Props {
  cardsTotalCount: number;
  cards: CardWithCardRealtedCount[];
  requestMore: RequestMore;
}

export function InstructorLecturesView(props: Props) {
  const { cardsTotalCount, cards, requestMore } = props;
  const needMore = cardsTotalCount > cards.length;
  const [cardList, setCardList] = useState<CardProps[]>([]);
  const [cardViewOn, setCardViewOn] = useState<number>(1);
  const userLanguage = SkProfileService.instance.skProfile.language;

  const cardsIds = cards.map((c) => {
    return c.card.id;
  });

  useEffect(() => {
    findCards(cardsIds).then((c) => {
      if (c === undefined) {
        return;
      }
      setCardList(parseCommunityLectureCards(c, userLanguage));
    });
  }, [cards, cardsIds, userLanguage]);

  return (
    <div className="expert-cont">
      <div className="section">
        {cardList.length > 0 ? (
          <>
            <Lecture.Group type={Lecture.GroupType.Box}>
              {cardList.map((cards, i) => {
                return (
                  <LectureCardView
                    {...cards}
                    useBookMark
                    dataArea={Area.EXPERT_LECTURE}
                    hoverTrack={hoverTrack}
                  />
                );
              })}
            </Lecture.Group>
            {needMore && <SeeMoreButton onClick={requestMore} />}
          </>
        ) : (
          <NoSuchContentPanel
            message={getPolyglotText(
              '등록된 강의가 없습니다.',
              '통검-강사소개-강의없음'
            )}
          />
        )}
      </div>
    </div>
  );
}
