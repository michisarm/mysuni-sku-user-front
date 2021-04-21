import React, { useCallback } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { mobxHelper } from '@nara.platform/accent';
import { Checkbox, Table } from 'semantic-ui-react';
import { MyTrainingService } from 'myTraining/stores';
import MyTrainingTableViewModel from 'myTraining/model/MyTrainingTableViewModel';
import ReactGA from 'react-ga';
import { useScrollMove } from 'myTraining/useScrollMove';
import LectureParams, {
  toPath,
} from '../../../lecture/detail/viewModel/LectureParams';
import { MyTrainingRouteParams } from '../../model/MyTrainingRouteParams';
import {
  timeToHourMinutePaddingFormat,
  convertTimeToDate,
} from '../../../shared/helper/dateTimeHelper';
import { MyLearningContentType } from '../model/MyLearningContentType';
import { LearningTypeName } from '../../model/LearningType';
import { useCollegeStore } from '../../../shared/store/CollegeStore';

interface MyTrainingListViewProps {
  myTrainings: MyTrainingTableViewModel[];
  totalCount: number;
  myTrainingService?: MyTrainingService;
}

function MyTrainingListView({
  myTrainings,
  totalCount,
  myTrainingService,
}: MyTrainingListViewProps) {
  const history = useHistory();
  const params = useParams<MyTrainingRouteParams>();
  const colleges = useCollegeStore();
  const contentType = params.tab;

  const { scrollSave } = useScrollMove();

  const { selectedServiceIds, selectOne, clearOne } = myTrainingService!;

  const onViewDetail = (e: any, myTraining: MyTrainingTableViewModel) => {
    e.preventDefault();

    const cardId = myTraining.serviceType === 'Card' ? myTraining.serviceId : myTraining.cardId;

    const params: LectureParams = {
      cardId,
      viewType: 'view',
      pathname: '',
    };

    history.push(toPath(params));

    if(contentType === MyLearningContentType.InProgress) {
      ReactGA.event({
        category: '학습중인 과정',
        action: 'Click',
        label: `${
          myTraining.serviceType === 'Card' ? '(Card)' : '(Cube)'
        } - ${myTraining.name}`,
      });
    }
    scrollSave();
  };

  const onCheckOne = useCallback(
    (e: any, data: any) => {
      if (selectedServiceIds.includes(data.value)) {
        clearOne(data.value);
        return;
      }

      selectOne(data.value);
    },
    [selectedServiceIds, clearOne, selectOne]
  );

  const renderBaseContent = (
    myTraining: MyTrainingTableViewModel,
    index: number
  ) => {
    const collegeName = colleges?.find(college => college.id === myTraining.category.college.id)?.name;

    return (
      <>
        <Table.Cell>{totalCount - index}</Table.Cell>
        <Table.Cell>{collegeName}</Table.Cell>
        <Table.Cell className="title">
          <a href="#" onClick={e => onViewDetail(e, myTraining)}>
            <span className="ellipsis">{myTraining.name}</span>
          </a>
        </Table.Cell>
      </>
    );
  };

  const renderByContentType = (
    myTraining: MyTrainingTableViewModel,
    contentType: MyLearningContentType
  ) => {
    const learningType = LearningTypeName[myTraining.cubeType];

    switch (contentType) {
      case MyLearningContentType.InProgress: {
        return (
          <>
            <Table.Cell>{learningType || '-'} </Table.Cell>
            <Table.Cell>{myTraining.difficultyLevel || '-'}</Table.Cell>
            <Table.Cell>
              {timeToHourMinutePaddingFormat(myTraining.learningTime)}
            </Table.Cell>
            <Table.Cell>{convertTimeToDate(myTraining.time)}</Table.Cell>
            <Table.Cell>
              {`${myTraining.passedLearningCount}/${myTraining.totalLearningCount}`}
            </Table.Cell>
          </>
        );
      }

      case MyLearningContentType.Enrolled: {
        return (
          <>
            <Table.Cell>{learningType || '-'} </Table.Cell>
            <Table.Cell>
              {myTraining.difficultyLevel || '-'} {/* Level */}
            </Table.Cell>
            <Table.Cell>
              {timeToHourMinutePaddingFormat(myTraining.learningTime)}
            </Table.Cell>
            <Table.Cell>
              {(myTraining.stampCount !== 0 && myTraining.stampCount) || '-'}
            </Table.Cell>
            <Table.Cell>{convertTimeToDate(myTraining.startDate)}</Table.Cell>
          </>
        );
      }
      case MyLearningContentType.Completed: {
        return (
          <>
            <Table.Cell>{learningType || '-'} </Table.Cell>
            <Table.Cell>{myTraining.difficultyLevel || '-'}</Table.Cell>
            <Table.Cell>
              {timeToHourMinutePaddingFormat(myTraining.learningTime)}
            </Table.Cell>
            <Table.Cell>{convertTimeToDate(myTraining.endDate)}</Table.Cell>
          </>
        );
      }
      case MyLearningContentType.Retry: {
        return (
          <>
            <Table.Cell>{learningType || '-'} </Table.Cell>
            <Table.Cell>{myTraining.difficultyLevel || '-'}</Table.Cell>
            <Table.Cell>
              {timeToHourMinutePaddingFormat(myTraining.learningTime)}
            </Table.Cell>
            <Table.Cell>{myTraining.stampCount || '-'}</Table.Cell>
            <Table.Cell>{convertTimeToDate(myTraining.time)}</Table.Cell>
          </>
        );
      }
    }
  };

  return (
    <Table.Body>
      {myTrainings &&
        myTrainings.length &&
        myTrainings.map((myTraining, index) => (
          <Table.Row key={`mytraining-list-${index}`}>
            {contentType === MyLearningContentType.InProgress && (
              <Table.Cell>
                <Checkbox
                  value={myTraining.serviceId}
                  checked={selectedServiceIds.includes(myTraining.serviceId)}
                  onChange={onCheckOne}
                />
              </Table.Cell>
            )}
            {renderBaseContent(myTraining, index)}
            {renderByContentType(myTraining, contentType)}
          </Table.Row>
        ))}
    </Table.Body>
  );
}

export default inject(mobxHelper.injectFrom('myTraining.myTrainingService'))(
  observer(MyTrainingListView)
);
