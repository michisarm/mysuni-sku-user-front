import CardForUserViewModel from 'lecture/model/learning/CardForUserViewModel';
import LectureTableViewModel from 'lecture/model/LectureTableViewModel';
import { LearningTypeName } from 'myTraining/model/LearningType';
import { inProgressPolyglot } from 'myTraining/ui/model/TableHeaderColumn';
import React from 'react';
import { Icon, Table } from 'semantic-ui-react';
import {
  convertTimeToDate,
  timeToHourMinutePaddingFormat,
} from 'shared/helper/dateTimeHelper';
import { LearningState, LearningStateName } from 'shared/model';
import { stateNamePolytglot } from 'shared/model/LearningStateName';
import { getCollgeName } from 'shared/service/useCollege/useRequestCollege';
import { parsePolyglotString } from 'shared/viewmodel/PolyglotString';
import { SeeMoreButton } from '../../../../lecture';

interface props {
  totalCount: number;
  headerColumns: { key: number; text: string; icon?: boolean | undefined }[];
  learningList: CardForUserViewModel[];
  showSeeMore: boolean;
  onClickRow: (e: any, cardId: string) => void;
  onClickSeeMore: () => void;

  getOrderIcon: (
    column: string,
    fromStyle?: boolean
  ) => 'list-down16' | 'list-up16' | '내림차순 정렬' | '오름차순 정렬';
  onClickSort: (column: string) => void;
  seeMoreButtonViewRef: (ref: HTMLDivElement | null) => void;
  isLoading: boolean;
}

export function RequiredListPageTableView({
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
          <colgroup>
            <col width="8%" />
            <col width="12%" />
            <col width="20%" />
            <col width="10%" />
            <col width="10%" />
            <col width="10%" />
            <col width="10%" />
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
            {learningList.map((requiredCard, index) => {
              const learningType = LearningTypeName[requiredCard.type];
              const collegeName = getCollgeName(requiredCard.mainCollegeId);
              const learningState =
                (requiredCard.learningState &&
                  LearningStateName[
                    requiredCard.learningState as LearningState
                  ]) ||
                '-';
              const progressRate =
                (requiredCard.learningState &&
                  `${requiredCard.completePhaseCount}/${requiredCard.phaseCount}`) ||
                '-';

              return (
                <Table.Row key={`requried-card-${index}`}>
                  <Table.Cell>{totalCount - index}</Table.Cell>
                  <Table.Cell>{collegeName}</Table.Cell>
                  <Table.Cell className="title">
                    <a
                      href="#"
                      onClick={(e) => {
                        onClickRow(e, requiredCard.id);
                      }}
                    >
                      <span
                        className={`ellipsis ${
                          requiredCard.useNote ? 'noteOn' : ''
                        }`}
                      >
                        {requiredCard.name &&
                          parsePolyglotString(requiredCard.name)}
                      </span>
                    </a>
                  </Table.Cell>
                  <Table.Cell>{learningType || '-'} </Table.Cell>
                  <Table.Cell>{requiredCard.difficultyLevel || '-'}</Table.Cell>
                  <Table.Cell>
                    {timeToHourMinutePaddingFormat(requiredCard.learningTime)}
                  </Table.Cell>
                  <Table.Cell>
                    {convertTimeToDate(requiredCard.modifiedTime)}
                  </Table.Cell>
                  <Table.Cell>{progressRate}</Table.Cell>
                  <Table.Cell>
                    {(learningState && stateNamePolytglot(learningState)) ||
                      '-'}
                  </Table.Cell>
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
