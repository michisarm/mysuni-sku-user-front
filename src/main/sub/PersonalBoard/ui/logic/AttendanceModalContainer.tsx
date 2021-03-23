import { mobxHelper } from '@nara.platform/accent';
import { inject, observer } from 'mobx-react';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { RouteComponentProps, useHistory, withRouter } from 'react-router-dom';
import { findAttendEvent } from '../../api/personalBoardApi';
import { requestAttendCount } from '../../service/getAttendCount';
import { requestAttendEvent } from '../../service/getAttendEvent';
import { saveAttend } from '../../service/saveAttend';
import { useAttendCountItem, useAttendEventItem } from '../../store/EventStore';
import AttendanceModal from '../view/AttendanceModal';


interface Props extends RouteComponentProps {
  open: boolean;
  setOpen: (state:boolean, type?:string) => void,
}

const AttendanceModalContainer: React.FC<Props> = function LearningObjectivesModalContainer({
  open,
  setOpen
}){
  const AttendEventItem = useAttendEventItem()
  const AttendCountItem = useAttendCountItem()

  useEffect(() => {
    if(open) {
      requestAttendEvent()
    }
  }, [open])

  useEffect(() => {
    if(AttendEventItem === undefined || AttendEventItem.id === "") {
      return
    }
    requestAttendCount(AttendEventItem.id)
  }, [AttendEventItem])

  const handleInputChange = useCallback((name: string, value: any) => {

  }, [])

  const handleSave = useCallback(() => {

  },[])

  const attendClick = useCallback(() => {
    if(AttendEventItem === undefined || AttendEventItem.id === "") {
      return
    }
    saveAttend(AttendEventItem.id).then((result) => {
      // if(result !== undefined) {
        requestAttendCount(AttendEventItem.id)
      // }
    })
  }, [AttendEventItem])

return (
  <AttendanceModal
    open={open}
    setOpen={setOpen}
    handleInputChange={handleInputChange}
    handleSave={handleSave}
    attendClick={attendClick}
    AttendEventItem={AttendEventItem}
    AttendCountItem={AttendCountItem}
  />
)
}

export default inject(
  mobxHelper.injectFrom(
  )
)(withRouter(observer(AttendanceModalContainer)));