import { encryptEmail } from '../api/personalBoardApi';
import { getAttendEventItem, setEncryptEmail } from '../store/EventStore';

export async function requestEncryptEmail() {
  const attendEvent = getAttendEventItem();
  if (attendEvent !== undefined) {
    const getEnctyptEmail = await encryptEmail(attendEvent.id);
    setEncryptEmail(getEnctyptEmail);
  }
  // encryptEmail('attend_2107').then((result: string) => {
  //   if (!result) {
  //     encryptEmail('attend_2107').then((result: string) => {
  //       setEncryptEmail(result);
  //     });
  //   } else {
  //     setEncryptEmail(result);
  //   }
  // });
}
