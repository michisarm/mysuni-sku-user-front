import { getLectureNote } from "../../api/noteApi"
import { setLectureNoteItem, setLectureOriginNoteItem } from "../../store/LectureNoteStore"

export async function requestLectureNote(cardId: string, cubeId: string) {
  //노트 조회 api 호출
  getLectureNote(cardId, cubeId).then((result: any) => {
    if(result) {
      //content enter 처리
      let convertString: string =''

      result.results.map((item: any) => {
        const stringArr = item.note.content.split("\n")
        stringArr.map((splitItem: string) => {
          convertString += '<p>'+splitItem+'</p>'
        })
        item.note.convertContent = convertString
        item.note.type = 'default'
        convertString = ''
      })

      let number = 1;

      result.results.slice(0).reverse().map((item: any) => {
        if(item.note.cubeType === 'Video' || item.note.cubeType === 'Audio') {
          if (item.note.playTime === 'Note' || item.note.playTime.indexOf('Note') !== -1) {
            if(item.note.playTime === 'Note') {
              item.note.playTime = 'Note '+number
            }
            number++
          } 
        }
      })

      setLectureNoteItem({
        results: JSON.parse(JSON.stringify(result.results)),
        totalCount: result.totalCount
      })
      setLectureOriginNoteItem({
        results: JSON.parse(JSON.stringify(result.results)),
        totalCount: result.totalCount
      })
    }
  }
  )
}