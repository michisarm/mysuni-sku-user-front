import React from 'react';
import { InMyLectureTableViewModel } from '../../model';
import { Table } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import LectureParams, { toPath } from '../../../lecture/detail/viewModel/LectureParams';
import { CubeTypeNameType } from '../../../personalcube/personalcube/model';
import { LearningState } from '../../../shared/model';
import { timeToHourMinutePaddingFormat } from '../../../shared/helper/dateTimeHelper';
import { getCollgeName } from '../../../shared/service/useCollege/useRequestCollege';

interface InMyLectureTableViewProps {
  inMyLectures: InMyLectureTableViewModel[];
  totalCount: number;
}

export default function InMyLectureListView({
  inMyLectures,
  totalCount,
}: InMyLectureTableViewProps) {
  const history = useHistory();

  const onViewDetail = (e: any, cardId: string) => {
    const params: LectureParams = {
      cardId,
      viewType: 'view',
    }

    history.push(toPath(params));
  };

  return (
    <Table.Body>
      {
        inMyLectures &&
        inMyLectures.length > 0 &&
        inMyLectures.map((inMyLecture, index) => {
          const collegeName = getCollgeName(inMyLecture.category.college.id);

          const learningType = inMyLecture.serviceType === 'Card' && inMyLecture.serviceType || CubeTypeNameType[inMyLecture.cubeType];
          const progressRate = inMyLecture.serviceType === 'Card' && inMyLecture.learningState === LearningState.Passed && 
          `${inMyLecture.passedLearningCount}/${inMyLecture.totalLearningCount}` || '-';

          
          return (
            <Table.Row key={`inMyLecture-list-${index}`}>
              <Table.Cell>
                {totalCount - index}
              </Table.Cell>
              <Table.Cell>
                {collegeName}
              </Table.Cell>
              <Table.Cell className="title">
                <a href="#" onClick={e => onViewDetail(e, inMyLecture.cardId)}>
                  <span className="ellipsis">
                    {inMyLecture.name}
                  </span>
                </a>
              </Table.Cell>
              <Table.Cell>
                {learningType}{' '}
              </Table.Cell>
              <Table.Cell>
                {inMyLecture.difficultyLevel || '-'}
              </Table.Cell>
              <Table.Cell>
                {timeToHourMinutePaddingFormat(inMyLecture.learningTime)}
              </Table.Cell>
              <Table.Cell>
                {'lastStudyDate'}
              </Table.Cell>
              <Table.Cell>
                {progressRate}
              </Table.Cell>
              <Table.Cell>
                {inMyLecture.learningState}
              </Table.Cell>
            </Table.Row>
          );
        })
      }


    </Table.Body>
  );
}