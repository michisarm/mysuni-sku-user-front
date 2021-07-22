import { encryptEmail, findAttendEvent } from '../api/personalBoardApi';
import { setAttendEventItem, setEncryptEmail } from '../store/EventStore';

export async function requestEncryptEmail() {
  encryptEmail('attend_2107').then((result: string) => {
    setEncryptEmail(result);
  });
}
