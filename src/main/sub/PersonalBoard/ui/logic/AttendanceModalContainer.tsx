import { mobxHelper, reactAlert } from '@nara.platform/accent';
import { inject, observer } from 'mobx-react';
import moment from 'moment';
import React, { useCallback, useEffect, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { requestAttendCount } from '../../service/getAttendCount';
import { requestEncryptEmail } from '../../service/getAttendEmail';
import { requestAttendEvent } from '../../service/getAttendEvent';
import { saveAttend } from '../../service/saveAttend';
import {
  useAttendCountItem,
  useAttendEventItem,
  useEncryptEmail,
} from '../../store/EventStore';
import AttendanceModal from '../view/AttendanceModal';

interface Props extends RouteComponentProps {
  open: boolean;
  setOpen: (state: boolean, type?: string) => void;
}

const AttendanceModalContainer: React.FC<Props> = function LearningObjectivesModalContainer({
  open,
  setOpen,
}) {
  const AttendEventItem = useAttendEventItem();
  const AttendCountItem = useAttendCountItem();
  const EncryptEmail = useEncryptEmail();
  const [afterFlag, setAfterFlag] = useState<boolean>(false)

  useEffect(() => {
    if (open) {
      const today = moment().format('YYYY-MM-DD')
      const afterFlag = moment(today).isAfter(
        moment().format('2021-04-30'),
        'day'
      );
      setAfterFlag(afterFlag)

      requestAttendEvent();
      requestEncryptEmail();
    }
  }, [open]);

  useEffect(() => {
    if (AttendEventItem === undefined || AttendEventItem.id === '') {
      return;
    }
    requestAttendCount(AttendEventItem.id);
  }, [AttendEventItem]);

  const handleInputChange = useCallback((name: string, value: any) => {}, []);

  const handleSave = useCallback(() => {}, []);

  const attendClick = useCallback(() => {
    // const today = moment().format('YYYY-MM-DD')
    // const afterFlag = moment(today).isAfter(
    //   moment().format('2021-04-28'),
    //   'day'
    // );
    if(afterFlag) {
      reactAlert({
        title: '알림',
        message: '출석 이벤트가 4/30에 종료 되었습니다. 복권 확인은 5/7까지 가능합니다.',
      });
      return;
    }
    if (AttendEventItem === undefined || AttendEventItem.id === '') {
      return;
    }
    saveAttend(AttendEventItem.id).then(result => {
      if (result !== undefined) {
        requestAttendCount(AttendEventItem.id).then((result) => {
          requestEncryptEmail();
        });
      }
    });
  }, [AttendEventItem]);

  return (
    <>
      {EncryptEmail && (
        <AttendanceModal
          open={open}
          setOpen={setOpen}
          handleInputChange={handleInputChange}
          handleSave={handleSave}
          attendClick={attendClick}
          AttendEventItem={AttendEventItem}
          AttendCountItem={AttendCountItem}
          EncryptEmail={EncryptEmail}
          afterFlag={afterFlag}
        />
      )}
    </>
  );
};

export default inject(mobxHelper.injectFrom())(
  withRouter(observer(AttendanceModalContainer))
);

