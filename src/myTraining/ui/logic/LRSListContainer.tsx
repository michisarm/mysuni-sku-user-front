import React, { useState, useEffect, useMemo } from 'react';
import { Segment } from 'semantic-ui-react';
import { Lecture } from 'lecture';
import { NoSuchContentPanel } from 'shared';
import CardView from '../../../lecture/shared/Lecture/ui/view/CardVIew';
import CardGroup, {
  GroupType,
} from '../../../lecture/shared/Lecture/sub/CardGroup';
import { SkProfileService } from 'profile/stores';

import { RecommendationViewModel } from '../../../lecture/recommend/viewmodel/RecommendationViewModel';
import { findRecommendationCardsFromContentBase } from '../../../lecture/recommend/api/recommendApi';
import { PolyglotText, getPolyglotText } from 'shared/ui/logic/PolyglotText';
import {
  LectureCardView,
  parseUserLectureCards,
} from '@sku/skuniv-ui-lecture-card';

const CONTENT_TYPE_NAME = '추천과정';

function getTitle(viewModel?: RecommendationViewModel) {
  if (viewModel === undefined) {
    return '';
  }
  const { recTitle } = viewModel;
  if (recTitle?.length > 0) {
    return `${SkProfileService.instance.profileMemberName}${getPolyglotText(
      '님의 학습 콘텐츠 기반 추천 과정',
      'home-Recommend-Title1'
    )}`;
  } else {
    return `${SkProfileService.instance.profileMemberName}님을 위한 mySUNI의 추천 과정`;
  }
}

function LRSListContainer() {
  const [viewModel, setViewModel] = useState<RecommendationViewModel>();

  useEffect(() => {
    window.scrollTo(0, 0);

    findRecommendationCardsFromContentBase().then((next) => {
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
          <div
            className="section-count"
            dangerouslySetInnerHTML={{
              __html: getPolyglotText(
                ' 총 <span>{totalCount}개</span>의 리스트가 있습니다.',
                'learning-학보드-게시물총수',
                {
                  totalCount: (cards.length || 0).toString(),
                }
              ),
            }}
          />
        </div>
        <div className="section">
          {cards.length > 0 ? (
            <Lecture.Group type={Lecture.GroupType.Box}>
              {parseUserLectureCards(cards).map((card, i) => {
                return (
                  <li key={i}>
                    <LectureCardView {...card} useBookMark={true} />
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

export default LRSListContainer;
