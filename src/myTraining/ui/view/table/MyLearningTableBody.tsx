import React, { useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { mobxHelper } from '@nara.platform/accent';
import { Checkbox, Table } from 'semantic-ui-react';
import moment from 'moment';
import myTrainingRoutePaths from 'myTraining/routePaths';
import { MyTrainingService } from 'myTraining/stores';
import MyTrainingTableViewModel from 'myTraining/model/MyTrainingTableViewModel';
import InMyLectureTableViewModel from 'myTraining/model/InMyLectureTableViewModel';
import LectureTableViewModel from 'lecture/model/LectureTableViewModel';
import { AplModel } from 'myTraining/model';
import { MyContentType } from 'myTraining/ui/logic/MyLearningListContainerV2';
import MyApprovalContentType from 'myTraining/ui/model/MyApprovalContentType';
import { AplState } from 'myTraining/model/AplState';
import { AplStateName } from 'myTraining/model/AplStateName';
import { LectureServiceType } from 'lecture/model';
import { MyLearningContentType, MyPageContentType } from '../../model';
import ReactGA from 'react-ga';
import { useScrollMove } from 'myTraining/useScrollMove';
import LectureParams, { toPath } from '../../../../lecture/detail/viewModel/LectureParams';

interface Props {
  contentType: MyContentType | MyApprovalContentType;
  totalCount: number;
  models: MyTableView[] | AplModel[];
  myTrainingService?: MyTrainingService;
}

/* 
  contentType 에 따라, 테이블 리스트 데이터가 변경됨.
*/
function MyLearningTableBody(props: Props) {
  const { contentType, models, totalCount, myTrainingService } = props;
  const { selectedServiceIds, selectOne, clearOne } = myTrainingService!;
  const history = useHistory();
  const { scrollOnceMove, scrollSave } = useScrollMove();
 

  useEffect(() => {
    setTimeout(() => {
      scrollOnceMove();
    }, 200)
  }, [scrollOnceMove])

  const getApprovalTime = (model: AplModel): string => {
    /* 승인 상태에 따라 승인시간을 다르게 보여줌. */
    if (model.state === AplState.Opened) {
      if (model.updateTime) {
        return moment(model.updateTime).format('YYYY.MM.DD');
      } else {
        return model.allowTime
          ? moment(model.allowTime).format('YYYY.MM.DD')
          : '-';
      }
    }

    if (model.state === AplState.Rejected) {
      return model.allowTime
        ? moment(model.allowTime).format('YYYY.MM.DD')
        : '-';
    }

    return '-';
  };

  const getAllowTime = (model: AplModel): string => {
    /* 승인상태에 따라 학습시간을 다르게 보여줌. */
    switch (model.state) {
      /* 승인 */
      case AplState.Opened:
        if (model.updateHour || model.updateMinute) {
          return `${model.updateHour}시 ${model.updateMinute}분`;
        }
        return model.allowHour || model.allowMinute
          ? `${model.allowHour}시 ${model.allowMinute}분`
          : '-';
      /* 반려 */
      case AplState.Rejected:
        return model.allowHour || model.allowMinute
          ? `${model.allowHour}시 ${model.allowMinute}분`
          : '-';
      /* 승인대기 */
      case AplState.OpenApproval:
        return model.requestHour || model.requestMinute
          ? `${model.requestHour}시 ${model.requestMinute}분`
          : '-';
    }

    return '-';
  };

  const routeToDetail = (id: string, page: string) => {
    history.push(myTrainingRoutePaths.approvalPersonalLearningDetail(page, id));
  };

  /* handlers */
  const onClickLearn = (model: MyTableView, e: any) => {
    // Pathname history가 2번 쌓이는 현상 발생하여 조치
    e.preventDefault();

   const { serviceId } = model;

    const params: LectureParams = {
      cardId: serviceId,
      viewType: 'view',
    };

    history.push(toPath(params));

    // react-ga event
    ReactGA.event({
      category: '학습중인 과정',
      action: 'Click',
      label: `${model.serviceType === 'COURSE' ? '(Course)' : '(Cube)'} - ${model.name
        }`,
    });

    scrollSave();
  };

  const onCheckOne = useCallback(
    (e: any, data: any) => {
      // 이미 선택되어 있는 경우, 해제함.
      if (selectedServiceIds.includes(data.value)) {
        clearOne(data.value);
        return;
      }

      selectOne(data.value);
    },
    [selectedServiceIds, clearOne, selectOne]
  );

  /* render functions */
  const renderWithBaseContent = (model: MyTableView, index: number) => {
    
    return (
      <>
        <Table.Cell>
          {totalCount - index} {/* No */}
        </Table.Cell>
        <Table.Cell>
          {model.displayCollegeName} {/* College */}
        </Table.Cell>
        <Table.Cell className="title">
          <a href="#" onClick={(e) => onClickLearn(model, e)}>
            <span className="ellipsis">
              {model.name} {/* 과정명 */}
            </span>
          </a>
        </Table.Cell>
      </>
    );
  };

  const renderByContentType = (
    model: MyTableView,
    contentType: MyContentType
  ) => {
    /*
      ContentType 에 따라 달라지는 컬럼들.
    */
    switch (contentType) {
      case MyLearningContentType.InProgress:
        return (
          <>
            <Table.Cell>
              {model.isCardType() ? model.displayCubeType : 'Course'}{' '}
              {/* 학습유형 */}
            </Table.Cell>
            <Table.Cell>
              {model.displayDifficultyLevel} {/* Level */}
            </Table.Cell>
            <Table.Cell>
              {model.displayProgressRate} {/* 진행률 */}
            </Table.Cell>
            <Table.Cell>
              {model.displayLearningTime}
              {/* 학습시간 */}
            </Table.Cell>
            <Table.Cell>
              {formatDate(model.time)}
              {/* 최근학습일 */}
            </Table.Cell>
          </>
        );

      case MyLearningContentType.InMyList:
      case MyLearningContentType.Required:
        return (
          <>
            <Table.Cell>
              {model.isCardType() ? model.displayCubeType : 'Course'}{' '}
              {/* 학습유형 */}
            </Table.Cell>
            <Table.Cell>
              {model.displayDifficultyLevel} {/* Level */}
            </Table.Cell>
            <Table.Cell>
              {model.displayLearningTime}
              {/* 학습시간 */}
            </Table.Cell>
            <Table.Cell>
              {model.displayStampCount}
              {/* 스탬프 */}
            </Table.Cell>
            <Table.Cell>
              {contentType === MyLearningContentType.InMyList
                ? formatDate(model.createDate)
                : formatDate(model.creationTime)}
              {/* 등록일 */}
            </Table.Cell>
          </>
        );
      case MyLearningContentType.Enrolled:
        return (
          <>
            <Table.Cell>
              {model.isCardType() ? model.displayCubeType : 'Course'}{' '}
              {/* 학습유형 */}
            </Table.Cell>
            <Table.Cell>
              {model.difficultyLevel || '-'} {/* Level */}
            </Table.Cell>
            <Table.Cell>
              {model.displayLearningTime}
              {/* 학습시간 */}
            </Table.Cell>
            <Table.Cell>
              {model.displayStampCount}
              {/* 스탬프 */}
            </Table.Cell>
            <Table.Cell>
              {formatDate(model.startDate)}
              {/* 학습시작일 */}
            </Table.Cell>
          </>
        );
      case MyLearningContentType.Completed:
        return (
          <>
            <Table.Cell>
              {model.isCardType() ? model.displayCubeType : 'Course'}{' '}
              {/* 학습유형 */}
            </Table.Cell>
            <Table.Cell>
              {model.difficultyLevel || '-'} {/* Level */}
            </Table.Cell>
            <Table.Cell>
              {model.displayLearningTime}
              {/* 학습시간 */}
            </Table.Cell>
            <Table.Cell>
              {formatDate(model.endDate)}
              {/* 학습완료일 */}
            </Table.Cell>
          </>
        );
      case MyLearningContentType.Retry:
        return (
          <>
            <Table.Cell>
              {model.isCardType() ? model.displayCubeType : 'Course'}{' '}
              {/* 학습유형 */}
            </Table.Cell>
            <Table.Cell>
              {model.difficultyLevel || '-'} {/* Level */}
            </Table.Cell>
            <Table.Cell>
              {model.formattedLearningTime}
              {/* 학습시간 */}
            </Table.Cell>
            <Table.Cell>
              {model.displayStampCount}
              {/* 스탬프 */}
            </Table.Cell>
            <Table.Cell>
              {formatDate(model.time)}
              {/* 취소/미이수일 */}
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
          <a href="#" onClick={() => routeToDetail(model.id, 'learning')}>
            <span className="ellipsis">{model.title}</span>
          </a>{' '}
          {/* title */}
        </Table.Cell>
        <Table.Cell>
          <span className="ellipsis">{model.channelName}</span> {/* Channel */}
        </Table.Cell>
        <Table.Cell>
          {getAllowTime(model)} {/* 교육시간 */}
        </Table.Cell>
        <Table.Cell>
          {model.approvalName} {/* 승인자 */}
        </Table.Cell>
        <Table.Cell>
          {model.approvalEmail} {/* 승인자 이메일 */}
        </Table.Cell>
        <Table.Cell>
          {AplStateName[model.state]} {/* 승인상태 */}
        </Table.Cell>
        <Table.Cell>
          {getApprovalTime(model)} {/* 승인일자 */}
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
          <a href="#" onClick={() => routeToDetail(model.id, 'approval')}>
            <span className="ellipsis">{model.title}</span>
          </a>{' '}
          {/* title */}
        </Table.Cell>
        <Table.Cell>
          {model.channelName} {/* Channel */}
        </Table.Cell>
        <Table.Cell>
          {getAllowTime(model)} {/* 교육시간 */}
        </Table.Cell>
        <Table.Cell>
          {model.displayCreationTime} {/* 등록일자 */}
        </Table.Cell>
        <Table.Cell>
          <span className="ellipsis">{model.creatorName}</span> {/* 생성자 */}
        </Table.Cell>
        <Table.Cell>
          <span className="ellipsis">{model.creatorId}</span>{' '}
          {/* 생성자 E-mail */}
        </Table.Cell>
        <Table.Cell>
          {model.displayStateName} {/* 상태 */}
        </Table.Cell>
        <Table.Cell>
          {getApprovalTime(model)} {/* 승인일자 */}
        </Table.Cell>
      </>
    );
  };

  return (
    <Table.Body>
      {contentType === MyLearningContentType.PersonalCompleted ||
        contentType === MyApprovalContentType.PersonalLearning ||
        (models &&
          models.length &&
          (models as MyTableView[]).map((model: MyTableView, index: number) => (
            <Table.Row key={`learning-body-${model.id}-${index}`}>
              {contentType === MyLearningContentType.InProgress && (
                <Table.Cell>
                  <Checkbox
                    value={model.serviceId}
                    checked={selectedServiceIds.includes(model.serviceId)}
                    onChange={onCheckOne}
                  />
                </Table.Cell>
              )}
              {renderWithBaseContent(model, index)}
              {renderByContentType(model, contentType)}
              <Table.Cell>
                <a
                  className="btn-blue"
                  href="#"
                  onClick={(e) => onClickLearn(model, e)}
                >
                  학습하기
                </a>
              </Table.Cell>
            </Table.Row>
          )))}
      {contentType === MyLearningContentType.PersonalCompleted &&
        models &&
        models.length &&
        (models as AplModel[]).map((model: AplModel, index: number) => (
          <Table.Row key={`learning-body-${model.id}`}>
            {renderPersonalCompleted(model, index)}
          </Table.Row>
        ))}
      {contentType === MyApprovalContentType.PersonalLearning &&
        models &&
        models.length &&
        (models as AplModel[]).map((model: AplModel, index: number) => (
          <Table.Row key={`learning-body-${model.id}`}>
            {renderPersonalLearning(model, index)}
          </Table.Row>
        ))}
    </Table.Body>
  );
}

export default inject(mobxHelper.injectFrom('myTraining.myTrainingService'))(
  observer(MyLearningTableBody)
);

/* globals */
const formatDate = (time: number) => {
  return time ? moment(Number(time)).format('YYYY.MM.DD') : '-';
};

const convertServiceType = (serviceType: string): LectureServiceType => {
  switch (serviceType.toUpperCase()) {
    case 'COURSE':
      return LectureServiceType.Course;
    case 'PROGRAM':
      return LectureServiceType.Program;
    default:
      return LectureServiceType.Card;
  }
};

export type MyTableView =
  | MyTrainingTableViewModel
  | InMyLectureTableViewModel
  | LectureTableViewModel;
