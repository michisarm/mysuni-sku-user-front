import { MyTrainingTableViewModel } from 'myTraining/model';
import { LearningTypeName } from 'myTraining/model/LearningType';
import { inProgressPolyglot } from 'myTraining/ui/model/TableHeaderColumn';
import React from 'react';
import { Icon, Table } from 'semantic-ui-react';
import {
  convertTimeToDate,
  timeToHourMinutePaddingFormat,
} from 'shared/helper/dateTimeHelper';
import { getCollgeName } from 'shared/service/useCollege/useRequestCollege';
import { parsePolyglotString } from 'shared/viewmodel/PolyglotString';
import { SeeMoreButton } from '../../../../lecture';

interface props {
  totalCount: number;
  headerColumns: { key: number; text: string; icon?: boolean | undefined }[];
  learningList: MyTrainingTableViewModel[];
  showSeeMore: boolean;
  onClickRow: (e: any, myTraining: MyTrainingTableViewModel) => void;
  onClickSeeMore: () => void;

  getOrderIcon: (
    column: string,
    fromStyle?: boolean
  ) => 'list-down16' | 'list-up16' | '내림차순 정렬' | '오름차순 정렬';
  onClickSort: (column: string) => void;
}

export function RetryListPageTableView({
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
      <div className="mylearning-list-wrap">
        <Table className="ml-02-03">
          <Table.Header>
            <Table.Row>
              {headerColumns &&
                headerColumns.length > 0 &&
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
            {learningList.map((myTraining, index) => {
              const collegeId = myTraining.category?.collegeId || '';
              return (
                <Table.Row key={`mytraining-list-${index}`}>
                  <Table.Cell>{totalCount - index}</Table.Cell>
                  <Table.Cell>{getCollgeName(collegeId)}</Table.Cell>
                  <Table.Cell className="title">
                    <a href="#" onClick={(e) => onClickRow(e, myTraining)}>
                      <span
                        className={`ellipsis ${
                          myTraining.useNote ? 'noteOn' : ''
                        }`}
                      >
                        {parsePolyglotString(myTraining.name)}
                      </span>
                    </a>
                  </Table.Cell>
                  <Table.Cell>
                    {LearningTypeName[myTraining.cubeType] || '-'}{' '}
                  </Table.Cell>
                  <Table.Cell>{myTraining.difficultyLevel || '-'}</Table.Cell>
                  <Table.Cell>
                    {timeToHourMinutePaddingFormat(
                      myTraining.learningTime +
                        myTraining.additionalLearningTime
                    )}
                  </Table.Cell>
                  <Table.Cell>{myTraining.stampCount || '-'}</Table.Cell>
                  <Table.Cell>
                    {convertTimeToDate(myTraining.modifiedTime)}
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
