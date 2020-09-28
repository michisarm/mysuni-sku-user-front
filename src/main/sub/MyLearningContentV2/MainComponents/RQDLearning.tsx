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

  const CONTENT_TYPE_NAME = '권장과정';
  const PAGE_SIZE = 8;

  const { rqdLectures } = rqdLectureService!;

  const [title, setTitle] = useState<string | null>('');

  // // rqdLectureService 변경  실행
  useEffect(() => {
    findMyContent();
  }, []);

  const findMyContent = async () => {
    /*
      1. session storage 에 권장과정이 있는 경우. 2020.09.28 by 김동구
        1.1. && 8개 이상 
          세션 스토리지에서 데이터를 불러옴. 
        1.2. && 8개 미만 
          서버에서 다시 데이터를 불러옴. (8개가 쌓일 때까지)

      2. session storage 에 권장과정이 없는 경우.
        서버에서 데이터를 불러옴.
    */
    rqdLectureService!.clearLectures();
    // 세션 스토리지에 정보가 있는 경우 가져오기
    const sessionRequiredLectures = window.navigator.onLine && window.sessionStorage.getItem('RqdLearningList');
    if (sessionRequiredLectures && sessionRequiredLectures.length !== 0) {
      // session storage 의 json data 파싱.
      const offsetRequiredLectures: OffsetElementList<LectureModel> = JSON.parse(sessionRequiredLectures);
      rqdLectureService!.setTitle(offsetRequiredLectures.title);

      if (offsetRequiredLectures.results.length >= PAGE_SIZE) {
        // session storage 의 권장과정 을 store 에 추가.
        rqdLectureService!.setPagingRqdLectures(offsetRequiredLectures);
        if (!offsetRequiredLectures || !offsetRequiredLectures.title || offsetRequiredLectures.title.length < 1) {
          setTitle(rqdLectureService!.Title);
        } else {
          setTitle(offsetRequiredLectures.title);
        }
        return;
      }
    }
    /* 
      서버로부터 가져오기 (8개 미만인 경우)
      가져온 데이터는 session storage 에도 저장됨.
      session storage 에 저장된 데이터가 8개 미만인 경우, 다시 서버로부터 데이터를 가져옴.
    */
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
      ) :
        (
          <NoSuchContentPanel
            message="모든 과정을 이수하셨습니다."
            link={{
              text: '전체 권장과정 List를 확인하시겠습니까?',
              path: myTrainingRoutes.learningRequired()
            }}
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
