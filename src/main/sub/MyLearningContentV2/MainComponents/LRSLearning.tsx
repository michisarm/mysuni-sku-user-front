import React, { useEffect, useState } from 'react';
import { mobxHelper, reactAlert } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router';
import { patronInfo } from '@nara.platform/dock';
import { find } from 'lodash';

import { Button, Icon } from 'semantic-ui-react';
// import { ActionLogService } from 'shared/stores';
import { ReviewService } from '@nara.drama/feedback';
import { CubeType } from 'shared/model';
import { NoSuchContentPanel } from 'shared';

import lectureRoutePaths from 'lecture/routePaths';
import { LRSLectureService } from 'lecture/stores';
import { LectureModel, LectureServiceType } from 'lecture/model';
import { Lecture } from 'lecture';
import {
  MyTrainingModel,
  InMyLectureCdoModel,
  InMyLectureModel,
} from 'myTraining/model';
import { InMyLectureService } from 'myTraining/stores';
import myTrainingRoutes from '../../../../myTraining/routePaths';
import { ContentWrapper } from '../MyLearningContentElementsView';
import LectureFilterRdoModel from '../../../../lecture/model/LectureFilterRdoModel';
import OffsetElementList from '../../../../shared/model/OffsetElementList';
import ReactGA from 'react-ga';

import { findAvailableCardBundles } from '../../../../lecture/shared/api/arrangeApi';
import { findCardList } from '../../../../lecture/detail/api/cardApi';
import { CardBundle } from '../../../../lecture/shared/model/CardBundle';
import CardView from '../../../../lecture/shared/Lecture/ui/view/CardVIew';
import CardGroup, {
  GroupType,
} from '../../../../lecture/shared/Lecture/sub/CardGroup';

interface Props extends RouteComponentProps {
  // actionLogService?: ActionLogService,
  reviewService?: ReviewService;
  lrsLectureService?: LRSLectureService;
  inMyLectureService?: InMyLectureService;

  profileMemberName: string;
  profileMemberEmail: string;
}
/*
  ActionLogService 는 서버 부하가 심해 현재 동작하고 있지 않으며, ActionEventService 로 대체됨. 2020.10.12. by 김동구
*/
const LRSLearning: React.FC<Props> = function LRSLearning({
  reviewService,
  lrsLectureService,
  inMyLectureService,
  profileMemberName,
  profileMemberEmail,
  history,
}) {
  const CONTENT_TYPE_NAME = '추천과정';
  const PAGE_SIZE = 8;
  const { lrsLectures } = lrsLectureService!;
  const [title, setTitle] = useState<string | null>('');

  const [newCard, setNewCard] = useState<CardBundle>();

  const fetchNewCards = async () => {
    const response = await findAvailableCardBundles();
    // 신규이기 때문에 type이 New 인 부분을 가져옴
    const findResponse = find(response, { type: 'Recommended' });

    // cards 값에 api로 받아온 cardList 값을 넣어줌
    if (findResponse?.cardIds) {
      const joinedIds = findResponse.cardIds.join();

      const cardList = await findCardList(joinedIds);

      if (cardList !== undefined) {
        findResponse.cards = cardList;
      }
    }
    console.log(findResponse);
    setNewCard(findResponse);
  };

  useEffect(() => {
    fetchNewCards();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  lrsLectureService?.setProfileName(profileMemberName);

  // // lectureService 변경  실행
  // useEffect(() => {
  //   findMyContent();
  // }, []);

  const findMyContent = async () => {
    lrsLectureService!.clearLectures();

    // 세션 스토리지에 정보가 있는 경우 가져오기
    const savedRecommendLearningList =
      window.navigator.onLine &&
      window.sessionStorage.getItem('LrsLearningList');
    if (savedRecommendLearningList && savedRecommendLearningList.length > 0) {
      const recommendMain: OffsetElementList<LectureModel> = JSON.parse(
        savedRecommendLearningList
      );
      if (recommendMain.results.length > PAGE_SIZE - 1) {
        lrsLectureService!.setPagingLrsLectures(recommendMain);
        if (
          !recommendMain ||
          !recommendMain.title ||
          recommendMain.title.length < 1
        ) {
          setTitle(lrsLectureService!.Title);
        } else {
          setTitle(recommendMain.title);
        }
        return;
      }
    }

    lrsLectureService!
      .findPagingLrsLectures(
        LectureFilterRdoModel.lrsLectures(PAGE_SIZE, 0, profileMemberEmail),
        true
      )
      .then(response => {
        lrsLectureService!.setTitle(response.title);
        if (!response || !response.title || response.title.length < 1) {
          setTitle(lrsLectureService!.Title);
        } else {
          setTitle(response.title);
        }
      });
  };

  const getInMyLecture = (serviceId: string) => {
    //
    const { inMyLectureMap } = inMyLectureService!;
    return inMyLectureMap.get(serviceId);
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
    // actionLogService?.registerClickActionLog({ subAction: 'View all' });

    window.sessionStorage.setItem('from_main', 'TRUE');
    history.push(myTrainingRoutes.learningLrsLecture());

    // react-ga event
    ReactGA.event({
      category: '추천 과정',
      action: 'Click',
      label: '추천 과정 전체보기',
    });
  };

  const onViewDetail = (e: any, data: any) => {
    //
    const { model } = data;

    // react-ga event
    ReactGA.event({
      category: '메인_추천과정',
      action: 'Click Card',
      // label: `${model.serviceType === 'Course' ? '(Course)' : '(Cube)'} - ${
      //   model.name
      // }`,
      label: `${model.name}`,
    });

    const cineroom =
      patronInfo.getCineroomByPatronId(model.servicePatronKeyString) ||
      patronInfo.getCineroomByDomain(model)!;

    if (model.serviceType === LectureServiceType.Card) {
      history.push(lectureRoutePaths.courseOverview(model.serviceId));
    } else {
      history.push(
        lectureRoutePaths.lectureCardOverview(model.serviceId, model.cubeId)
      );
    }
  };

  const onActionLecture = (
    training: MyTrainingModel | LectureModel | InMyLectureModel
  ) => {
    //
    // actionLogService?.registerSeenActionLog({ lecture: training, subAction: '아이콘' });

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

  /* const onClickActionLog = (text: string) => {
    actionLogService?.registerClickActionLog({ subAction: text });
  }; */

  return (
    <ContentWrapper>
      <div className="section-head">
        {/*<strong>mySUNI가 <span className="ellipsis">{profileMemberName}</span>님을 위해 추천하는 과정입니다.</strong>*/}
        <strong>{newCard?.displayText}</strong>
        <strong>{title}</strong>
        {/*<strong>{lrsLectureService?.Title}</strong>*/}
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
    // 'shared.actionLogService',
    'shared.reviewService',
    'lrsLecture.lrsLectureService',
    'myTraining.inMyLectureService'
  )
)(withRouter(observer(LRSLearning)));
