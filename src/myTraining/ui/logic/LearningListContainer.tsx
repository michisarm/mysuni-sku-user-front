/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { Segment } from 'semantic-ui-react';
import { Lecture } from 'lecture';
import { NoSuchContentPanel } from 'shared';
import { useRequestCollege } from 'shared/service/useCollege/useRequestCollege';
import isIncludeCineroomId from 'shared/helper/isIncludeCineroomId';
import { CardWithCardRealtedCount } from '../../../lecture/model/CardWithCardRealtedCount';
import { UpcomingClassroomInfo } from '../../../lecture/model/UpcomingClassroomInfo';
import { findCardList } from '../../../lecture/detail/api/cardApi';
import CardView from '../../../lecture/shared/Lecture/ui/view/CardVIew';
import CardGroup, {
  GroupType,
} from '../../../lecture/shared/Lecture/sub/CardGroup';
import { findAvailableCardBundles } from '../../../lecture/shared/api/arrangeApi';
import { find } from 'lodash';
import { findEnrollingCardList } from '../../../lecture/detail/api/cardApi';
import LectureFilterRdoModel from '../../../lecture/model/LectureFilterRdoModel';
import { ContentType } from '../page/NewLearningPage';
import { ListRightTopPanel, ListTopPanelTemplate } from '../view/panel';
import { Area } from 'tracker/model';
import { parsePolyglotString } from 'shared/viewmodel/PolyglotString';

interface MatchPrams {
  type: string;
}

type CardListExtendsUpcomingClassRom = CardWithCardRealtedCount & {
  upcomingClassroomInfo?: UpcomingClassroomInfo;
};

function LearningContainer({ match }: RouteComponentProps<MatchPrams>) {
  const [cardList, setCardList] = useState<CardListExtendsUpcomingClassRom[]>(
    []
  );
  const [viewType, setViewType] = useState<EnrollingViewType>('All');
  const [cardType, setCardType] = useState<String>();
  const [dataArea, setDataArea] = useState<Area>();

  const onChangeViewType = (e: any, data: any, func?: any) => {
    setViewType(data.value);
  };
  const [title, setTitle] = useState('');
  const [subTitle, setSubTitle] = useState('');

  // url 에서 타입 받도록 변경 필요
  // let contentType = 'Enrolling';
  const contentType = match.params.type;

  const fetchCardList = async () => {
    // 수강 신청 모아보기 Card list 조회
    if (contentType == ContentType.Enrolling) {
      let excludeClosed = false;

      if (viewType === 'Available') {
        excludeClosed = true;
      }

      setTitle('수강 신청 과정 모아보기');
      setSubTitle('사전 수강 신청이 필요한 과정들을 조회할 수 있습니다.');

      const cardList = await findEnrollingCardList(
        LectureFilterRdoModel.enrLectures(0, 0, excludeClosed)
      );

      if (cardList) {
        setCardList(cardList.results);
      }
    } else {
      const cardBundles = await findAvailableCardBundles();

      // 현재는 uuid 값을 받아서 필터 유니크한 타입이 생성이 되면 id => type으로 변경시켜야 한다.
      const filteredCardBundle = find(cardBundles, { id: match.params.type });

      if (filteredCardBundle) {
        setTitle(parsePolyglotString(filteredCardBundle.displayText));
        setCardType(filteredCardBundle.type);

        const joinedIds = filteredCardBundle.cardIds.join();
        const cardList = await findCardList(joinedIds);

        if (cardList) {
          setCardList(cardList);
        }
      }
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchCardList();
  }, [viewType]);

  useEffect(() => {
    let area = null;
    switch (contentType) {
      case ContentType.Recommend:
        area = Area.NEWLEARNING_RECOMMEND;
        break;
      case ContentType.Enrolling:
        area = Area.NEWLEARNING_ENROLLING;
        break;
      default:
        switch (cardType) {
          case 'Normal':
            area = Area.NEWLEARNING_NORMAL;
            break;
          case 'Popular':
            area = Area.NEWLEARNING_POPULAR;
            break;
          case 'New':
            area = Area.NEWLEARNING_NEW;
            break;
          case 'Recommended':
            area = Area.NEWLEARNING_RECOMMEND;
            break;
        }
        break;
    }
    if (area) {
      setDataArea(area);
    }
  }, [contentType, cardType]);

  return (
    <>
      <div className="ma-title">
        <div className="inner">
          <h2>{title}</h2>
          <p className="txt">{subTitle}</p>
        </div>
      </div>
      <Segment className="full">
        <div className="sort-reult">
          <div className="section-count">
            총 <span>{cardList.length}개</span>의 리스트가 있습니다.
          </div>

          {contentType == ContentType.Enrolling && (
            <div className="comments-sort">
              <ListTopPanelTemplate
                className="right-wrap"
                contentType={contentType}
              >
                <ListRightTopPanel
                  contentType={contentType}
                  checkedViewType={viewType}
                  resultEmpty={false}
                  onChangeViewType={onChangeViewType}
                />
              </ListTopPanelTemplate>
            </div>
          )}
        </div>
        <div className="section">
          {cardList.length > 0 ? (
            <Lecture.Group type={Lecture.GroupType.Box}>
              {cardList.map((item, i) => {
                const { card, cardRelatedCount, upcomingClassroomInfo } = item;
                return (
                  <CardView
                    key={item.card.id}
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
                    capacity={upcomingClassroomInfo?.capacity}
                    studentCount={upcomingClassroomInfo?.studentCount}
                    remainingDayCount={upcomingClassroomInfo?.remainingDayCount}
                    dataArea={dataArea}
                    langSupports={card.langSupports}
                  />
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
export type EnrollingViewType = 'All' | 'Available'; // 전체보기 | 수강 신청 가능 과정 모아보기
