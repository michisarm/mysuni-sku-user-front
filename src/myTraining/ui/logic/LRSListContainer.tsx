import React, { useState, useEffect, useMemo } from 'react';
import { Segment } from 'semantic-ui-react';
import { Lecture } from 'lecture';
import { NoSuchContentPanel } from 'shared';
import isIncludeCineroomId from 'shared/helper/isIncludeCineroomId';
import CardView from '../../../lecture/shared/Lecture/ui/view/CardVIew';
import CardGroup, {
  GroupType,
} from '../../../lecture/shared/Lecture/sub/CardGroup';
import { SkProfileService } from 'profile/stores';

import { RecommendationViewModel } from '../../../lecture/recommend/viewmodel/RecommendationViewModel';
import { findRecommendationCards } from '../../../lecture/recommend/api/recommendApi';
import { PolyglotText } from 'shared/ui/logic/PolyglotText';

const CONTENT_TYPE_NAME = '추천과정';

function getTitle(viewModel?: RecommendationViewModel) {
  if (viewModel === undefined) {
    return '';
  }
  const { recTitle } = viewModel;
  if (recTitle?.length > 0) {
    return `${SkProfileService.instance.profileMemberName}님의 학습 콘텐츠 기반 추천 과정`;
  } else {
    return `${SkProfileService.instance.profileMemberName}님을 위한 mySUNI의 추천 과정`;
  }
}

function LearningContainer() {
  const [viewModel, setViewModel] = useState<RecommendationViewModel>();

  useEffect(() => {
    window.scrollTo(0, 0);

    findRecommendationCards().then((next) => {
      if (next !== undefined) {
        setViewModel(next);
      }
    });
  }, []);

  const title = useMemo(() => getTitle(viewModel), [viewModel]);

  if (viewModel === undefined) {
    return null;
  }

  const { cards } = viewModel;

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
            총 <span>{cards.length}개</span>의 리스트가 있습니다.
          </div>
        </div>
        <div className="section">
          {cards.length > 0 ? (
            <Lecture.Group type={Lecture.GroupType.Box}>
              {cards.map((item, i) => {
                const { card, cardRelatedCount } = item;

                return (
                  <li key={i}>
                    <CardGroup type={GroupType.Box}>
                      <CardView
                        cardId={item.card.id}
                        permittedCinerooms={card.permittedCinerooms}
                        learningTime={card.learningTime}
                        additionalLearningTime={card.additionalLearningTime}
                        thumbImagePath={card.thumbImagePath}
                        mainCategory={card.mainCategory}
                        name={card.name}
                        stampCount={card.stampCount}
                        simpleDescription={card.simpleDescription}
                        type={card.type}
                        passedStudentCount={cardRelatedCount.passedStudentCount}
                        starCount={cardRelatedCount.starCount}
                        langSupports={card.langSupports}
                      />
                    </CardGroup>
                  </li>
                );
              })}
            </Lecture.Group>
          ) : (
            <NoSuchContentPanel
              message={
                <div className="text">
                  <PolyglotText
                    defaultString="추천과정에 해당하는 학습 과정이 없습니다."
                    id="LRS-추천과정-없음"
                  />
                </div>
              }
            />
          )}
        </div>
      </Segment>
    </>
  );
}

export default LearningContainer;
