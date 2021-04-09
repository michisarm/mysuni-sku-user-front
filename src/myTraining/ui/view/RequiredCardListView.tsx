import React from 'react';
import { Table } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import {
  timeToHourMinutePaddingFormat,
  convertTimeToDate,
} from '../../../shared/helper/dateTimeHelper';
import LectureParams, {
  toPath,
} from '../../../lecture/detail/viewModel/LectureParams';
import LectureTableViewModel from '../../../lecture/model/LectureTableViewModel';
import { getCollgeName } from '../../../shared/service/useCollege/useRequestCollege';
import { LearningStateName, LearningState } from '../../../shared/model';

interface RequiredCardListViewProps {
  requiredCards: LectureTableViewModel[];
  totalCount: number;
}

export default function RequiredCardListView({
  requiredCards,
  totalCount,
}: RequiredCardListViewProps) {
  const history = useHistory();

  const onViewDetail = (e: any, cardId: string) => {
    e.preventDefault();

    const params: LectureParams = {
      cardId,
      viewType: 'view',
      pathname: '',
    };

    history.push(toPath(params));
  };

  return (
    <Table.Body>
      {requiredCards &&
        requiredCards.length > 0 &&
        requiredCards.map((requiredCard, index) => {
          const collegeName = getCollgeName(requiredCard.category.collegeId);
          const learningState =
            (requiredCard.learningState &&
              LearningStateName[requiredCard.learningState as LearningState]) ||
            '-';
          const progressRate =
            (requiredCard.learningState &&
              `${requiredCard.passedLearningCount}/${requiredCard.totalLearningCount}`) ||
            '-';

          return (
            <Table.Row key={`requried-card-${index}`}>
              <Table.Cell>{totalCount - index}</Table.Cell>
              <Table.Cell>{collegeName}</Table.Cell>
              <Table.Cell className="title">
                <a
                  href="#"
                  onClick={e => {
                    onViewDetail(e, requiredCard.serviceId);
                  }}
                >
                  <span className="ellipsis">{requiredCard.name}</span>
                </a>
              </Table.Cell>
              <Table.Cell>{requiredCard.serviceType} </Table.Cell>
              <Table.Cell>{requiredCard.difficultyLevel || '-'}</Table.Cell>
              <Table.Cell>
                {timeToHourMinutePaddingFormat(requiredCard.learningTime)}
              </Table.Cell>
              <Table.Cell>
                {convertTimeToDate(requiredCard.updateTime)}
              </Table.Cell>
              <Table.Cell>{progressRate}</Table.Cell>
              <Table.Cell>{learningState}</Table.Cell>
            </Table.Row>
          );
        })}
    </Table.Body>
  );
}
