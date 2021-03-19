import { mobxHelper } from '@nara.platform/accent';
import { inject, observer } from 'mobx-react';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { RouteComponentProps, useHistory, withRouter } from 'react-router-dom';
import { findAttendEvent } from '../../api/personalBoardApi';
import { requestAttendCount } from '../../service/getAttendCount';
import { requestAttendEvent } from '../../service/getAttendEvent';
import { useAttendEventItem } from '../../store/EventStore';
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

  useEffect(() => {
    console.log('useEffect')
    console.log('open', open)
    if(open) {
      requestAttendEvent()
    }
  }, [open])

  useEffect(() => {
    console.log('AttendEventItem', AttendEventItem)
    if(AttendEventItem === undefined || AttendEventItem.id === "") {
      return
    }
    console.log('111111111')
    requestAttendCount(AttendEventItem.id)
  }, [AttendEventItem])

  const handleInputChange = useCallback((name: string, value: any) => {

  }, [])

  const handleSave = useCallback(() => {

  },[])

return (
  <AttendanceModal
    open={open}
    setOpen={setOpen}
    handleInputChange={handleInputChange}
    handleSave={handleSave}
  />
)
}

export default inject(
  mobxHelper.injectFrom(
  )
)(withRouter(observer(AttendanceModalContainer)));