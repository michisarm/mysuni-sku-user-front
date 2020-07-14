
import React, {useEffect, useState} from 'react';
import { mobxHelper, reactAlert } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router';
import { patronInfo } from '@nara.platform/dock';

import { Button, Icon } from 'semantic-ui-react';
import { ActionLogService } from 'shared/stores';
import { ReviewService } from '@nara.drama/feedback';
import { CubeType } from 'shared/model';
import { NoSuchContentPanel } from 'shared';

import lectureRoutePaths from 'lecture/routePaths';
import myTrainingRoutes from 'myTraining/routePaths';
import { LectureModel, LectureServiceType } from 'lecture/model';
import { NewLectureService } from 'lecture/stores';
import { Lecture } from 'lecture';
import { MyTrainingModel, InMyLectureCdoModel, InMyLectureModel } from 'myTraining/model';
import { InMyLectureService } from 'myTraining/stores';
import { ContentWrapper } from '../MyLearningContentElementsView';
import LectureFilterRdoModel from '../../../../lecture/model/LectureFilterRdoModel';
import OffsetElementList from '../../../../shared/model/OffsetElementList';


interface Props extends RouteComponentProps {
  actionLogService?: ActionLogService,
  reviewService?: ReviewService,
  newLectureService?: NewLectureService,
  inMyLectureService?: InMyLectureService,
}

const NewLearning : React.FC<Props> = (Props) => {
  //
  const { actionLogService, reviewService, newLectureService, inMyLectureService, history } = Props;

  const CONTENT_TYPE = 'New';
  const CONTENT_TYPE_NAME = '신규과정';
  const PAGE_SIZE = 8;

  const today = new Date();
  const month = useState(today.getMonth() + 1);
  const week = useState(Math.ceil((today.getDate() + 6 - today.getDay())/7));

  const { newLectures } = newLectureService!;

  // // lectureService 변경  실행
  useEffect(() => {
    findMyContent();
  }, []);

  const findMyContent = async () => {
    // use session storage : modified by JSM
    newLectureService!.clearLectures();

    // 세션 스토리지에 정보가 있는 경우 가져오기
    const savedNewLearningList = window.navigator.onLine && window.sessionStorage.getItem('NewLearningList');
    if (savedNewLearningList) {
      const newMain: OffsetElementList<LectureModel> = JSON.parse(savedNewLearningList);
      if (newMain.totalCount > PAGE_SIZE - 1) {
        newLectureService!.setPagingNewLectures(newMain);
        return;
      }
    }

    newLectureService!.findPagingNewLectures(LectureFilterRdoModel.newLectures(PAGE_SIZE, 0), true);
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

    if (learning instanceof InMyLectureModel && learning.cubeType !== CubeType.Community) {
      rating = ratingMap.get(learning.reviewId) || 0;
    }
    else if (learning instanceof LectureModel && learning.cubeType !== CubeType.Community) {
      rating = learning.rating;
    }
    return rating;
  };

  const onViewAll = () => {
    //
    console.log( CONTENT_TYPE_NAME );
    actionLogService?.registerClickActionLog({ subAction: 'View all' });

    window.sessionStorage.setItem('from_main', 'TRUE');
    history.push(myTrainingRoutes.learningNew());
  };

  const onViewDetail = (e: any, data: any) => {
    //
    const { model } = data;
    const cineroom = patronInfo.getCineroomByPatronId(model.servicePatronKeyString) || patronInfo.getCineroomByDomain(model)!;

    if (model.serviceType === LectureServiceType.Program || model.serviceType === LectureServiceType.Course) {
      history.push(lectureRoutePaths.courseOverview(cineroom.id, model.category.college.id, model.coursePlanId, model.serviceType, model.serviceId));
    }
    else if (model.serviceType === LectureServiceType.Card) {
      history.push(lectureRoutePaths.lectureCardOverview(cineroom.id, model.category.college.id, model.cubeId, model.serviceId));
    }
  };

  const onActionLecture = (training: MyTrainingModel | LectureModel | InMyLectureModel) => {
    //
    actionLogService?.registerSeenActionLog({ lecture: training, subAction: '아이콘' });

    if (training instanceof InMyLectureModel) {
      inMyLectureService!.removeInMyLecture(training.id).then(findMyContent);
    }
    else {
      let servicePatronKeyString = training.patronKey.keyString;

      if (training instanceof MyTrainingModel) {
        servicePatronKeyString = training.servicePatronKeyString;
      }
      inMyLectureService!.addInMyLecture(new InMyLectureCdoModel({
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
      })).then(findMyContent);
    }
  };

  const onClickActionLog = (text: string) => {
    actionLogService?.registerClickActionLog({ subAction: text });
  };

  return (
    <ContentWrapper>
      <div className="section-head">
        <strong>mySUNI {month}월 {week}주 신규 학습 과정</strong>
        <div className="right">
          {
            newLectures.length > 0 && (
              <Button icon className="right btn-blue" onClick={onViewAll}>
                View all <Icon className="morelink"/>
              </Button>
            )
          }
        </div>
      </div>

      {newLectures.length > 0 ?
        <Lecture.Group type={Lecture.GroupType.Line}>
          {newLectures.map((learning: LectureModel | MyTrainingModel | InMyLectureModel, index: number) => {
            //
            const inMyLecture = getInMyLecture(learning.serviceId);

            return (
              <Lecture
                key={`learning-${index}`}
                model={learning}
                rating={getRating(learning)}
                thumbnailImage={learning.baseUrl || undefined}
                action={inMyLecture ? Lecture.ActionType.Remove : Lecture.ActionType.Add}
                onAction={() => {
                  reactAlert({title: '알림', message: inMyLecture ? '본 과정이 관심목록에서 제외되었습니다.' : '본 과정이 관심목록에 추가되었습니다.'});
                  onActionLecture(inMyLecture || learning);
                }}
                onViewDetail={onViewDetail}
              />
            );
          })}
        </Lecture.Group>
        :
        <NoSuchContentPanel message={(
          <div className="text">{CONTENT_TYPE_NAME}에 해당하는 학습 과정이 없습니다.</div>
        )}
        />
      }
    </ContentWrapper>
  );
};

export default inject(mobxHelper.injectFrom(
  'shared.actionLogService',
  'shared.reviewService',
  'newLecture.newLectureService',
  'myTraining.inMyLectureService',
))(withRouter(observer(NewLearning)));