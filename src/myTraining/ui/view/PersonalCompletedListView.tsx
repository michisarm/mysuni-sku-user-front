import React from 'react';
import { observer } from 'mobx-react';
import { useHistory } from 'react-router-dom';
import { Table } from 'semantic-ui-react';
import moment from 'moment';
import routePaths from '../../routePaths';
import { AplModel } from '../../model';
import { AplStateName } from '../../model/AplStateName';
import { AplState } from '../../model/AplState';
import { useScrollMove } from '../../useScrollMove';
import { parsePolyglotString } from 'shared/viewmodel/PolyglotString';
import { getChannelName } from 'shared/service/useCollege/useRequestCollege';

interface PersonalCompletedListViewProps {
  apls: AplModel[];
  totalCount: number;
}

function PersonalCompletedListView({
  apls,
  totalCount,
}: PersonalCompletedListViewProps) {
  const history = useHistory();
  const { scrollSave } = useScrollMove();

  const onViewDetail = (page: string, id: string) => {
    scrollSave();
    history.push(routePaths.approvalPersonalLearningDetail(page, id));
  };

  return (
    <Table.Body>
      {apls &&
        apls.length > 0 &&
        apls.map((apl, index) => {
          const channelName = getChannelName(apl.channelId);
          return (
            <Table.Row key={`personalCompleted-list-${index}`}>
              <Table.Cell>{totalCount - index}</Table.Cell>
              <Table.Cell className="title">
                <a href="#" onClick={() => onViewDetail('learning', apl.id)}>
                  <span className="ellipsis">{apl.title}</span>
                </a>{' '}
              </Table.Cell>
              <Table.Cell>
                <span className="ellipsis">{channelName}</span>
              </Table.Cell>
              <Table.Cell>{getAllowTime(apl)}</Table.Cell>
              <Table.Cell>
                {parsePolyglotString(apl.approvalUserIdentity?.name)}
              </Table.Cell>
              <Table.Cell>{apl.approvalUserIdentity?.email}</Table.Cell>
              <Table.Cell>{AplStateName[apl.state]}</Table.Cell>
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

export default observer(PersonalCompletedListView);
