import { getAttend } from '../api/personalBoardApi';
import { setAttendCountItem } from '../store/EventStore';

export async function requestAttendCount(id: string) {
  getAttend(id).then((result: any) => {
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
    setAttendCountItem([...result])
  })
}
