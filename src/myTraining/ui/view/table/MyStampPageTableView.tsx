import CardForUserViewModel from 'lecture/model/learning/CardForUserViewModel';
import { inProgressPolyglot } from 'myTraining/ui/model/TableHeaderColumn';
import React from 'react';
import { Icon, Table } from 'semantic-ui-react';
import { convertTimeToDate } from 'shared/helper/dateTimeHelper';
import { getCollgeName } from 'shared/service/useCollege/useRequestCollege';
import { parsePolyglotString } from 'shared/viewmodel/PolyglotString';
import { SeeMoreButton } from '../../../../lecture';

interface props {
  totalCount: number;
  headerColumns: { key: number; text: string; icon?: boolean | undefined }[];
  learningList: CardForUserViewModel[];
  showSeeMore: boolean;
  onClickRow: (e: any, serviceId: string) => void;
  onClickSeeMore: () => void;

  getOrderIcon: (
    column: string,
    fromStyle?: boolean
  ) => 'list-down16' | 'list-up16' | '내림차순 정렬' | '오름차순 정렬';
  onClickSort: (column: string) => void;
}

export function MyStampPageTableView({
  totalCount,
  headerColumns,
  learningList,
  showSeeMore,
  onClickRow,
  onClickSeeMore,

  getOrderIcon,
  onClickSort,
}: props) {
  //

  return (
    <>
      <div className="stamp-list-wrapper">
        <Table className="">
          <colgroup>
            <col width="80px" />
            <col width="100px" />
            <col width="420px" />
            <col width="150px" />
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
                    {headerColumn.icon && (
                      <a
                        href="#"
                        onClick={(e) => {
                          onClickSort(headerColumn.text);
                          e.preventDefault();
                        }}
                      >
                        <Icon className={getOrderIcon(headerColumn.text, true)}>
                          <span className="blind">
                            {getOrderIcon(headerColumn.text)}
                          </span>
                        </Icon>
                      </a>
                    )}
                  </Table.HeaderCell>
                ))}
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {learningList.map((myStamp, index) => {
              const collegeName = getCollgeName(myStamp.mainCollegeId);

              return (
                <Table.Row key={`myStamp-list-${index}`}>
                  <Table.Cell>{totalCount - index}</Table.Cell>
                  <Table.Cell>{collegeName}</Table.Cell>
                  <Table.Cell className="title">
                    <a href="#" onClick={(e) => onClickRow(e, myStamp.id)}>
                      <span className="ellipsis">
                        {parsePolyglotString(myStamp.name)}
                      </span>
                    </a>
                  </Table.Cell>
                  <Table.Cell>
                    {convertTimeToDate(myStamp.passedTime)}
                  </Table.Cell>
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
