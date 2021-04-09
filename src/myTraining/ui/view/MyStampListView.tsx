import React from 'react';
import { MyTrainingTableViewModel } from '../../model';
import { Table } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import LectureParams, {
  toPath,
} from '../../../lecture/detail/viewModel/LectureParams';
import { convertTimeToDate } from '../../../shared/helper/dateTimeHelper';
import { getCollgeName } from '../../../shared/service/useCollege/useRequestCollege';

interface MyStampListViewProps {
  myStamps: MyTrainingTableViewModel[];
  totalCount: number;
}

export default function MyStampListView({
  myStamps,
  totalCount,
}: MyStampListViewProps) {
  const history = useHistory();

  const onViewDetail = (e: any, myStamp: MyTrainingTableViewModel) => {
    e.preventDefault();

    const params: LectureParams = {
      cardId: myStamp.serviceId,
      viewType: 'view',
      pathname: '',
    };

    history.push(toPath(params));
  };

  return (
    <Table.Body>
      {myStamps &&
        myStamps.length > 0 &&
        myStamps.map((myStamp, index) => {
          const collegeName = getCollgeName(myStamp.category.college.id);

          return (
            <Table.Row key={`myStamp-list-${index}`}>
              <Table.Cell>{totalCount - index}</Table.Cell>
              <Table.Cell>{collegeName}</Table.Cell>
              <Table.Cell className="title">
                <a href="#" onClick={e => onViewDetail(e, myStamp)}>
                  <span className="ellipsis">{myStamp.name}</span>
                </a>
              </Table.Cell>
              <Table.Cell>
                {myStamp.stampCount || '-'} {/* 스탬프 */}
              </Table.Cell>
              <Table.Cell>
                {convertTimeToDate(myStamp.endDate)} {/* 획득일자 */}
              </Table.Cell>
            </Table.Row>
          );
        })}
    </Table.Body>
  );
}
