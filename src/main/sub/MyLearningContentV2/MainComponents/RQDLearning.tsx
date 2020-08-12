import React, { useEffect, useState } from 'react';
import { mobxHelper, reactAlert } from '@nara.platform/accent';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router';
import { patronInfo } from '@nara.platform/dock';
import { Button, Icon } from 'semantic-ui-react';
import { ActionLogService } from 'shared/stores';
import { ReviewService } from '@nara.drama/feedback';
import { CubeType } from 'shared/model';
import { NoSuchContentPanel } from 'shared';
import lectureRoutePaths from 'lecture/routePaths';
import myTrainingRoutes from 'myTraining/routePaths';
import { LectureModel, LectureServiceType, OrderByType } from 'lecture/model';
import { Lecture } from 'lecture';
import {
  InMyLectureCdoModel,
  InMyLectureModel,
  MyTrainingModel,
} from 'myTraining/model';
import { InMyLectureService } from 'myTraining/stores';
import { ContentWrapper } from '../MyLearningContentElementsView';
import OffsetElementList from '../../../../shared/model/OffsetElementList';
import RQDLectureService from '../../../../lecture/shared/present/logic/RQDLectureService';
import LectureFilterRdoModel from '../../../../lecture/model/LectureFilterRdoModel';

interface Props extends RouteComponentProps {
  actionLogService?: ActionLogService;
  reviewService?: ReviewService;
  rqdLectureService?: RQDLectureService;
  inMyLectureService?: InMyLectureService;
}

const RQDLearning: React.FC<Props> = Props => {
  //
  const {
    actionLogService,
    reviewService,
    rqdLectureService,
    inMyLectureService,
    history,
  } = Props;

  const CONTENT_TYPE = 'Required';
  const CONTENT_TYPE_NAME = '권장과정';
  const PAGE_SIZE = 8;

  const { rqdLectures } = rqdLectureService!;

  const [title, setTitle] = useState<string | null>('');

  // // rqdLectureService 변경  실행
  useEffect(() => {
    findMyContent();
  }, []);

  const findMyContent = async () => {
    rqdLectureService!.clearLectures();

    // 세션 스토리지에 정보가 있는 경우 가져오기
    const savedRequiredLearningList = window.navigator.onLine && window.sessionStorage.getItem('RqdLearningList');
    if (savedRequiredLearningList) {
      const requiredMain: OffsetElementList<LectureModel> = JSON.parse(savedRequiredLearningList);
      rqdLectureService!.setTitle(requiredMain.title);
      if (requiredMain.totalCount > PAGE_SIZE - 1) {
        rqdLectureService!.setPagingRqdLectures(requiredMain);
        if (!requiredMain || !requiredMain.title || requiredMain.title.length < 1) {
          setTitle(rqdLectureService!.Title);
        } else {
          setTitle(requiredMain.title);
        }
        return;
      }
    }

    // 서버로부터 가져오기
    rqdLectureService!.findPagingRqdLectures(LectureFilterRdoModel.newLectures(PAGE_SIZE, 0), true)
      .then(response => {
        rqdLectureService!.setTitle(response.title);
        if (!response || !response.title || response.title.length < 1) {
          setTitle(rqdLectureService!.Title);
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
    actionLogService?.registerClickActionLog({ subAction: 'View all' });

    window.sessionStorage.setItem('from_main', 'TRUE');
    history.push(myTrainingRoutes.learningRqdLecture());
  };

  const onViewDetail = (e: any, data: any) => {
    //
    const { model } = data;
    const cineroom =
      patronInfo.getCineroomByPatronId(model.servicePatronKeyString) ||
      patronInfo.getCineroomByDomain(model)!;

    if (
      model.serviceType === LectureServiceType.Program ||
      model.serviceType === LectureServiceType.Course
    ) {
      history.push(
        lectureRoutePaths.courseOverview(
          cineroom.id,
          model.category.college.id,
          model.coursePlanId,
          model.serviceType,
          model.serviceId
        )
      );
    } else if (model.serviceType === LectureServiceType.Card) {
      history.push(
        lectureRoutePaths.lectureCardOverview(
          cineroom.id,
          model.category.college.id,
          model.cubeId,
          model.serviceId
        )
      );
    }
  };

  const onActionLecture = (
    training: MyTrainingModel | LectureModel | InMyLectureModel
  ) => {
    //
    actionLogService?.registerSeenActionLog({
      lecture: training,
      subAction: '아이콘',
    });

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

  const onClickActionLog = (text: string) => {
    actionLogService?.registerClickActionLog({ subAction: text });
  };

  return (
    <ContentWrapper>
      <div className="section-head">
        <strong>{title}</strong>
        <div className="right">
          {rqdLectures.length > 0 && (
            <Button icon className="right btn-blue" onClick={onViewAll}>
              View all <Icon className="morelink" />
            </Button>
          )}
        </div>
      </div>

      {rqdLectures.length > 0 && rqdLectures[0] ? (
        <Lecture.Group type={Lecture.GroupType.Line}>
          {rqdLectures.map(
            (
              learning: LectureModel | MyTrainingModel | InMyLectureModel,
              index: number
            ) => {
              //
              const inMyLecture = getInMyLecture(learning.serviceId);
              console.log(learning);

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
          )}
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
    'shared.actionLogService',
    'shared.reviewService',
    'rqdLecture.rqdLectureService',
    'myTraining.inMyLectureService'
  )
)(withRouter(observer(RQDLearning)));
