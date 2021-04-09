import React, { useEffect, useState } from 'react';
import { mobxHelper, reactAlert } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router';
import { patronInfo } from '@nara.platform/dock';

import { Button, Icon } from 'semantic-ui-react';
// import { ActionLogService } from 'shared/stores';
import { ReviewService } from '@nara.drama/feedback';
import { CubeType } from 'shared/model';
import { NoSuchContentPanel } from 'shared';

import lectureRoutePaths from 'lecture/routePaths';
import myTrainingRoutes from 'myTraining/routePaths';
import { LectureModel, LectureServiceType } from 'lecture/model';
import { ENRLectureService } from 'lecture/stores';
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
import { ContentType } from 'myTraining/ui/page/NewLearningPage';
import CardView from '../../../../lecture/shared/Lecture/ui/view/CardVIew';
import CardGroup, {
  GroupType,
} from '../../../../lecture/shared/Lecture/sub/CardGroup';
import LectureParams, {
  toPath,
} from '../../../../lecture/detail/viewModel/LectureParams';
import { useRequestCollege } from '../../../../shared/service/useCollege/useRequestCollege';
import { CardWithCardRealtedCount } from '../../../../lecture/model/CardWithCardRealtedCount';
import { findEnrollingCardList } from '../../../../lecture/detail/api/cardApi';

/*
  ActionLogService 는 서버 부하가 심해 현재 동작하고 있지 않으며, ActionEventService 로 대체됨. 2020.10.12. by 김동구
*/
interface Props extends RouteComponentProps {
  // actionLogService?: ActionLogService,
  reviewService?: ReviewService;
  enrLectureService?: ENRLectureService;
  inMyLectureService?: InMyLectureService;
}

const ENRLearning: React.FC<Props> = Props => {
  //
  const {
    enrLectureService,
    inMyLectureService,
    history,
  } = Props;

  const CONTENT_TYPE_NAME = '수강신청 기간';
  const PAGE_SIZE = 8;

  // const { enrLectures } = enrLectureService!;

  useRequestCollege();
  const [cardList, setCardList] = useState<CardWithCardRealtedCount[]>([]);

  // // lectureService 변경  실행
  useEffect(() => {
    findMyContent();
  }, []);

  const findMyContent = async () => {
    const cards = await findEnrollingCardList(
      LectureFilterRdoModel.enrLectures(PAGE_SIZE, 0, false)
    );

    if (cards !== undefined) {
      setCardList(cards.results);
    }
  };

  const getInMyLecture = (serviceId: string) => {
    //
    const { inMyLectureMap } = inMyLectureService!;
    return inMyLectureMap.get(serviceId);
  };

  const onViewAll = () => {
    //
    // actionLogService?.registerClickActionLog({ subAction: 'View all' });

    window.sessionStorage.setItem('from_main', 'TRUE');
    history.push(myTrainingRoutes.learningEnrLecture());

    // react-ga event
    ReactGA.event({
      category: '수강 신청 과정 모아보기',
      action: 'Click',
      label: '수강 신청 과정 전체보기'
    });
  };

  return (
    <ContentWrapper>
      <div className="section-head">
        {cardList.length > 0 && <strong>수강 신청 과정 모아보기</strong>}
        <div className="right">
          {cardList.length > 0 && (
            <Button icon className="right btn-blue" onClick={onViewAll}>
              View all <Icon className="morelink" />
            </Button>
          )}
        </div>
      </div>

      {cardList.length > 0 ? (
        <Lecture.Group type={Lecture.GroupType.Line}>
          {cardList.map(
            (item,i) => {
              const { card, cardRelatedCount } = item;
              const inMyLecture = getInMyLecture(card.id);

              return (
                <li key={i}>
                  <CardGroup type={GroupType.Box}>
                    <CardView
                      key={card.id}
                      cardId={card.id}
                      {...card}
                      {...cardRelatedCount}
                      // 리본에 정원마감 또는 D-DAY, D-14 형식으로 표현 돼야 함
                      // 정원 마감 : capacity <= student_count
                      // D-DAY OR D-14 ... : 수강신청 마감일 - TODAY
                      // contentType="Enrolling"
                    />
                  </CardGroup>
                </li>
            );
            }
          )}
        </Lecture.Group>
      ) : (
        <NoSuchContentPanel
          message={
            <div className="text">
              {CONTENT_TYPE_NAME}이 임박한 학습 과정이 없습니다.
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
    'enrLecture.enrLectureService',
    'myTraining.inMyLectureService'
  )
)(withRouter(observer(ENRLearning)));