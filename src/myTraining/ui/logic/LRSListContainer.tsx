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
import {
  findRecommendationCardsFromContentBase,
  findRecommendationCardsFromLearningPatternBased,
} from '../../../lecture/recommend/api/recommendApi';
import { PolyglotText, getPolyglotText } from 'shared/ui/logic/PolyglotText';
import {
  LectureCardView,
  parseUserLectureCards,
} from '@sku/skuniv-ui-lecture-card';
import { fi } from 'date-fns/locale';
import { parsePolyglotString } from '../../../shared/viewmodel/PolyglotString';
import { Area } from '@sku/skuniv-ui-lecture-card/lib/views/lectureCard.models';
import { hoverTrack } from 'tracker/present/logic/ActionTrackService';

const CONTENT_TYPE_NAME = '추천과정';

function getTitle() {
  const search = window.location.search;
  if (search.includes('LearningPatternBased')) {
    return getPolyglotText(
      '{name} 님의 학습패턴을 기반으로 AI가 추천 드려요!',
      'lrs-title1',
      {
        name: SkProfileService.instance.profileMemberName,
      }
    );
  } else {
    return getPolyglotText(
      '{name}님과 유사한 학습자들을 분석하여 추천드려요~',
      'lrs-title2',
      {
        name: SkProfileService.instance.profileMemberName,
      }
    );
  }
}

function LRSListContainer() {
  const [viewModel, setViewModel] = useState<RecommendationViewModel>();

  useEffect(() => {
    window.scrollTo(0, 0);

    const search = window.location.search;
    if (search.includes('LearningPatternBased')) {
      findRecommendationCardsFromLearningPatternBased().then((next) => {
        if (next !== undefined) {
          setViewModel(next);
        }
      });
    } else {
      findRecommendationCardsFromContentBase().then((next) => {
        if (next !== undefined) {
          setViewModel(next);
        }
      });
    }
  }, []);

  const title = useMemo(() => getTitle(), []);

  if (viewModel === undefined) {
    return null;
  }

  const { cards } = viewModel;

  return (
    <>
      <div className="ma-title">
        <div className="inner">
          <h2
            dangerouslySetInnerHTML={{
              __html: title,
            }}
          />
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
              {parseUserLectureCards(
                cards,
                SkProfileService.instance.skProfile.language
              ).map((card, i) => {
                return (
                  <LectureCardView
                    {...card}
                    useBookMark={true}
                    dataArea={
                      window.location.search.includes('LearningPatternBased')
                        ? Area.NEWLEARNING_RECOMMEND
                        : Area.NEWLEARNING_PATTERN
                    }
                    hoverTrack={hoverTrack}
                  />
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
