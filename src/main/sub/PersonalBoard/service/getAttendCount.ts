import { getAttend, getCountAttendance } from '../api/personalBoardApi';
import {
  getAttendEventItem,
  setAttendCountItem,
  setCountAttendance,
} from '../store/EventStore';

export async function requestAttendCount() {
  const attendEventItem = getAttendEventItem();

  if (attendEventItem !== undefined) {
    getAttend(attendEventItem.id).then((result: any) => {
      setAttendCountItem([...result]);
    });
  }
}

export async function requestcountAttendence() {
  const attendEventItem = getAttendEventItem();

  if (attendEventItem !== undefined) {
    const countAttendence = await getCountAttendance(attendEventItem.id);

    if (countAttendence !== undefined) {
      setCountAttendance({ ...countAttendence });
    }
  }
}

// result = [
//   {
//     'attendDate': "2021-03-17",
//     'eventId': "attend_2104",
//     'id': 7,
//     'patronKeyString': "2021-03-22",
//     'time': 1616374877069,
//   },
// {
//   'attendDate': "2021-03-18",
//   'eventId': "attend_2104",
//   'id': 8,
//   'patronKeyString': "2021-03-22",
//   'time': 1616374877069,
// },
// {
//   'attendDate': "2021-03-19",
//   'eventId': "attend_2104",
//   'id': 9,
//   'patronKeyString': "2021-03-22",
//   'time': 1616374877069,
// },
// {
//   'attendDate': "2021-03-20",
//   'eventId': "attend_2104",
//   'id': 10,
//   'patronKeyString': "2021-03-22",
//   'time': 1616374877069,
// },
// {
//   'attendDate': "2021-03-21",
//   'eventId': "attend_2104",
//   'id': 11,
//   'patronKeyString': "2021-03-22",
//   'time': 1616374877069,
// },
// {
//   'attendDate': "2021-03-22",
//   'eventId': "attend_2104",
//   'id': 12,
//   'patronKeyString': "2021-03-22",
//   'time': 1616374877069,
// },
// ]
