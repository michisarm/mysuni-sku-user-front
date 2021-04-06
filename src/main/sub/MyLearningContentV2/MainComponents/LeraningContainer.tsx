import React, { useEffect, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { observer, inject } from 'mobx-react';
import { mobxHelper, reactAlert } from '@nara.platform/accent';
import { patronInfo } from '@nara.platform/dock';
import { ReviewService } from '@nara.drama/feedback';
import { find } from 'lodash';
import { Button, Icon, ButtonProps } from 'semantic-ui-react';
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
// import LectureFilterRdoModel from '../../../../lecture/model/LectureFilterRdoModel';
// import OffsetElementList from '../../../../shared/model/OffsetElementList';
import ReactGA from 'react-ga';
import { findAvailableCardBundles } from '../../../../lecture/shared/api/arrangeApi';
import { findCardList } from '../../../../lecture/detail/api/cardApi';
import { CardBundle } from '../../../../lecture/shared/model/CardBundle';
import CardView from '../../../../lecture/shared/Lecture/ui/view/CardVIew';
import CardGroup, {
  GroupType,
} from '../../../../lecture/shared/Lecture/sub/CardGroup';
import { useRequestCollege } from '../../../../shared/service/useCollege/useRequestCollege';
import { CardBundleType } from '../../../../lecture/shared/model/CardBundleType';
import LectureParams, {
  toPath,
} from '../../../../lecture/detail/viewModel/LectureParams';

interface Props extends RouteComponentProps {
  profileMemberName?: string;
  reviewService?: ReviewService;
  newLectureService?: NEWLectureService;
  inMyLectureService?: InMyLectureService;
  contentType: CardBundleType;
  contentTypeName: string;
}

const LearningContainer: React.FC<Props> = function LearningContainer({
  contentType,
  contentTypeName,
  history,
  inMyLectureService,
}) {
  // collegeName, channelName 을 불러오는 api를 호출하여 stroe에 저장한다.
  useRequestCollege();
  const [cardBundle, setCardBundle] = useState<CardBundle>();

  const fetchCards = async () => {
    const response = await findAvailableCardBundles();

    // contentType과 일치하는 cardList 를 가져옴
    const filteredCardBundle = find(response, { type: contentType });

    // cards 객체에 api로 받아온 cardList 값을 넣어줌
    if (filteredCardBundle?.cardIds) {
      const joinedIds = filteredCardBundle.cardIds.join();

      const cardList = await findCardList(joinedIds);

      if (cardList !== undefined) {
        filteredCardBundle.cards = cardList;
      }
    }

    setCardBundle(filteredCardBundle);
  };

  useEffect(() => {
    fetchCards();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getInMyLecture = (serviceId: string) => {
    //
    const { inMyLectureMap } = inMyLectureService!;
    return inMyLectureMap.get(serviceId);
  };

  const onViewAll = () => {
    //
    // actionLogService?.registerClickActionLog({ subAction: 'View all' });

    window.sessionStorage.setItem('from_main', 'TRUE');

    switch (contentType) {
      case 'Normal':
        history.push(myTrainingRoutes.learningNewLecture());
        break;
      case 'New':
        history.push(myTrainingRoutes.learningNewLecture());
        break;
      case 'Popular':
        history.push(myTrainingRoutes.learningPopLecture());
        break;
      case 'Recommended':
        history.push(myTrainingRoutes.learningRqdLecture());
        break;
    }

    // react-ga event
    ReactGA.event({
      category: contentTypeName,
      action: 'Click',
      label: `${contentTypeName} 전체보기`,
    });
  };

  const onViewDetail = (_: React.MouseEvent, data: ButtonProps) => {
    const { id } = data;

    // react-ga event
    ReactGA.event({
      category: '메인_신규',
      action: 'Click Card',
      // label: `${model.serviceType === 'Course' ? '(Course)' : '(Cube)'} - ${
      //   model.name
      // }`,
    });

    const params: LectureParams = {
      cardId: id,
      viewType: 'view',
    };

    history.push(toPath(params));
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

  const renderNoSuchContentMessage = () => {
    if (contentType === 'New' || 'Recommended') {
      return (
        <div className="text">
          {contentTypeName}에 해당하는 학습 과정이 없습니다.
        </div>
      );
    }
  };

  return (
    <ContentWrapper>
      <div className="section-head">
        <strong>{cardBundle?.displayText}</strong>
        <div className="right">
          {cardBundle?.cards && cardBundle.cards.length > 0 && (
            <Button icon className="right btn-blue" onClick={onViewAll}>
              View all <Icon className="morelink" />
            </Button>
          )}
        </div>
      </div>
      {cardBundle?.cards && cardBundle.cards.length > 0 ? (
        <Lecture.Group type={Lecture.GroupType.Line}>
          {cardBundle.cards.map((item, i) => {
            const { card, cardRelatedCount } = item;
            const inMyLecture = getInMyLecture(card.id);

            return (
              <li key={i}>
                <CardGroup type={GroupType.Box}>
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
                    iconName={inMyLecture ? 'remove2' : 'add-list'}
                    onAction={() => {
                      reactAlert({
                        title: '알림',
                        message: inMyLecture
                          ? '본 과정이 관심목록에서 제외되었습니다.'
                          : '본 과정이 관심목록에 추가되었습니다.',
                      });
                      onActionLecture(inMyLecture!);
                    }}
                    onViewDetail={onViewDetail}
                  />
                </CardGroup>
              </li>
            );
          })}
        </Lecture.Group>
      ) : (
        <NoSuchContentPanel
          message={
            <div className="text">
              {contentTypeName}에 해당하는 학습 과정이 없습니다.
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
    'newLecture.newLectureService',
    'myTraining.inMyLectureService'
  )
)(withRouter(observer(LearningContainer)));
