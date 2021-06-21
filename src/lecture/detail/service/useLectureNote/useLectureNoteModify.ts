import { modifyLectureNote } from "../../api/noteApi"

export async function requestLectureNoteModify(id: string, param: any) {
  //노트 조회 api 호출
  return modifyLectureNote(id, param).then((result: any) => {
    if(result) {
      return true
    }
  }
  )
}