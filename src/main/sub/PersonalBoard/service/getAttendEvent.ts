import { findAttendEvent } from '../api/personalBoardApi';
import { setAttendEventItem } from '../store/EventStore';
import AttendEvent from '../viewModel/AttendEvent';

export async function requestAttendEvent() {
  findAttendEvent().then((result: AttendEvent) => {
    // result = {
    //   'endDateTime': [],
    //   'id': "attend_2104",
    //   'name': '1234',
    //   'startDateTime': [],
    //   useYn: true
    // }
    // console.log('get result', result)
    setAttendEventItem({...result})
  })
}
