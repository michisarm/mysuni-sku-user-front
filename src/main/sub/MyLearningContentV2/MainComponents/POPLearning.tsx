import React, { useEffect, useState } from 'react';
import { mobxHelper, reactAlert } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router';
import { patronInfo } from '@nara.platform/dock';

import { Button, Icon } from 'semantic-ui-react';
import { ReviewService } from '@nara.drama/feedback';
import { CubeType } from 'shared/model';
import { NoSuchContentPanel } from 'shared';

import lectureRoutes from 'lecture/routePaths';
import myTrainingRoutes from 'myTraining/routePaths';
import { LectureModel, LectureServiceType } from 'lecture/model';
import { POPLectureService } from 'lecture/stores';
import { Lecture } from 'lecture';
import {
  MyTrainingModel,
  InMyLectureCdoModel,
  InMyLectureModel,
} from 'myTraining/model';
import { ContentWrapper } from '../MyLearningContentElementsView';
import LectureFilterRdoModel from '../../../../lecture/model/LectureFilterRdoModel';
import OffsetElementList from '../../../../shared/model/OffsetElementList';
import ReactGA from 'react-ga';
import { Area } from 'tracker/model';
import { getAxios } from '../../../../shared/api/Axios';

import { find } from 'lodash';
import { findAvailableCardBundles } from '../../../../lecture/shared/api/arrangeApi';

import { CardBundle } from '../../../../lecture/shared/model/CardBundle';
import { CardWithCardRealtedCount } from '../../../../lecture/model/CardWithCardRealtedCount';
import CardView from '../../../../lecture/shared/Lecture/ui/view/CardVIew';
import CardGroup, {
  GroupType,
} from '../../../../lecture/shared/Lecture/sub/CardGroup';
import { PolyglotText } from '../../../../shared/ui/logic/PolyglotText';
import { parsePolyglotString } from 'shared/viewmodel/PolyglotString';
import { UserLectureCard } from '@sku/skuniv-ui-lecture-card';

interface Props extends RouteComponentProps {
  reviewService?: ReviewService;
  popLectureService?: POPLectureService;

  profileMemberName: string;
}

const POPLearning: React.FC<Props> = (Props) => {
  //
  const { reviewService, popLectureService, profileMemberName, history } =
    Props;

  const CONTENT_TYPE_NAME = '인기과정';
  const PAGE_SIZE = 8;

  const { popLectures } = popLectureService!;
  const [popCard, setPopCard] = useState<CardBundle>();

  // cardIds를 사용하여 card list를 불러온다.
  const findCardData = (ids: string[]) => {
    const axios = getAxios();
    const url = '/api/lecture/cards/findCards';
    const joinedIds = ids && ids.join();

    return axios
      .get<UserLectureCard[]>(url, { params: { ids: joinedIds } })
      .then((res) => res.data);
  };

  const fetchPopCards = async () => {
    const response = await findAvailableCardBundles();
    // 인기이기 때문에 type이 Popular 인 부분을 가져옴
    const findResponse = find(response, { type: 'Popular' });

    // cards 값에 api로 받아온 cardList 값을 넣어줌
    if (findResponse?.cardIds) {
      const cardList = await findCardData(findResponse.cardIds);
      findResponse.cards = cardList;
    }

    setPopCard(findResponse);
  };

  useEffect(() => {
    fetchPopCards();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [title, setTitle] = useState<string | null>('');

  // // lectureService 변경  실행
  // useEffect(() => {
  //   findMyContent();
  // }, [findMyContent]);

  const findMyContent = async () => {
    popLectureService!.clearLectures();

    // 세션 스토리지에 정보가 있는 경우 가져오기
    const savedPopularLearningList =
      window.navigator.onLine &&
      window.sessionStorage.getItem('PopLearningList');
    if (savedPopularLearningList && savedPopularLearningList.length > 0) {
      const popularMain: OffsetElementList<LectureModel> = JSON.parse(
        savedPopularLearningList
      );
      if (popularMain.results.length > PAGE_SIZE - 1) {
        popLectureService!.setPagingPopLectures(popularMain);
        if (
          !popularMain ||
          !popularMain.title ||
          popularMain.title.length < 1
        ) {
          setTitle(popLectureService!.Title);
        } else {
          setTitle(popularMain.title);
        }
        return;
      }
    }

    popLectureService!
      .findPagingPopLectures(
        LectureFilterRdoModel.newLectures(PAGE_SIZE, 0),
        true
      )
      .then((response) => {
        popLectureService!.setTitle(response.title);
        if (!response || !response.title || response.title.length < 1) {
          setTitle(popLectureService!.Title);
        } else {
          setTitle(response.title);
        }
      });
  };

  const getRating = (learning: LectureModel | InMyLectureModel) => {
    //
    const { ratingMap } = reviewService!;
    let rating: number | undefined;

    if (
      learning instanceof InMyLectureModel &&
      learning.cubeType !== CubeType.Community
    ) {
      rating = ratingMap.get(learning.reviewId) || 0;
    } else if (
      learning instanceof LectureModel &&
      learning.cubeType !== CubeType.Community
    ) {
      rating = learning.rating;
    }
    return rating;
  };

  const onViewAll = () => {
    //
    window.sessionStorage.setItem('from_main', 'TRUE');
    history.push(myTrainingRoutes.learningPopLecture());

    // react-ga event
    ReactGA.event({
      category: '인기 과정',
      action: 'Click',
      label: '인기 과정 전체보기',
    });
  };

  const onViewDetail = (e: any, data: any) => {
    //
    //const { model } = data;
    const { card } = data;
    // react-ga event
    ReactGA.event({
      category: '메인_인기',
      action: 'Click Card',
      // label: `${model.serviceType === 'Course' ? '(Course)' : '(Cube)'} - ${
      //   model.name
      // }`,
      label: `${card.name}`,
    });

    const patronKey = popCard?.patronKey && popCard.patronKey.keyString; // model.servicePatronKeyString
    const cineroom =
      patronInfo.getCineroomByPatronId(patronKey!) ||
      patronInfo.getCineroomByDomain(card)!; // patronKey 값

    // if (
    //   model.serviceType === LectureServiceType.Program ||
    //   model.serviceType === LectureServiceType.Course
    // ) {
    //   history.push(
    //     lectureRoutes.courseOverview(
    //       cineroom.id,
    //       model.category.college.id,
    //       model.coursePlanId,
    //       model.serviceType,
    //       model.serviceId
    //     )
    //   );
    // } else if (model.serviceType === LectureServiceType.Card) {
    //   history.push(
    //     lectureRoutes.lectureCardOverview(
    //       cineroom.id,
    //       model.category.college.id,
    //       model.cubeId,
    //       model.serviceId
    //     )
    //   );
    // }
  };

  const onActionLecture = (
    training: MyTrainingModel | LectureModel | InMyLectureModel
  ) => {
    //
    // if (training instanceof InMyLectureModel) {
    //   inMyLectureService!.removeInMyLecture(training.id);
    // } else {
    //   let servicePatronKeyString = training.patronKey.keyString;
    //   if (training instanceof MyTrainingModel) {
    //     servicePatronKeyString = training.servicePatronKeyString;
    //   }
    //   inMyLectureService!.addInMyLecture(
    //     new InMyLectureCdoModel({
    //       serviceId: training.serviceId,
    //       serviceType: training.serviceType,
    //       category: training.category,
    //       name: training.name ? parsePolyglotString(training.name) : '',
    //       description: training.description,
    //       cubeType: training.cubeType,
    //       learningTime: training.learningTime,
    //       stampCount: training.stampCount,
    //       coursePlanId: training.coursePlanId,
    //       requiredSubsidiaries: training.requiredSubsidiaries,
    //       cubeId: training.cubeId,
    //       courseSetJson: training.courseSetJson,
    //       courseLectureUsids: training.courseLectureUsids,
    //       lectureCardUsids: training.lectureCardUsids,
    //       reviewId: training.reviewId,
    //       baseUrl: training.baseUrl,
    //       servicePatronKeyString,
    //     })
    //   );
    // }
  };

  const routeToRecommend = () => {
    history.push(lectureRoutes.recommend());
  };

  return (
    <ContentWrapper dataArea={Area.MAIN_POPULAR}>
      <div className="section-head">
        <strong>{popCard?.displayText}</strong>
        <div className="right">
          {popCard?.cards && popCard.cards.length > 0 && (
            <Button icon className="right btn-blue" onClick={onViewAll}>
              View all <Icon className="morelink" />
            </Button>
          )}
        </div>
      </div>

      {popCard?.cards && popCard.cards.length > 0 ? (
        <Lecture.Group type={Lecture.GroupType.Line}>
          {popCard.cards.map((card, i) => {
            return (
              <li>
                {/* <CardGroup type={GroupType.Box}>
                  <CardView
                    cardId={item.card.id}
                    learningTime={card.learningTime}
                    thumbImagePath={card.thumbImagePath}
                    categories={card.categories}
                    name={card.name}
                    stampCount={card.stampCount}
                    description={card.description}
                    passedStudentCount={cardRelatedCount.passedStudentCount}
                    starCount={cardRelatedCount.starCount}
                    onViewDetail={onViewDetail}
                  />
                </CardGroup> */}
              </li>
            );
          })}
        </Lecture.Group>
      ) : (
        <NoSuchContentPanel
          message={
            <>
              <div className="text">
                <PolyglotText
                  defaultString="진행중인 학습 과정이 없습니다."
                  id="home-Recommend-Null"
                />
              </div>
              <Button
                icon
                as="a"
                className="right btn-blue2"
                onClick={routeToRecommend}
              >
                <span className="border">
                  <span className="ellipsis">{profileMemberName}</span>
                  <PolyglotText
                    defaultString="님에게 추천하는 학습 과정 보기"
                    id="home-Recommend-Recommend"
                  />
                </span>
                <Icon className="morelink" />
              </Button>
            </>
          }
        />
      )}
    </ContentWrapper>
  );
};

export default inject(
  mobxHelper.injectFrom(
    'shared.reviewService',
    'popLecture.popLectureService',
    'myTraining.inMyLectureService'
  )
)(withRouter(observer(POPLearning)));
