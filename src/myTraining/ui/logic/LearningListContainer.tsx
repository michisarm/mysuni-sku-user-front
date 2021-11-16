import React, { useState, useEffect } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { Segment } from 'semantic-ui-react';
import { Lecture } from 'lecture';
import { NoSuchContentPanel } from 'shared';
import isIncludeCineroomId from 'shared/helper/isIncludeCineroomId';
import { CardWithCardRealtedCount } from '../../../lecture/model/CardWithCardRealtedCount';
import { UpcomingClassroomInfo } from '../../../lecture/model/UpcomingClassroomInfo';
import { findCardList } from '../../../lecture/detail/api/cardApi';
import { findAvailableCardBundles } from '../../../lecture/shared/api/arrangeApi';
import { find } from 'lodash';
import { findEnrollingCardList } from '../../../lecture/detail/api/cardApi';
import LectureFilterRdoModel from '../../../lecture/model/LectureFilterRdoModel';
import { ContentType } from '../page/NewLearningPage';
import { ListRightTopPanel, ListTopPanelTemplate } from '../view/panel';
import { parsePolyglotString } from 'shared/viewmodel/PolyglotString';
import { getPolyglotText } from 'shared/ui/logic/PolyglotText';
import {
  CardProps,
  LectureCardView,
  parseUserLectureCards,
} from '@sku/skuniv-ui-lecture-card';
import {
  Area,
  UserLectureCard,
} from '@sku/skuniv-ui-lecture-card/lib/views/lectureCard.models';
import { SkProfileService } from '../../../profile/stores';
import { hoverTrack } from 'tracker/present/logic/ActionTrackService';

interface MatchPrams {
  type: string;
}

type CardListExtendsUpcomingClassRom = CardWithCardRealtedCount & {
  upcomingClassroomInfo?: UpcomingClassroomInfo;
};

function LearningContainer({ match }: RouteComponentProps<MatchPrams>) {
  // const [cardList, setCardList] = useState<UserLectureCard[]>([]);
  const [cardList, setCardList] = useState<CardProps[]>([]);
  const [viewType, setViewType] = useState<EnrollingViewType>('All');
  const [cardType, setCardType] = useState<String>();
  const [dataArea, setDataArea] = useState<Area>();

  const userLanguage = SkProfileService.instance.skProfile.language;
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
        setCardList(parseUserLectureCards(cardList.results, userLanguage));
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
          setCardList(parseUserLectureCards(cardList, userLanguage));
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
          <div
            className="section-count"
            dangerouslySetInnerHTML={{
              __html: getPolyglotText(
                ' 총 <span>{totalCount}개</span>의 리스트가 있습니다.',
                'learning-학보드-게시물총수',
                {
                  totalCount: (cardList.length || 0).toString(),
                }
              ),
            }}
          />

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
              {cardList.map((card, i) => {
                return (
                  // <LectureCardView
                  //   cardId={card.id}
                  //   cardName={parsePolyglotString(card.name)}
                  //   learningTime={String(card.learningTime)}
                  //   thumbnailImagePath={card.thumbImagePath}
                  //   difficultyLevel={card.difficultyLevel}
                  //   passedStudentCount={String(card.passedStudentCount)}
                  //   starCount={String(card.starCount)}
                  //   simpleDescription={parsePolyglotString(
                  //     card.simpleDescription
                  //   )}
                  //   studentCount={card.studentCount}
                  //   userLanguage={userLanguage}
                  //   langSupports={card.langSupports}
                  //   collegeId={card.mainCollegeId}
                  //   isRequiredLecture={card.required}
                  //   upcomingClassroomInfo={card.upcomingClassroomInfo}
                  // />
                  <LectureCardView {...card} useBookMark dataArea={dataArea} hoverTrack={hoverTrack}/>

                  // <CardView
                  //   key={item.card.id}
                  //   cardId={item.card.id}
                  //   permittedCinerooms={card.permittedCinerooms}
                  //   learningTime={card.learningTime}
                  //   additionalLearningTime={card.additionalLearningTime}
                  //   thumbImagePath={card.thumbImagePath}
                  //   mainCategory={card.mainCategory}
                  //   name={card.name}
                  //   stampCount={card.stampCount}
                  //   simpleDescription={card.simpleDescription}
                  //   type={card.type}
                  //   passedStudentCount={cardRelatedCount.passedStudentCount}
                  //   starCount={cardRelatedCount.starCount}
                  //   capacity={upcomingClassroomInfo?.capacity}
                  //   studentCount={upcomingClassroomInfo?.studentCount}
                  //   remainingDayCount={upcomingClassroomInfo?.remainingDayCount}
                  //   dataArea={dataArea}
                  //   langSupports={card.langSupports}
                  // />
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
