import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { mobxHelper } from '@nara.platform/accent';
import { patronInfo } from '@nara.platform/dock';
import { Checkbox, Table } from 'semantic-ui-react';
import moment from 'moment';
import lectureRoutePaths from 'lecture/routePaths';
import myTrainingRoutePaths from 'myTraining/routePaths';
import { MyTrainingService } from 'myTraining/stores';
import MyTrainingTableViewModel from 'myTraining/model/MyTrainingTableViewModel';
import InMyLectureTableViewModel from 'myTraining/model/InMyLectureTableViewModel';
import LectureTableViewModel from 'lecture/model/LectureTableViewModel';
import { AplModel } from 'myTraining/model';
import { MyContentType } from 'myTraining/ui/logic/MyLearningListContainerV2';
import MyApprovalContentType from 'myTraining/ui/model/MyApprovalContentType';
import { MyLearningContentType, MyPageContentType } from '../../model';


interface Props {
  contentType: MyContentType | MyApprovalContentType;
  totalCount: number;
  models: MyTableView[] | AplModel[];
  myTrainingService?: MyTrainingService;
}

/* by 김동구

  contentType 에 따라, 테이블 리스트 데이터가 변경됨.
*/
function MyLearningTableBody(props: Props) {
  const { contentType, models, totalCount, myTrainingService } = props;
  const { selectedServiceIds, selectOne, clearOne } = myTrainingService!;
  const history = useHistory();

  /* handlers */
  const onClickLearn = (model: MyTableView) => {
    // 학습하기 버튼 클릭 시, 해당 강좌 상세 페이지로 이동함.
    const { category: { college }, serviceId, coursePlanId, cubeId } = model;
    let { serviceType } = model;

    switch(serviceType) {
      case 'COURSE':
        serviceType = 'Course';
      case 'PROGRAM':
        serviceType = 'Program';
    }

    const { id: collegeId } = college;
    const cineroomId = patronInfo.getCineroomId() || '';

    switch (serviceType) {
      case 'COURSE':
        serviceType = 'Course';
      case 'PROGRAM':
        serviceType = 'Program';
    }

    // Card
    if (model.isCardType()) {
      history.push(lectureRoutePaths.lectureCardOverview(cineroomId, collegeId, cubeId, serviceId));
    }
    // Program 또는 Course
    else {
      history.push(lectureRoutePaths.courseOverview(cineroomId, collegeId, coursePlanId, serviceType, serviceId));
    }
  };

  const routeToDetail = (model: AplModel) => {
    const { id } = model;
    history.push(myTrainingRoutePaths.approvalPersonalLearningDetail(id));
  }

  const onCheckOne = useCallback((e: any, data: any) => {
    // 이미 선택되어 있는 경우, 해제함.
    if (selectedServiceIds.includes(data.value)) {
      clearOne(data.value);
      return;
    }

    selectOne(data.value);
  }, [selectedServiceIds, clearOne, selectOne]);


  /* render functions */
  const renderWithBaseContent = (model: MyTableView, index: number) => {
    /*
      ContentType 에 상관없이 공통으로 보여지는 컬럼들.
        1. No
        2. College
        3. 과정명
        4. 학습유형
        5. Level
    */
    return (
      <>
        <Table.Cell>
          {totalCount - index} {/* No */}
        </Table.Cell>
        <Table.Cell>
          {model.displayCollegeName} {/* College */}
        </Table.Cell>
        <Table.Cell className="title">
          <a href="#" onClick={() => onClickLearn(model)}><span className="ellipsis">{model.name} {/* 과정명 */}</span></a>
        </Table.Cell>
      </>
    );
  };


  const renderByContentType = (model: MyTableView, contentType: MyContentType) => {
    /*
      ContentType 에 따라 달라지는 컬럼들.
    */
    switch (contentType) {
      case MyLearningContentType.InProgress:
        return (
          <>
            <Table.Cell>
              {model.isCardType() ? model.displayCubeType : 'Course'} {/* 학습유형 */}
            </Table.Cell>
            <Table.Cell>
              {model.displayDifficultyLevel} {/* Level */}
            </Table.Cell>
            <Table.Cell>
              {model.displayProgressRate}  {/* 진행률 */}
            </Table.Cell>
            <Table.Cell>
              {model.formattedLearningTime}{/* 학습시간 */}
            </Table.Cell>
            <Table.Cell>
              {formatDate(model.startDate)}{/* 학습시작일 */}
            </Table.Cell>
          </>
        );

      case MyLearningContentType.InMyList:
      case MyLearningContentType.Required:
        return (
          <>
            <Table.Cell>
              {model.isCardType() ? model.displayCubeType : 'Course'} {/* 학습유형 */}
            </Table.Cell>
            <Table.Cell>
              {model.displayDifficultyLevel} {/* Level */}
            </Table.Cell>
            <Table.Cell>
              {model.formattedLearningTime}{/* 학습시간 */}
            </Table.Cell>
            <Table.Cell>
              {model.displayStampCount}{/* 스탬프 */}
            </Table.Cell>
            <Table.Cell>
              {contentType === MyLearningContentType.InMyList ? formatDate(model.createDate) : formatDate(model.creationTime)}{/* 등록일 */}
            </Table.Cell>
          </>
        );
      case MyLearningContentType.Enrolled:
        return (
          <>
            <Table.Cell>
              {model.isCardType() ? model.displayCubeType : 'Course'} {/* 학습유형 */}
            </Table.Cell>
            <Table.Cell>
              {model.difficultyLevel || '-'} {/* Level */}
            </Table.Cell>
            <Table.Cell>
              {model.formattedLearningTime}{/* 학습시간 */}
            </Table.Cell>
            <Table.Cell>
              {model.stampCountForDisplay}{/* 스탬프 */}
            </Table.Cell>
            <Table.Cell>
              {formatDate(model.startDate)}{/* 학습시작일 */}
            </Table.Cell>
          </>
        );
      case MyLearningContentType.Completed:
        return (
          <>
            <Table.Cell>
              {model.isCardType() ? model.displayCubeType : 'Course'} {/* 학습유형 */}
            </Table.Cell>
            <Table.Cell>
              {model.difficultyLevel || '-'} {/* Level */}
            </Table.Cell>
            <Table.Cell>
              {model.formattedLearningTime}{/* 학습시간 */}
            </Table.Cell>
            <Table.Cell>
              {formatDate(model.endDate)}{/* 학습완료일 */}
            </Table.Cell>
          </>
        );
      case MyLearningContentType.Retry:
        return (
          <>
            <Table.Cell>
              {model.isCardType() ? model.displayCubeType : 'Course'} {/* 학습유형 */}
            </Table.Cell>
            <Table.Cell>
              {model.difficultyLevel || '-'} {/* Level */}
            </Table.Cell>
            <Table.Cell>
              {model.formattedLearningTime}{/* 학습시간 */}
            </Table.Cell>
            <Table.Cell>
              {model.displayStampCount}{/* 스탬프 */}
            </Table.Cell>
            <Table.Cell>
              {formatDate(model.endDate)}{/* 취소/미이수일 */}
            </Table.Cell>
          </>
        );
      case MyPageContentType.EarnedStampList:
        return (
          <>
            <Table.Cell>
              {model.displayStampCount} {/* 스탬프 */}
            </Table.Cell>
            <Table.Cell>
              {formatDate(model.endDate)} {/* 획득일자 */}
            </Table.Cell>
          </>
        );
      default:
        return null;
    }
  };

  /* MyLearningPage :: 개인학습 완료 */
  const renderPersonalCompleted = (model: AplModel, index: number) => {
    return (
      <>
        <Table.Cell>
          {totalCount - index} {/* No */}
        </Table.Cell>
        <Table.Cell className="title">
          <a href="#" onClick={() => routeToDetail(model)}><span className="ellipsis">{model.title}</span></a> {/* title */}
        </Table.Cell>
        <Table.Cell>
          <span className="ellipsis">{model.channelName}</span> {/* Channel */}
        </Table.Cell>
        <Table.Cell>
          {`${model.allowHour}h ${model.allowMinute}m`} {/* 교육시간 */}
        </Table.Cell>
        <Table.Cell>
          {model.approvalName} {/* 승인자 */}
        </Table.Cell>
        <Table.Cell>
          {model.approvalId} {/* 승인자 이메일 */}
        </Table.Cell>
        <Table.Cell>
          {model.displayAllowTime} {/* 승인일자 */}
        </Table.Cell>
      </>
    );
  };

  /* MyApprovalPage :: 개인학습 */
  const renderPersonalLearning = (model: AplModel, index: number) => {
    return (
      <>
        <Table.Cell>
          {totalCount - index} {/* No */}
        </Table.Cell>
        <Table.Cell className="title">
          <a href="#" onClick={() => routeToDetail(model)}><span className="ellipsis">{model.title}</span></a> {/* title */}
        </Table.Cell>
        <Table.Cell>
          {model.channelName} {/* Channel */}
        </Table.Cell>
        <Table.Cell>
          {`${model.allowHour}시 ${model.allowMinute}분`} {/* 교육시간 */}
        </Table.Cell>
        <Table.Cell>
          {model.displayCreationTime} {/* 등록일자 */}
        </Table.Cell>
        <Table.Cell>
          <span className="ellipsis">{model.creatorName}</span> {/* 생성자 */}
        </Table.Cell>
        <Table.Cell>
          <span className="ellipsis">{model.creatorId}</span> {/* 생성자 E-mail */}
        </Table.Cell>
        <Table.Cell>
          {model.displayStateName} {/* 상태 */}
        </Table.Cell>
        <Table.Cell>
          {model.displayAllowTime} {/* 승인일자 */}
        </Table.Cell>
      </>
    );
  }

  return (
    <Table.Body>
      {(contentType === MyLearningContentType.PersonalCompleted || contentType === MyApprovalContentType.PersonalLearning) ||
        models &&
        models.length &&
        (models as MyTableView[]).map((model: MyTableView, index: number) => (
          <Table.Row key={`learning-body-${model.id}`}>
            {contentType === MyLearningContentType.InProgress && (
              <Table.Cell>
                <Checkbox
                  value={model.serviceId}
                  checked={selectedServiceIds.includes(model.serviceId)}
                  onChange={onCheckOne}
                />
              </Table.Cell>
            )
            }
            {renderWithBaseContent(model, index)}
            {renderByContentType(model, contentType)}
            <Table.Cell>
              <a className="btn-blue" href="#" onClick={() => onClickLearn(model)}>학습하기</a>
            </Table.Cell>
          </Table.Row>
        ))
      }
      {
        contentType === MyLearningContentType.PersonalCompleted &&
        models &&
        models.length &&
        (models as AplModel[]).map((model: AplModel, index: number) => (
          <Table.Row key={`learning-body-${model.id}`}>
            {renderPersonalCompleted(model, index)}
          </Table.Row>
        ))
      }
      {
        contentType === MyApprovalContentType.PersonalLearning &&
        models &&
        models.length &&
        (models as AplModel[]).map((model: AplModel, index: number) => (
          <Table.Row key={`learning-body-${model.id}`}>
            {renderPersonalLearning(model, index)}
          </Table.Row>
        ))
      }
    </Table.Body>
  );

}

export default inject(mobxHelper.injectFrom(
  'myTraining.myTrainingService'
))(observer(MyLearningTableBody));

/* globals */
const formatDate = (time: number) => {
  return moment(Number(time)).format('YYYY.MM.DD');
};

export type MyTableView = MyTrainingTableViewModel | InMyLectureTableViewModel | LectureTableViewModel;
