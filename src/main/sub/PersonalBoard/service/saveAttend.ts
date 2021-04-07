import { updateAttend } from "../api/personalBoardApi"

export function saveAttend(id: string) {
  // const param = getLearningObjectivesItem()
  return updateAttend(id).then((result) => {
    console.log('result', result)
    return result
    // requestAttend()
    //출석 후 출석 데이터 초기화?
  })
}