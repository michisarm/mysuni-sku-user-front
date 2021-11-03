/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { Button, Icon } from 'semantic-ui-react';
import { NoSuchContentPanel } from 'shared';
import { Lecture } from 'lecture';
import { ContentWrapper } from '../MyLearningContentElementsView';
import ReactGA from 'react-ga';
import { findCardFromCardBundle } from '../../../../lecture/detail/api/cardApi';
import { CardBundle } from '../../../../lecture/shared/model/CardBundle';
import CardGroup, {
  GroupType,
} from '../../../../lecture/shared/Lecture/sub/CardGroup';
import {
  parseLanguage,
  parsePolyglotString,
} from 'shared/viewmodel/PolyglotString';
import { getPolyglotText } from 'shared/ui/logic/PolyglotText';
import {
  CardProps,
  LectureCardView,
  parseUserLectureCards,
} from '@sku/skuniv-ui-lecture-card';
import { SkProfileService } from '../../../../profile/stores';
import { Area } from '@sku/skuniv-ui-lecture-card/lib/views/lectureCard.models';

interface Props extends RouteComponentProps {
  profileMemberName?: string;
  cardBundle: CardBundle;
}

const LearningContainer: React.FC<Props> = function LearningContainer({
  cardBundle,
  history,
}) {
  const [dataArea, setDataArea] = useState<Area>();
  const [cardList, setCardList] = useState<CardProps[]>([]);
  const isRecommend = cardBundle.type === 'Recommended';

  const fetchCardList = async () => {
    const userLanguage = parseLanguage(
      SkProfileService.instance.skProfile.language
    );

    if (cardBundle.cardIds) {
      const cardList = await findCardFromCardBundle(
        cardBundle.cardIds,
        8,
        false
      );

      if (cardList !== undefined) {
        setCardList(parseUserLectureCards(cardList, userLanguage));
      }
    }
  };

  useEffect(() => {
    fetchCardList();
  }, []);

  const onViewAll = () => {
    const { id, type } = cardBundle;

    window.sessionStorage.setItem('from_main', 'TRUE');

    history.push(`/my-training/new-learning/${id}/pages/1`);

    // react-ga event
    ReactGA.event({
      category: type,
      action: 'Click',
      label: `${type} 전체보기`,
    });
  };

  useEffect(() => {
    const { type } = cardBundle;
    switch (type) {
      case 'Normal':
        setDataArea(Area.MAIN_NORMAL);
        break;
      case 'New':
        setDataArea(Area.MAIN_NEW);
        break;
      case 'Popular':
        setDataArea(Area.MAIN_POPULAR);
        break;
      case 'Recommended':
        setDataArea(Area.MAIN_RECOMMEND);
        break;
    }
  }, [cardBundle]);

  if (cardList.length === 0 && isRecommend) {
    return null;
  }

  return (
    <ContentWrapper dataArea={dataArea}>
      <div className="section-head">
        <strong>{parsePolyglotString(cardBundle?.displayText)}</strong>
        <div className="right">
          {cardList.length > 0 && (
            <Button icon className="right btn-blue" onClick={onViewAll}>
              View all <Icon className="morelink" />
            </Button>
          )}
        </div>
      </div>
      {cardList.length > 0 ? (
        <Lecture.Group
          type={Lecture.GroupType.Line}
          dataActionName={parsePolyglotString(cardBundle?.displayText)}
        >
          {cardList.map((item, i) => {
            return (
              <li key={i}>
                <CardGroup type={GroupType.Box}>
                  <LectureCardView
                    {...item}
                    useBookMark={true} // bookMark 기능을 사용하면 true, 사용하지 않으면 false
                    dataArea={dataArea}
                  />
                </CardGroup>
              </li>
            );
          })}
        </Lecture.Group>
      ) : (
        <NoSuchContentPanel
          message={
            <div
              className="text"
              dangerouslySetInnerHTML={{
                __html: getPolyglotText(
                  `{bundleName}에 해당하는 학습 과정이 없습니다.`,
                  'home-bundleName-title',
                  {
                    bundleName: parsePolyglotString(cardBundle.displayText),
                  }
                ),
              }}
            />
          }
        />
      )}
    </ContentWrapper>
  );
};

export default withRouter(LearningContainer);
