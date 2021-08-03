import React from 'react';
import { useHistory } from 'react-router-dom';
import { Table } from 'semantic-ui-react';
import moment from 'moment';
import routePaths from '../../routePaths';
import { AplModel } from '../../model';
import { AplStateName } from '../../model/AplStateName';
import { AplState } from '../../model/AplState';
import { useScrollMove } from '../../useScrollMove';
import { parsePolyglotString } from 'shared/viewmodel/PolyglotString';

interface PersonalCompletedListViewProps {
  apls: AplModel[];
  totalCount: number;
}

export default function PersonalCompletedListView({
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
          return (
            <Table.Row key={`personalCompleted-list-${index}`}>
              <Table.Cell>{totalCount - index}</Table.Cell>
              <Table.Cell className="title">
                <a href="#" onClick={() => onViewDetail('learning', apl.id)}>
                  <span className="ellipsis">
                    {parsePolyglotString(apl.title)}
                  </span>
                </a>{' '}
              </Table.Cell>
              <Table.Cell>
                <span className="ellipsis">
                  {parsePolyglotString(apl.channelName)}
                </span>
              </Table.Cell>
              <Table.Cell>{getAllowTime(apl)}</Table.Cell>
              <Table.Cell>{parsePolyglotString(apl.approvalName)}</Table.Cell>
              <Table.Cell>{apl.approvalEmail}</Table.Cell>
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
    if (model.updateTime) {
      return moment(model.updateTime).format('YYYY.MM.DD');
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
