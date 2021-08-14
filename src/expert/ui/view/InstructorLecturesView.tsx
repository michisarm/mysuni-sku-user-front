import React, { Component } from 'react';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { ReviewService } from '@nara.drama/feedback/src/snap/snap';
import { PageService } from 'shared/stores';
import { NoSuchContentPanel } from 'shared';
import { Lecture, SeeMoreButton } from 'lecture';
import { CardWithCardRealtedCount } from '../../../lecture/model/CardWithCardRealtedCount';
import CardView from '../../../lecture/shared/Lecture/ui/view/CardVIew';
import { Area } from 'tracker/model';
import { getPolyglotText } from 'shared/ui/logic/PolyglotText';

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
  return (
    <div className="expert-cont">
      {cards.length > 0 ? (
        <>
          <Lecture.Group type={Lecture.GroupType.Box}>
            {cards.map(({ card, cardRelatedCount }) => (
              <CardView
                key={card.id}
                cardId={card.id}
                {...card}
                {...cardRelatedCount}
                dataArea={Area.EXPERT_LECTURE}
              />
            ))}
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
  );
}
