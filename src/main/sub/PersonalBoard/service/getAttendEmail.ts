import { encryptEmail } from '../api/personalBoardApi';
import { setEncryptEmail } from '../store/EventStore';

export async function requestEncryptEmail() {
  encryptEmail().then((result: string) => {
    if (!result) {
      encryptEmail().then((result: string) => {
        setEncryptEmail(result)
      })
    } else {
      setEncryptEmail(result)
    }
  })
}
