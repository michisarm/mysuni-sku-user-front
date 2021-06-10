import React, { useEffect, useState } from 'react';
import { mobxHelper, reactAlert } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router';
import { patronInfo } from '@nara.platform/dock';
import { find } from 'lodash';

import { Button, Icon, ButtonProps } from 'semantic-ui-react';
import { ReviewService } from '@nara.drama/feedback';

import { NoSuchContentPanel } from 'shared';
import lectureRoutePaths from 'lecture/routePaths';
import myTrainingRoutes from 'myTraining/routePaths';
import { LectureModel, LectureServiceType } from 'lecture/model';
import { NEWLectureService } from 'lecture/stores';
import { Lecture } from 'lecture';
import {
  MyTrainingModel,
  InMyLectureCdoModel,
  InMyLectureModel,
} from 'myTraining/model';
import { InMyLectureService } from 'myTraining/stores';
import { ContentWrapper } from '../MyLearningContentElementsView';
import LectureFilterRdoModel from '../../../../lecture/model/LectureFilterRdoModel';
import OffsetElementList from '../../../../shared/model/OffsetElementList';
import ReactGA from 'react-ga';
import { Area } from 'tracker/model';
import { findAvailableCardBundles } from '../../../../lecture/shared/api/arrangeApi';
import { findCardList } from '../../../../lecture/detail/api/cardApi';
import { CardBundle } from '../../../../lecture/shared/model/CardBundle';
import CardView from '../../../../lecture/shared/Lecture/ui/view/CardVIew';
import CardGroup, {
  GroupType,
} from '../../../../lecture/shared/Lecture/sub/CardGroup';
import { useRequestCollege } from '../../../../shared/service/useCollege/useRequestCollege';
interface Props extends RouteComponentProps {
  reviewService?: ReviewService;
  newLectureService?: NEWLectureService;
  inMyLectureService?: InMyLectureService;
}

const NEWLearning: React.FC<Props> = function NEWLearning({
  reviewService,
  newLectureService,
  inMyLectureService,
  history,
}) {
  const CONTENT_TYPE_NAME = '신규과정';
  // const PAGE_SIZE = 8;
  // const { newLectures } = newLectureService!;
  // const [title, setTitle] = useState<string | null>('');
  const [newCard, setNewCard] = useState<CardBundle>();

  const fetchNewCards = async () => {
    const response = await findAvailableCardBundles();
    // 신규이기 때문에 type이 New 인 부분을 가져옴
    const findResponse = find(response, { type: 'New' });

    // cards 값에 api로 받아온 cardList 값을 넣어줌
    if (findResponse?.cardIds) {
      const joinedIds = findResponse.cardIds.join();

      const cardList = await findCardList(joinedIds);

      if (cardList !== undefined) {
        findResponse.cards = cardList;
      }
    }

    setNewCard(findResponse);
  };

  useEffect(() => {
    fetchNewCards();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const findMyContent = async () => {
  //   newLectureService!.clearLectures();

  //   // 세션 스토리지에 정보가 있는 경우 가져오기
  //   const savedNewLearningList =
  //     window.navigator.onLine &&
  //     window.sessionStorage.getItem('NewLearningList');

  //   if (savedNewLearningList && savedNewLearningList.length > 0) {
  //     const newMain: OffsetElementList<LectureModel> = JSON.parse(savedNewLearningList);

  //     if (newMain.results.length > PAGE_SIZE - 1) {
  //       newLectureService!.setPagingNewLectures(newMain);
  //       if (!newMain || !newMain.title || newMain.title.length < 1) {
  //         setTitle(newLectureService!.Title);
  //       } else {
  //         setTitle(newMain.title);
  //       }
  //       return;
  //     }
  //   }

  //   newLectureService!
  //     .findPagingNewLectures(
  //       LectureFilterRdoModel.newLectures(PAGE_SIZE, 0),
  //       true
  //     )
  //     .then(response => {
  //       newLectureService!.setTitle(response.title);
  //       if (!response || !response.title || response.title.length < 1) {
  //         setTitle(newLectureService!.Title);
  //       } else {
  //         setTitle(response.title);
  //       }
  //     });
  // };

  //   // // lectureService 변경  실행
  // useEffect(() => {
  //   findMyContent();
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const getInMyLecture = (serviceId: string) => {
    //
    const { inMyLectureMap } = inMyLectureService!;
    return inMyLectureMap.get(serviceId);
  };

  // const getRating = (learning: LectureModel | InMyLectureModel | CardBundle) => {
  //   //
  //   const { ratingMap } = reviewService!;
  //   let rating: number | undefined;

  //   if (
  //     learning instanceof InMyLectureModel &&
  //     learning.cubeType !== CubeType.Community
  //   ) {
  //     rating = ratingMap.get(learning.reviewId) || 0;
  //   } else if (
  //     learning instanceof LectureModel &&
  //     learning.cubeType !== CubeType.Community
  //   ) {
  //     rating = learning.rating;
  //   }
  //   return rating;
  // };

  const onViewAll = () => {
    //
    window.sessionStorage.setItem('from_main', 'TRUE');
    history.push(myTrainingRoutes.learningNewLecture());

    // react-ga event
    ReactGA.event({
      category: '신규 과정',
      action: 'Click',
      label: '신규 과정 전체보기',
    });
  };

  const onViewDetail = (e: any, data: ButtonProps) => {
    console.log(data);
    // const { model } = data;
    const { card } = data;

    // react-ga event
    ReactGA.event({
      category: '메인_신규',
      action: 'Click Card',
      // label: `${model.serviceType === 'Course' ? '(Course)' : '(Cube)'} - ${
      //   model.name
      // }`,
      // label: `${card.name}`,
    });

    const patronKey = newCard?.patronKey && newCard.patronKey.keyString; // model.servicePatronKeyString
    const cineroom =
      patronInfo.getCineroomByPatronId(patronKey!) ||
      patronInfo.getCineroomByDomain(card)!; // patronKey 값

    // history.push(
    //   lectureRoutePaths.lectureCardOverview(
    //     cineroom.id,
    //     card.categories[0].college.id, //model.category.college.id,
    //     card.id, //model.cubeId,
    //     '' // model.serviceId
    //   )
    // );
    // if (
    //   model.serviceType === LectureServiceType.Program ||
    //   model.serviceType === LectureServiceType.Course
    // ) {
    //   history.push(
    //     lectureRoutePaths.courseOverview(
    //       cineroom.id,
    //       model.category.college.id,
    //       model.coursePlanId,
    //       model.serviceType,
    //       model.serviceId
    //     )
    //   );
    // } else if (model.serviceType === LectureServiceType.Card) {
    // history.push(
    //   lectureRoutePaths.lectureCardOverview(
    //     cineroom.id,
    //     model.category.college.id,
    //     model.cubeId,
    //     model.serviceId
    //   )
    // );
    // }
  };

  const onActionLecture = (
    training: MyTrainingModel | LectureModel | InMyLectureModel
  ) => {
    //
    if (training instanceof InMyLectureModel) {
      inMyLectureService!.removeInMyLecture(training.id);
    } else {
      let servicePatronKeyString = training.patronKey.keyString;

      if (training instanceof MyTrainingModel) {
        servicePatronKeyString = training.servicePatronKeyString;
      }
      inMyLectureService!.addInMyLecture(
        new InMyLectureCdoModel({
          serviceId: training.serviceId,
          serviceType: training.serviceType,
          category: training.category,
          name: training.name,
          description: training.description,
          cubeType: training.cubeType,
          learningTime: training.learningTime,
          stampCount: training.stampCount,
          coursePlanId: training.coursePlanId,

          requiredSubsidiaries: training.requiredSubsidiaries,
          cubeId: training.cubeId,
          courseSetJson: training.courseSetJson,
          courseLectureUsids: training.courseLectureUsids,
          lectureCardUsids: training.lectureCardUsids,

          reviewId: training.reviewId,
          baseUrl: training.baseUrl,
          servicePatronKeyString,
        })
      );
    }
  };

  return (
    <ContentWrapper dataArea={Area.MAIN_NEW}>
      <div className="section-head">
        <strong>{newCard?.displayText}</strong>
        <div className="right">
          {newCard?.cards && newCard.cards.length > 0 && (
            <Button icon className="right btn-blue" onClick={onViewAll}>
              View all <Icon className="morelink" />
            </Button>
          )}
        </div>
      </div>
      {newCard?.cards && newCard.cards.length > 0 ? (
        <Lecture.Group type={Lecture.GroupType.Line}>
          {newCard.cards.map((item, i) => {
            const { card, cardRelatedCount } = item;
            const inMyLecture = getInMyLecture(card.id);
            // const inMyLecture = getInMyLecture("");

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
          {/* {newLectures.map(
            (
              learning: LectureModel | MyTrainingModel | InMyLectureModel,
              index: number
            ) => {
              const inMyLecture = getInMyLecture(learning.serviceId);

              return (
                <Lecture
                  key={`learning-${index}`}
                  model={learning}
                  rating={getRating(learning)}
                  thumbnailImage={learning.baseUrl || undefined}
                  action={
                    inMyLecture
                      ? Lecture.ActionType.Remove
                      : Lecture.ActionType.Add
                  }
                  onAction={() => {
                    reactAlert({
                      title: '알림',
                      message: inMyLecture
                        ? '본 과정이 관심목록에서 제외되었습니다.'
                        : '본 과정이 관심목록에 추가되었습니다.',
                    });
                    onActionLecture(inMyLecture || learning);
                  }}
                  onViewDetail={onViewDetail}
                />
              );
            }
          )} */}
        </Lecture.Group>
      ) : (
        <NoSuchContentPanel
          message={
            <div className="text">
              {CONTENT_TYPE_NAME}에 해당하는 학습 과정이 없습니다.
            </div>
          }
        />
      )}
    </ContentWrapper>
  );
};

export default inject(
  mobxHelper.injectFrom(
    'shared.reviewService',
    'newLecture.newLectureService',
    'myTraining.inMyLectureService'
  )
)(withRouter(observer(NEWLearning)));
