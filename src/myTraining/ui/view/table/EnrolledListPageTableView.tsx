import { MyTrainingTableViewModel } from 'myTraining/model';
import { LearningTypeName } from 'myTraining/model/LearningType';
import { inProgressPolyglot } from 'myTraining/ui/model/TableHeaderColumn';
import React from 'react';
import { Icon, Table } from 'semantic-ui-react';
import { dateTimeHelper } from 'shared';
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
  seeMoreButtonViewRef: (ref: HTMLDivElement | null) => void;
  isLoading: boolean;
}

export function EnrolledListPageTableView({
  totalCount,
  headerColumns,
  learningList,
  showSeeMore,
  onClickRow,
  onClickSeeMore,

  getOrderIcon,
  onClickSort,
  seeMoreButtonViewRef,
  isLoading,
}: props) {
  //
  return (
    <>
      <div className="mylearning-list-wrap">
        <Table className="ml-02-03">
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
            {learningList.map((myTraining, index) => {
              const learningType = LearningTypeName[myTraining.type];
              const formattedLearningTime =
                dateTimeHelper.timeToHourMinuteFormat(myTraining.learningTime);

              return (
                <Table.Row key={`mytraining-list-${index}`}>
                  <Table.Cell>{totalCount - index}</Table.Cell>
                  <Table.Cell>{getCollgeName(myTraining.collegeId)}</Table.Cell>
                  <Table.Cell className="title">
                    <a href="#" onClick={(e) => onClickRow(e, myTraining)}>
                      <span
                        className={`ellipsis ${
                          myTraining.useNote ? 'noteOn' : ''
                        }`}
                      >
                        {parsePolyglotString(myTraining.cubeName)}
                      </span>
                    </a>
                  </Table.Cell>
                  <Table.Cell>{learningType || '-'} </Table.Cell>
                  <Table.Cell>{myTraining.round} </Table.Cell>
                  <Table.Cell>{myTraining.difficultyLevel || '-'}</Table.Cell>
                  <Table.Cell>{formattedLearningTime}</Table.Cell>
                  {/* <Table.Cell>
                    {(myTraining.stampCount !== 0 && myTraining.stampCount) ||
                      '-'}
                  </Table.Cell> */}
                  <Table.Cell>{myTraining.learningStartDate}</Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </div>

      {!isLoading && showSeeMore && (
        <SeeMoreButton onClick={onClickSeeMore} ref={seeMoreButtonViewRef} />
      )}
    </>
  );
}
