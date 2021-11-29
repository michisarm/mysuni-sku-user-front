/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-irregular-whitespace*/
import { mobxHelper, reactAlert } from '@nara.platform/accent';
import { inject, observer } from 'mobx-react';
import moment from 'moment';
import React, { useCallback, useEffect } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { requestcountAttendence } from '../../service/getAttendCount';
import { saveAttend } from '../../service/saveAttend';
import { getAttendEventItem } from '../../store/EventStore';
import { isAfterFlag } from '../../utility/getAfterFlag';
import AttendanceModal from '../view/AttendanceModal';

interface Props extends RouteComponentProps {
  open: boolean;
  setOpen: (state: boolean, type?: string) => void;
}

const AttendanceModalContainer: React.FC<Props> =
  function LearningObjectivesModalContainer({ open, setOpen }) {
    useEffect(() => {
      if (open) {
        requestcountAttendence();
      }
    }, [open]);

    const attendClick = useCallback(() => {
      const attendEventItem = getAttendEventItem();
      if (attendEventItem !== undefined) {
        const isAfterDate = isAfterFlag(attendEventItem.endTime);
        const attendEndDate = moment(attendEventItem.endTime).format(
          'YYYY-MM-DD'
        );
        const popUpEndDate = moment(attendEventItem.popupEndTime).format(
          'YYYY-MM-DD'
        );

        if (isAfterDate) {
          reactAlert({
            title: '알림',
            message: `출석 이벤트가 ${attendEndDate}에 종료 되었습니다. 복권 확인은 ${popUpEndDate}까지 가능합니다.`,
          });
          return;
        }

        saveAttend(attendEventItem.id).then((result) => {
          if (result !== undefined) {
            requestcountAttendence();
          }
        });
      }
    }, []);

    return (
      <AttendanceModal
        open={open}
        setOpen={setOpen}
        attendClick={attendClick}
      />
    );
  };

export default inject(mobxHelper.injectFrom())(
  withRouter(observer(AttendanceModalContainer))
);
