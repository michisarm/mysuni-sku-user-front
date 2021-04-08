import React, { useCallback, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
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
import { AplState } from 'myTraining/model/AplState';
import { AplStateName } from 'myTraining/model/AplStateName';
import { MyLearningContentType, MyPageContentType } from '../../model';
import ReactGA from 'react-ga';
import { useScrollMove } from 'myTraining/useScrollMove';
import LectureParams, { toPath } from '../../../../lecture/detail/viewModel/LectureParams';
import { MyTrainingRouteParams } from '../../../model/MyTrainingRouteParams';
import { getCollgeName } from '../../../../shared/service/useCollege/useRequestCollege';
import { timeToHourMinutePaddingFormat } from '../../../../shared/helper/dateTimeHelper';
import { CubeTypeNameType } from '../../../../personalcube/personalcube/model';

interface Props {
  models: MyTableView[] | AplModel[];
  totalCount: number;
  myTrainingService?: MyTrainingService;
}

function MyLearningTableBody(props: Props) {
  const { models, totalCount, myTrainingService } = props;
  const { selectedServiceIds, selectOne, clearOne } = myTrainingService!;
  const { scrollOnceMove, scrollSave } = useScrollMove();

  const history = useHistory();
  const params = useParams<MyTrainingRouteParams>();
  const contentType = params.tab;

  useEffect(() => {
    setTimeout(() => {
      scrollOnceMove();
    }, 200)
  }, [scrollOnceMove])


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
      if (selectedServiceIds.includes(data.value)) {
        clearOne(data.value);
        return;
      }

      selectOne(data.value);
    },
    [selectedServiceIds, clearOne, selectOne]
  );

  const renderWithBaseContent = (model: MyTableView, index: number) => {
    const collegeName = getCollgeName(model.category.college.name);

    return (
      <>
        <Table.Cell>
          {totalCount - index}
        </Table.Cell>
        <Table.Cell>
          {model.category.college.id}
        </Table.Cell>
        <Table.Cell className="title">
          <a href="#" onClick={(e) => onClickLearn(model, e)}>
            <span className="ellipsis">
              {model.name}
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
    const formattedLearningTime = timeToHourMinutePaddingFormat(model.learningTime);
    
    switch (contentType) {
      case MyLearningContentType.InProgress:
        return (
          <>
            <Table.Cell>
              {model.serviceType}{' '}
              {/* 학습유형 */}
            </Table.Cell>
            <Table.Cell>
              {model.difficultyLevel || '-'} {/* Level */}
            </Table.Cell>
            <Table.Cell>
              {`${model.passedLearningCount}/${model.totalLearningCount}`} {/* 진행률 */}
            </Table.Cell>
            <Table.Cell>
              {formattedLearningTime}
              {/* 학습시간 */}
            </Table.Cell>
            <Table.Cell>
              {formatDate(model.time)}
              {/* 최근학습일 */}
            </Table.Cell>
          </>
        );

      case MyLearningContentType.InMyList:
        return (
          <>
            <Table.Cell>
              {model.serviceType === 'Card' && model.serviceType || CubeTypeNameType[model.cubeType]}{' '}
              {/* 학습유형 */}
            </Table.Cell>
            <Table.Cell>
              {model.difficultyLevel || '-'} {/* Level */}
            </Table.Cell>
            <Table.Cell>
              {formattedLearningTime}
              {/* 학습시간 */}
            </Table.Cell>
            <Table.Cell>
              {model.stampCount !== 0 && model.stampCount || '-'}
              {/* 스탬프 */}
            </Table.Cell>
            <Table.Cell>
              {formatDate(model.createDate)}
              {/* 등록일 */}
            </Table.Cell>
          </>
        );
      case MyLearningContentType.Required:
        return (
          <>
            <Table.Cell>
              {model.serviceType}{' '}
              {/* 학습유형 */}
            </Table.Cell>
            <Table.Cell>
              {model.difficultyLevel || '-'} {/* Level */}
            </Table.Cell>
            <Table.Cell>
              {formattedLearningTime}
              {/* 학습시간 */}
            </Table.Cell>
            <Table.Cell>
              {model.stampCount !== 0 && model.stampCount || '-'}
              {/* 스탬프 */}
            </Table.Cell>
            <Table.Cell>
              {formatDate(model.creationTime)}
            </Table.Cell>
          </>
        );
      case MyLearningContentType.Enrolled:
        return (
          <>
            <Table.Cell>
              {CubeTypeNameType[model.cubeType]}{' '}
              {/* 학습유형 */}
            </Table.Cell>
            <Table.Cell>
              {model.difficultyLevel || '-'} {/* Level */}
            </Table.Cell>
            <Table.Cell>
              {formattedLearningTime}
              {/* 학습시간 */}
            </Table.Cell>
            <Table.Cell>
              {model.stampCount !== 0 && model.stampCount || ''}
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
              {model.serviceType}{' '}
              {/* 학습유형 */}
            </Table.Cell>
            <Table.Cell>
              {model.difficultyLevel || '-'} {/* Level */}
            </Table.Cell>
            <Table.Cell>
              {formattedLearningTime}
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
              {model.serviceType === 'Card' && model.serviceType || CubeTypeNameType[model.cubeType]}{' '}
              {/* 학습유형 */}
            </Table.Cell>
            <Table.Cell>
              {model.difficultyLevel || '-'} {/* Level */}
            </Table.Cell>
            <Table.Cell>
              {formattedLearningTime}
              {/* 학습시간 */}
            </Table.Cell>
            <Table.Cell>
              {model.stampCount || '-'}
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
              {model.stampCount || '-'} {/* 스탬프 */}
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


  return (
    <Table.Body>
      {contentType !== MyLearningContentType.PersonalCompleted &&
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
    </Table.Body>
  );
}

export default inject(mobxHelper.injectFrom('myTraining.myTrainingService'))(
  observer(MyLearningTableBody)
);


const formatDate = (time: number) => {
  return time ? moment(Number(time)).format('YYYY.MM.DD') : '-';
};


const getApprovalTime = (model: AplModel): string => {
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
  switch (model.state) {
    case AplState.Opened:
      if (model.updateHour || model.updateMinute) {
        return `${model.updateHour}시 ${model.updateMinute}분`;
      }
      return model.allowHour || model.allowMinute
        ? `${model.allowHour}시 ${model.allowMinute}분`
        : '-';
    case AplState.Rejected:
      return model.allowHour || model.allowMinute
        ? `${model.allowHour}시 ${model.allowMinute}분`
        : '-';
    case AplState.OpenApproval:
      return model.requestHour || model.requestMinute
        ? `${model.requestHour}시 ${model.requestMinute}분`
        : '-';
  }

  return '-';
};

export type MyTableView =
  | MyTrainingTableViewModel
  | InMyLectureTableViewModel
  | LectureTableViewModel;
