import React, { useCallback } from 'react';
import { Table } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import myTrainingPaths from '../../routePaths';
import { AplModel } from '../../model';
import { AplState } from '../../model/AplState';
import { parsePolyglotString } from 'shared/viewmodel/PolyglotString';

interface PersonalLearningListViewProps {
  apls: AplModel[];
  totalCount: number;
}

export function PersonalLearningListView({
  apls,
  totalCount,
}: PersonalLearningListViewProps) {
  const history = useHistory();

  const onViewDetail = useCallback((id: string) => {
    history.push(
      myTrainingPaths.approvalPersonalLearningDetail('approval', id)
    );
  }, []);

  const getApprovalTime = (model: AplModel): string => {
    /* 승인 상태에 따라 승인시간을 다르게 보여줌. */
    if (model.state === AplState.Opened) {
      if (model.modifiedTime) {
        return moment(model.modifiedTime).format('YYYY.MM.DD');
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

  return (
    <Table.Body>
      {apls &&
        apls.length > 0 &&
        apls.map((apl: AplModel, index: number) => {
          return (
            <Table.Row key={`personalLearning-view-${apl.id}`}>
              <Table.Cell>
                {totalCount - index} {/* No */}
              </Table.Cell>
              <Table.Cell className="title">
                <a href="#" onClick={() => onViewDetail(apl.id)}>
                  <span className="ellipsis">{apl.title}</span>
                </a>{' '}
                {/* title */}
              </Table.Cell>
              <Table.Cell>
                {apl.channelId} {/* Channel */}
              </Table.Cell>
              <Table.Cell>
                {getAllowTime(apl)} {/* 교육시간 */}
              </Table.Cell>
              <Table.Cell>
                {apl.displayCreationTime} {/* 등록일자 */}
              </Table.Cell>
              <Table.Cell>
                <span className="ellipsis">
                  {parsePolyglotString(apl.registrantUserIdentity?.name)}
                </span>{' '}
                {/* 생성자 */}
              </Table.Cell>
              <Table.Cell>
                <span className="ellipsis">
                  {apl.registrantUserIdentity?.email}
                </span>{' '}
                {/* 생성자 E-mail */}
              </Table.Cell>
              <Table.Cell>
                {apl.displayStateName} {/* 상태 */}
              </Table.Cell>
              <Table.Cell>
                {getApprovalTime(apl)} {/* 승인일자 */}
              </Table.Cell>
            </Table.Row>
          );
        })}
    </Table.Body>
  );
}
