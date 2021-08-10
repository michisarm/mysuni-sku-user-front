import React, { useCallback } from 'react';
import { Table } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import myTrainingPaths from '../routePaths';
import { AplModel } from '../model';
import { AplState } from '../model/AplState';
import { parsePolyglotString } from 'shared/viewmodel/PolyglotString';
import { getChannelName } from 'shared/service/useCollege/useRequestCollege';

interface PersonalLearningListViewProps {
  totalCount: number;
  apls: AplModel[];
  onClickItem: (page: string, id: string) => void;
}

export function PersonalLearningListView({
  apls,
  totalCount,
  onClickItem,
}: PersonalLearningListViewProps) {
  return (
    <Table.Body>
      {apls &&
        apls.length > 0 &&
        apls.map((apl: AplModel, index: number) => {
          const channelName = getChannelName(apl.channelId);

          return (
            <Table.Row key={`personalLearning-view-${apl.id}`}>
              <Table.Cell>{totalCount - index}</Table.Cell>
              <Table.Cell className="title">
                <a onClick={() => onClickItem('approval', apl.id)}>
                  <span className="ellipsis">{apl.title}</span>
                </a>{' '}
              </Table.Cell>
              <Table.Cell>{channelName}</Table.Cell>
              <Table.Cell>{getAllowTime(apl)}</Table.Cell>
              <Table.Cell>{apl.displayCreationTime}</Table.Cell>
              <Table.Cell>
                <span className="ellipsis">
                  {parsePolyglotString(apl.registrantUserIdentity?.name)}
                </span>{' '}
              </Table.Cell>
              <Table.Cell>
                <span className="ellipsis">
                  {apl.registrantUserIdentity?.email}
                </span>{' '}
              </Table.Cell>
              <Table.Cell>{apl.displayStateName}</Table.Cell>
              <Table.Cell>{getApprovalTime(apl)}</Table.Cell>
            </Table.Row>
          );
        })}
    </Table.Body>
  );
}

const getApprovalTime = (model: AplModel): string => {
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
    return model.allowTime ? moment(model.allowTime).format('YYYY.MM.DD') : '-';
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
