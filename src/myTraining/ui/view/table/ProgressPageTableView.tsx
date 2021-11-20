import React from 'react';
import CardForUserViewModel from 'lecture/model/learning/CardForUserViewModel';
import { LearningType, LearningTypeName } from 'myTraining/model/LearningType';
import { inProgressPolyglot } from 'myTraining/ui/model/TableHeaderColumn';
import { Checkbox, Icon, Table } from 'semantic-ui-react';
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
  learningList: CardForUserViewModel[];
  showSeeMore: boolean;
  getLearningType: (type: LearningType) => LearningTypeName;
  onClickRow: (e: any, myTraining: CardForUserViewModel) => void;
  onClickSeeMore: () => void;

  getOrderIcon: (
    column: string,
    fromStyle?: boolean
  ) => 'list-down16' | 'list-up16' | '내림차순 정렬' | '오름차순 정렬';
  onClickSort: (column: string) => void;

  selectedServiceIds: string[];
  onCheckAll: (e: any, data: any) => void;
  onCheckOne: (e: any, data: any) => void;
  seeMoreButtonViewRef: (ref: HTMLDivElement | null) => void;
  isLoading: boolean;
}

export function ProgressPageTableView({
  totalCount,
  headerColumns,
  learningList,
  showSeeMore,
  getLearningType,
  onClickRow,
  onClickSeeMore,

  getOrderIcon,
  onClickSort,

  selectedServiceIds,
  onCheckAll,
  onCheckOne,
  seeMoreButtonViewRef,
  isLoading,
}: props) {
  //

  return (
    <>
      <div className="mylearning-list-wrap">
        <Table className="ml-02-02">
          <colgroup>
            <col width="4%" />
            <col width="4%" />
            <col width="15%" />
            <col width="25%" />
            <col width="11%" />
            <col width="11%" />
            <col width="10%" />
            <col width="10%" />
            <col width="10%" />
          </colgroup>

          <Table.Header>
            <Table.Row>
              <Table.HeaderCell className="ck">
                <Checkbox
                  checked={selectedServiceIds.length === learningList.length}
                  onChange={onCheckAll}
                />
              </Table.HeaderCell>
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
            {learningList.map((myTraining, index) => (
              <Table.Row key={`mytraining-list-${index}`}>
                <Table.Cell>
                  <Checkbox
                    value={myTraining.id}
                    checked={selectedServiceIds.includes(myTraining.id)}
                    onChange={onCheckOne}
                  />
                </Table.Cell>
                <Table.Cell>{totalCount - index}</Table.Cell>
                <Table.Cell>
                  {getCollgeName(myTraining.mainCollegeId || '')}
                </Table.Cell>
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
                  {getLearningType(myTraining.type) || '-'}{' '}
                </Table.Cell>
                <Table.Cell>{myTraining.difficultyLevel || '-'}</Table.Cell>
                <Table.Cell>
                  {timeToHourMinutePaddingFormat(
                    myTraining.learningTime + myTraining.additionalLearningTime
                  )}
                </Table.Cell>
                <Table.Cell>
                  {convertTimeToDate(myTraining.modifiedTime)}
                </Table.Cell>
                <Table.Cell>
                  {`${myTraining.completePhaseCount}/${myTraining.phaseCount}`}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
      {!isLoading && showSeeMore && (
        <SeeMoreButton onClick={onClickSeeMore} ref={seeMoreButtonViewRef} />
      )}
    </>
  );
}
