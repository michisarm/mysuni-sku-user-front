import React, { useEffect, useMemo, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { Button, Icon } from 'semantic-ui-react';
import { NoSuchContentPanel } from 'shared';
import { Lecture } from 'lecture';
import myTrainingRoutes from '../../../../myTraining/routePaths';
import { ContentWrapper } from '../MyLearningContentElementsView';
import ReactGA from 'react-ga';
import { Area } from 'tracker/model';
import { RecommendationViewModel } from '../../../../lecture/recommend/viewmodel/RecommendationViewModel';
import { findRecommendationCards } from '../../../../lecture/recommend/api/recommendApi';
import CardView from '../../../../lecture/shared/Lecture/ui/view/CardVIew';
import { useHistory } from 'react-router-dom';
import {
  getPolyglotText,
  PolyglotText,
} from '../../../../shared/ui/logic/PolyglotText';
import { takeTwoOfEachCollege } from 'lecture/model/CardWithCardRealtedCount';

function getTitle(
  profileMemberName: string,
  viewModel?: RecommendationViewModel
) {
  if (viewModel === undefined) {
    return '';
  }
  const { recTitle } = viewModel;
  if (recTitle?.length > 0) {
    // return `${profileMemberName}${recTitle}`; api에서 받아오는 recTitle내용 추후 변경시
    return `${profileMemberName} ${getPolyglotText(
      '님의 학습 콘텐츠 기반 추천 과정',
      'home-Recommend-Title1'
    )}`;
  } else {
    return `${profileMemberName} ${getPolyglotText(
      '님을 위한 mySUNI의 추천 과정',
      'home-Recommend-Title2'
    )}`;
  }
}

interface Props {
  profileMemberName: string;
}
const LRSLearning: React.FC<Props> = (Props) => {
  const { profileMemberName } = Props;
  const history = useHistory();
  const [viewModel, setViewModel] = useState<RecommendationViewModel>();

  useEffect(() => {
    findRecommendationCards().then((next) => {
      if (next !== undefined) {
        const sortedCards = takeTwoOfEachCollege(next.cards);
        setViewModel({
          ...next,
          cards: sortedCards,
        });
      }
    });
  }, []);

  const title = useMemo(
    () => getTitle(profileMemberName, viewModel),
    [profileMemberName, viewModel]
  );

  const onViewAll = () => {
    history.push(myTrainingRoutes.learningLrsLecture());

    // react-ga event
    ReactGA.event({
      category: '추천 과정',
      action: 'Click',
      label: '추천 과정 전체보기',
    });
  };

  // 210719 조회되는 cards 가 없을 시, 해당 섹션 보이지 않도록 수정됨.
  if (
    viewModel === undefined ||
    viewModel.cards === undefined ||
    viewModel.cards.length === 0
  ) {
    return null;
  }

  const { cards } = viewModel;

  return (
    <ContentWrapper dataArea={Area.MAIN_RECOMMEND}>
      <div className="section-head">
        <strong>{title}</strong>
        <div className="right">
          {cards.length > 0 && (
            <Button icon className="right btn-blue" onClick={onViewAll}>
              <PolyglotText
                defaultString="View all"
                id="home-Recommend-View all"
              />{' '}
              <Icon className="morelink" />
            </Button>
          )}
        </div>
      </div>

      {cards.length > 0 ? (
        <Lecture.Group
          type={Lecture.GroupType.Line}
          dataActionName={
            title.includes('학습 콘텐츠 기반 추천 과정')
              ? '학습 콘텐츠 기반 추천 과정'
              : 'mySUNI의 추천 과정'
          }
        >
          {cards.map(({ card, cardRelatedCount }) => (
            <li>
              <div className="ui cards box-cards">
                <CardView
                  key={card.id}
                  cardId={card.id}
                  {...card}
                  {...cardRelatedCount}
                  dataArea={Area.MAIN_RECOMMEND}
                />
              </div>
            </li>
          ))}
        </Lecture.Group>
      ) : (
        <NoSuchContentPanel
          message={
            <div className="text">
              <PolyglotText
                defaultString="추천과정에 해당하는 학습 과정이 없습니다."
                id="home-Recommend-목록없음"
              />
            </div>
          }
        />
      )}
    </ContentWrapper>
  );
};

export default LRSLearning;
