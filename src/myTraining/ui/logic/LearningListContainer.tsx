import React, { useState, useEffect } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { Segment } from 'semantic-ui-react';
import { Lecture } from 'lecture';
import { NoSuchContentPanel } from 'shared';
import { useRequestCollege } from 'shared/service/useCollege/useRequestCollege';
import isIncludeCineroomId from 'shared/helper/isIncludeCineroomId';
import { CardWithCardRealtedCount } from '../../../lecture/model/CardWithCardRealtedCount';
import { findCardList } from '../../../lecture/detail/api/cardApi';
import CardView from '../../../lecture/shared/Lecture/ui/view/CardVIew';
import CardGroup, {
  GroupType,
} from '../../../lecture/shared/Lecture/sub/CardGroup';
import { findAvailableCardBundles } from '../../../lecture/shared/api/arrangeApi';
import { find } from 'lodash';

interface MatchPrams {
  type: string;
}

function LearningContainer({ match }: RouteComponentProps<MatchPrams>) {
  useRequestCollege();

  const [cardList, setCardList] = useState<CardWithCardRealtedCount[]>([]);
  const [title, setTitle] = useState('');

  const fetchCardList = async () => {
    const cardBundles = await findAvailableCardBundles();

    // 현재는 uuid 값을 받아서 필터 유니크한 타입이 생성이 되면 id => type으로 변경시켜야 한다.
    const filteredCardBundle = find(cardBundles, { id: match.params.type });

    if (filteredCardBundle) {
      setTitle(filteredCardBundle.displayText);

      const joinedIds = filteredCardBundle.cardIds.join();
      const cardList = await findCardList(joinedIds);

      if (cardList) {
        setCardList(cardList);
      }
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchCardList();
  }, []);

  return (
    <>
      <div className="ma-title">
        <div className="inner">
          <h2>{title}</h2>
        </div>
      </div>
      <Segment className="full">
        <div className="sort-reult">
          <div className="section-count">
            총 <span>{cardList.length}개</span>의 리스트가 있습니다.
          </div>
        </div>
        <div className="section">
          {cardList.length > 0 ? (
            <Lecture.Group type={Lecture.GroupType.Box}>
              {cardList.map((item, i) => {
                const { card, cardRelatedCount } = item;
                const isRequired = card.permittedCinerooms
                  ? isIncludeCineroomId(card.permittedCinerooms)
                  : false;

                return (
                  <li key={i}>
                    <CardGroup type={GroupType.Box}>
                      <CardView
                        cardId={item.card.id}
                        isRequired={isRequired}
                        learningTime={card.learningTime}
                        thumbImagePath={card.thumbImagePath}
                        mainCategory={card.mainCategory}
                        name={card.name}
                        stampCount={card.stampCount}
                        description={card.description}
                        passedStudentCount={cardRelatedCount.passedStudentCount}
                        starCount={cardRelatedCount.starCount}
                      />
                    </CardGroup>
                  </li>
                );
              })}
            </Lecture.Group>
          ) : (
            <NoSuchContentPanel message="아직 생성한 학습이 없습니다." />
          )}
        </div>
      </Segment>
    </>
  );
}

export default withRouter(LearningContainer);
