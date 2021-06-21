import React, { useEffect } from 'react';
import { MyTrainingTableViewModel } from '../../model';
import { Table } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import LectureParams, {
  toPath,
} from '../../../lecture/detail/viewModel/LectureParams';
import { convertTimeToDate } from '../../../shared/helper/dateTimeHelper';
import { getCollgeName } from '../../../shared/service/useCollege/useRequestCollege';
import { useScrollMove } from '../../useScrollMove';
import MyStampCertificateModal from './MyStampCertificateModal'

interface MyStampListViewProps {
  myStamps: MyTrainingTableViewModel[];
  totalCount: number;
}

export default function MyStampListView({
  myStamps,
  totalCount,
}: MyStampListViewProps) {
  const history = useHistory();
  const { scrollOnceMove, scrollSave } = useScrollMove();

  useEffect(() => {
    setTimeout(() => {
      scrollOnceMove();
    }, 200);
  }, [scrollOnceMove]);

  const onViewDetail = (e: any, myStamp: MyTrainingTableViewModel) => {
    e.preventDefault();

    scrollSave();

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
              {/* 스탬프 */}
              {/* <Table.Cell>
                {myStamp.stampCount || '-'} 
              </Table.Cell> */}
              <Table.Cell>
                {convertTimeToDate(myStamp.endDate)} {/* 획득일자 */}
              </Table.Cell>
              <Table.Cell>
                <MyStampCertificateModal
                  myStamp={myStamp}
                />
              </Table.Cell>
            </Table.Row>
          );
        })}
    </Table.Body>
  );
}
