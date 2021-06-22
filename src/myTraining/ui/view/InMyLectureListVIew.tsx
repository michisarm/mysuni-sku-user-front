import React, { useEffect } from 'react';
import { InMyLectureTableViewModel } from '../../model';
import { Table } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import LectureParams, {
  toPath,
} from '../../../lecture/detail/viewModel/LectureParams';
import { CubeTypeNameType } from '../../../personalcube/personalcube/model';
import { LearningState, LearningStateName } from '../../../shared/model';
import {
  timeToHourMinutePaddingFormat,
  convertTimeToDate,
} from '../../../shared/helper/dateTimeHelper';
import { getCollgeName } from '../../../shared/service/useCollege/useRequestCollege';
import { useScrollMove } from '../../useScrollMove';
import { LearningTypeName } from '../../model/LearningType';

interface InMyLectureTableViewProps {
  inMyLectures: InMyLectureTableViewModel[];
  totalCount: number;
}

export default function InMyLectureListView({
  inMyLectures,
  totalCount,
}: InMyLectureTableViewProps) {
  const history = useHistory();
  const { scrollSave } = useScrollMove();

  const onViewDetail = (e: any, cardId: string) => {
    e.preventDefault();
    
    scrollSave();

    const params: LectureParams = {
      cardId,
      viewType: 'view',
      pathname: '',
    };

    history.push(toPath(params));
  };

  return (
    <Table.Body>
      {inMyLectures &&
        inMyLectures.length > 0 &&
        inMyLectures.map((inMyLecture, index) => {
          const learningType = LearningTypeName[inMyLecture.cubeType];
          const collegeName = getCollgeName(inMyLecture.category.college.id);
          const learningState = inMyLecture.learningState &&
              LearningStateName[inMyLecture.learningState] || '-';
          const progressRate = inMyLecture.learningState &&
              `${inMyLecture.passedLearningCount}/${inMyLecture.totalLearningCount}` || '-';

          return (
            <Table.Row key={`inMyLecture-list-${index}`}>
              <Table.Cell>{totalCount - index}</Table.Cell>
              <Table.Cell>{collegeName}</Table.Cell>
              <Table.Cell className="title">
                <a href="#" onClick={e => onViewDetail(e, inMyLecture.serviceId)}>
                  <span className={`ellipsis ${inMyLecture.useNote ?  'noteOn' : ''}`}>{inMyLecture.name}</span>
                  {/* <span className="ellipsis noteOn">{inMyLecture.name}</span> */}
                </a>
              </Table.Cell>
              <Table.Cell>{learningType || '-'} </Table.Cell>
              <Table.Cell>{inMyLecture.difficultyLevel || '-'}</Table.Cell>
              <Table.Cell>
                {timeToHourMinutePaddingFormat(inMyLecture.learningTime)}
              </Table.Cell>
              <Table.Cell>
                {convertTimeToDate(inMyLecture.lastStudyDate)}
              </Table.Cell>
              <Table.Cell>{progressRate}</Table.Cell>
              <Table.Cell>{learningState}</Table.Cell>
            </Table.Row>
          );
        })}
    </Table.Body>
  );
}
