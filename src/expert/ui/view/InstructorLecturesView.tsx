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
              />
            ))}
          </Lecture.Group>

          {needMore && <SeeMoreButton onClick={requestMore} />}
        </>
      ) : (
        <NoSuchContentPanel message="등록된 강의가 없습니다." />
      )}
    </div>
  );
}
