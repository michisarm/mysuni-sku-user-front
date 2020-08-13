
import React, { useEffect } from 'react';
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
import { Lecture } from 'lecture';
import { MyTrainingModel, InMyLectureCdoModel, InMyLectureModel } from 'myTraining/model';
import { MyTrainingService, InMyLectureService } from 'myTraining/stores';
import { ContentWrapper } from '../MyLearningContentElementsView';
import OffsetElementList from '../../../../shared/model/OffsetElementList';


interface Props extends RouteComponentProps {
  actionLogService?: ActionLogService,
  reviewService?: ReviewService,
  myTrainingService?: MyTrainingService,
  inMyLectureService?: InMyLectureService,

  profileMemberName: string,
}

const InProgressLearning : React.FC<Props> = (Props) => {
  //
  const { actionLogService, reviewService, myTrainingService, inMyLectureService, profileMemberName, history } = Props;

  const CONTENT_TYPE = 'InProgress';
  const ONTENT_TYPE_NAME = '학습중';
  const PAGE_SIZE = 8;

  const { myTrainings } = myTrainingService!;

  // myTrainingService 변경  실행
  useEffect(() => {
    findMyContent();
  }, []);

  const findMyContent = async () => {
    myTrainingService!.clear();

    // 세션 스토리지에 정보가 있는 경우 가져오기
    const savedInProgressLearningList = window.navigator.onLine && window.sessionStorage.getItem('InProgressLearningList');
    if (savedInProgressLearningList) {
      const inProgressMain: OffsetElementList<MyTrainingModel> = JSON.parse(savedInProgressLearningList);
      if (inProgressMain.totalCount > PAGE_SIZE - 1) {
        myTrainingService!.setMyTrainingsWithState(inProgressMain);
        return;
      }
    }

    // 서버로부터 가져오기
    myTrainingService!.findAllMyTrainingsWithState(CONTENT_TYPE, PAGE_SIZE,0,[],true);
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
    actionLogService?.registerClickActionLog({ subAction: 'View all' });

    history.push(myTrainingRoutes.learningTab(CONTENT_TYPE));
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
        <strong><span className="ellipsis">{profileMemberName}</span>님이 학습중인 과정입니다.</strong>
        <div className="right">
          {
            myTrainings.length > 0 && (
              <Button icon className="right btn-blue" onClick={onViewAll}>
                View all <Icon className="morelink"/>
              </Button>
            )
          }
        </div>
      </div>

      {myTrainings.length > 0 ?
        <Lecture.Group type={Lecture.GroupType.Line}>
          {myTrainings.map((learning: LectureModel | MyTrainingModel | InMyLectureModel, index: number) => {
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
          <>
            <div className="text">진행중인 학습 과정이 없습니다.</div>
            <Button
              icon
              as="a"
              className="right btn-blue2"
              onClick={ () => {
                onClickActionLog(`${profileMemberName}님에게 추천하는 학습 과정 보기`);
                history.push('/lecture/recommend');
              }}
            >
              <span className="border">
                <span className="ellipsis">{profileMemberName}</span> 님에게 추천하는 학습 과정 보기
              </span>
              <Icon className="morelink"/>
            </Button>
          </>
        )}
        />
      }
    </ContentWrapper>
  );
};

export default inject(mobxHelper.injectFrom(
  'shared.actionLogService',
  'shared.reviewService',
  'myTraining.myTrainingService',
  'myTraining.inMyLectureService',
))(withRouter(observer(InProgressLearning)));
