import { deleteLectureNote } from '../../api/noteApi';

export async function requestLectureNoteDelete(params: any) {
  //노트 조회 api 호출
  return deleteLectureNote(params).then((result: any) => {
    if (result) {
      return true;
    }
  });
}
