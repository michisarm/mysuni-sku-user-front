import { addLectureNote, getLectureNote } from "../../api/noteApi"
import { setLectureNoteItem } from "../../store/LectureNoteStore"

export async function requestLectureNoteAdd(param: any) {
  //노트 조회 api 호출
  return addLectureNote(param).then((result: any) => {
    if(result) {
      return true
    }
  }
  )
}