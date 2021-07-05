import { findAttendEvent } from '../api/personalBoardApi';
import { setAttendEventItem } from '../store/EventStore';
import AttendEvent from '../viewModel/AttendEvent';

export async function requestAttendEvent() {
  findAttendEvent().then((result?: AttendEvent) => {
    if (result !== undefined) {
      setAttendEventItem({ ...result });
    }
  });
}
