import { mobxHelper } from '@nara.platform/accent';
import { inject, observer } from 'mobx-react';
import React, { useCallback, useEffect } from 'react';
import { RouteComponentProps, useHistory, withRouter } from 'react-router-dom';
import { requestAttendCount } from '../../service/getAttendCount';
import { requestAttendEvent } from '../../service/getAttendEvent';
import { requestEncryptEmail } from '../../service/getEncryptEmail';
import { saveAttend } from '../../service/saveAttend';
import { useAttendCountItem, useAttendEventItem, useEncryptEmail } from '../../store/EventStore';
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
  const EncryptEmail = useEncryptEmail()

  useEffect(() => {
    if(open) {
      requestAttendEvent()
      requestEncryptEmail()
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
      if(result !== undefined) {
        requestAttendCount(AttendEventItem.id).then(() => {
          requestEncryptEmail()
        })
      }
    })
  }, [AttendEventItem])

return (
  <>
  { EncryptEmail && (
    <AttendanceModal
      open={open}
      setOpen={setOpen}
      handleInputChange={handleInputChange}
      handleSave={handleSave}
      attendClick={attendClick}
      AttendEventItem={AttendEventItem}
      AttendCountItem={AttendCountItem}
      EncryptEmail={EncryptEmail}
    />
  )}
  </>
)
}

export default inject(
  mobxHelper.injectFrom(
  )
)(withRouter(observer(AttendanceModalContainer)));