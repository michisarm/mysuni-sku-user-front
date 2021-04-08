import { encryptEmail, findAttendEvent } from '../api/personalBoardApi';
import { setAttendEventItem, setEncryptEmail } from '../store/EventStore';

export async function requestEncryptEmail() {
  encryptEmail().then((result: string) => {
    setEncryptEmail(result)
  })
}
