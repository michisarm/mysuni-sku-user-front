import React, { useState, useEffect } from 'react';
import { NoSuchContentPanel } from 'shared';
import { Lecture, SeeMoreButton } from 'lecture';
import { CardWithCardRealtedCount } from '../../../lecture/model/CardWithCardRealtedCount';
import { Area } from '@sku/skuniv-ui-lecture-card/lib/views/lectureCard.models';
import { getPolyglotText } from 'shared/ui/logic/PolyglotText';
import {
  LectureCardView,
  CardProps,
  parseCommunityLectureCards,
} from '@sku/skuniv-ui-lecture-card';
import { findCards } from '../../apis/instructorApi';
import { SkProfileService } from 'profile/stores';
import { hoverTrack } from 'tracker/present/logic/ActionTrackService';

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

  useEffect(() => {
    const cardsIds = cards.map((c) => {
      return c.card.id;
    });
    findCards(cardsIds).then((c) => {
      if (c === undefined) {
        return;
      }
      setCardList(
        parseCommunityLectureCards(
          c,
          SkProfileService.instance.skProfile.language
        )
      );
    });
  }, [cards]);

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
