import React, { useEffect, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { Button, Icon, Segment } from 'semantic-ui-react';
import ReactGA from 'react-ga';
import { NoSuchContentPanel, Loadingpanel } from 'shared';
import { Lecture } from 'lecture';
import { ContentWrapper } from '../MyLearningContentElementsView';
import CardGroup, {
  GroupType,
} from '../../../../lecture/shared/Lecture/sub/CardGroup';
import {
  PolyglotText,
  getPolyglotText,
} from '../../../../shared/ui/logic/PolyglotText';
import {
  CardProps,
  LectureCardView,
  parseUserLectureCards,
  UserLectureCard,
} from '@sku/skuniv-ui-lecture-card';
import { SkProfileService } from '../../../../profile/stores';
import { Area } from '@sku/skuniv-ui-lecture-card/lib/views/lectureCard.models';
import { findMyLatestLearningCards } from '../../../../lecture/detail/api/cardApi';
import { hoverTrack } from 'tracker/present/logic/ActionTrackService';

interface Props extends RouteComponentProps {
  profileMemberName: string;
}

function InProgressLearning({ profileMemberName, history }: Props) {
  const [cardList, setCardList] = useState<CardProps[]>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetchLearningCardLsit();
  }, []);

  const fetchLearningCardLsit = async () => {
    const learningCardList = await findMyLatestLearningCards(8);
    const userLanguage = SkProfileService.instance.skProfile.language;

    if (learningCardList !== undefined) {
      setCardList(parseUserLectureCards(learningCardList, userLanguage));
      setIsLoading(false);
    }
  };

  const onViewAll = () => {
    history.push('/my-training/learning/InProgress/pages/1');

    // react-ga event
    ReactGA.event({
      category: '학습중인 과정',
      action: 'Click',
      label: '학습중인 과정 전체보기',
    });
  };

  return (
    <ContentWrapper dataArea={Area.MAIN_LEARNING}>
      <div className="section-head">
        <div
          dangerouslySetInnerHTML={{
            __html: `<strong>${getPolyglotText(
              `{profileMemberName}님이 학습중인 과정`,
              'home-Inprogress-Title',
              {
                profileMemberName,
              }
            )}</strong>`,
          }}
        />
        <div className="right">
          {cardList && cardList.length > 0 && (
            <Button icon className="right btn-blue" onClick={onViewAll}>
              <PolyglotText
                defaultString="View all"
                id="home-Inprogress-ViewAll"
              />{' '}
              <Icon className="morelink" />
            </Button>
          )}
        </div>
      </div>
      {cardList && cardList.length > 0 ? (
        <Lecture.Group
          type={Lecture.GroupType.Line}
          dataActionName="학습중인 과정"
        >
          {cardList.map((item, i) => {
            return (
              <li key={i}>
                <CardGroup type={GroupType.Box}>
                  <LectureCardView
                    {...item}
                    useBookMark={false} // bookMark 기능을 사용하면 true, 사용하지 않으면 false
                    dataArea={Area.MAIN_LEARNING}
                    hoverTrack={hoverTrack}
                  />
                </CardGroup>
              </li>
            );
          })}
        </Lecture.Group>
      ) : (
        <Segment
          style={{
            paddingTop: 0,
            paddingBottom: 0,
            paddingLeft: 0,
            paddingRight: 0,
            height: 400,
            boxShadow: '0 0 0 0',
            border: 0,
            background: '#eff0f1',
          }}
        >
          <Loadingpanel loading={isLoading} color="#eff0f1" />
          {!isLoading && (
            <NoSuchContentPanel
              message={
                <>
                  <div className="text">
                    <PolyglotText
                      defaultString="진행중인 학습 과정이 없습니다."
                      id="home-Inprogress-진행없음"
                    />
                  </div>
                  <Button
                    icon
                    as="a"
                    className="right btn-blue2"
                    onClick={onViewAll}
                  >
                    <span className="border">
                      <span className="ellipsis">{profileMemberName}</span>{' '}
                      <PolyglotText
                        defaultString="님이 학습 중인 과정 보기"
                        id="home-Inprogress-진행중"
                      />
                    </span>
                    <Icon className="morelink" />
                  </Button>
                </>
              }
            />
          )}
        </Segment>
      )}
    </ContentWrapper>
  );
}

export default withRouter(InProgressLearning);
