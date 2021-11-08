import { AplModel } from 'myTraining/model';
import { aplStateNamePolyglotText } from 'myTraining/model/AplStateName';
import { inProgressPolyglot } from 'myTraining/ui/model/TableHeaderColumn';
import React from 'react';
import { Table } from 'semantic-ui-react';
import { getChannelName } from 'shared/service/useCollege/useRequestCollege';
import { parsePolyglotString } from 'shared/viewmodel/PolyglotString';
import { SeeMoreButton } from '../../../../lecture';

interface props {
  totalCount: number;
  headerColumns: { key: number; text: string; icon?: boolean | undefined }[];
  learningList: any[];
  showSeeMore: boolean;
  onClickRow: (e: any, id: string) => void;
  onClickSeeMore: () => void;

  getApprovalTime: (model: AplModel) => string;
  getAllowTime: (model: AplModel) => string;
}

export function PersonalCompletedListPageTableView({
  totalCount,
  headerColumns,
  learningList,
  showSeeMore,
  onClickRow,
  onClickSeeMore,

  getApprovalTime,
  getAllowTime,
}: props) {
  //
  return (
    <>
      <div className="mylearning-list-wrap">
        <Table className="ml-02-09">
          <colgroup>
            <col width="10%" />
            <col width="25%" />
            <col width="15%" />
            <col width="10%" />
            <col width="5%" />
            <col width="15%" />
            <col width="10%" />
            <col width="10%" />
          </colgroup>

          <Table.Header>
            <Table.Row>
              {headerColumns &&
                headerColumns.length &&
                headerColumns.map((headerColumn) => (
                  <Table.HeaderCell
                    key={`learning-header-${headerColumn.key}`}
                    className={headerColumn.text === '과정명' ? 'title' : ''}
                  >
                    {inProgressPolyglot(headerColumn.text)}
                  </Table.HeaderCell>
                ))}
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {learningList.map((apl, index) => {
              const channelName = getChannelName(apl.channelId);
              return (
                <Table.Row key={`personalCompleted-list-${index}`}>
                  <Table.Cell>{totalCount - index}</Table.Cell>
                  <Table.Cell className="title">
                    <a onClick={() => onClickRow('learning', apl.id)}>
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
                  <Table.Cell>
                    {apl.approvalUserIdentity?.email || '-'}
                  </Table.Cell>
                  <Table.Cell>{aplStateNamePolyglotText(apl.state)}</Table.Cell>
                  <Table.Cell>{getApprovalTime(apl)}</Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </div>
      {showSeeMore && <SeeMoreButton onClick={onClickSeeMore} />}
    </>
  );
}
