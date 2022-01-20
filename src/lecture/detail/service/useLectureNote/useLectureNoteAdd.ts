import { addLectureNote } from '../../api/noteApi';

export async function requestLectureNoteAdd(param: any) {
  //노트 조회 api 호출
  return addLectureNote(param).then((result: any) => {
    if (result) {
      return true;
    }
  });
}
