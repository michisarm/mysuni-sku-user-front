import { getLectureNote } from '../../api/noteApi';
import {
  setLectureNoteItem,
  setLectureOriginNoteItem,
} from '../../store/LectureNoteStore';
import {
  initLectureNoteItemNote,
  initLectureNoteItemRom,
  initNoteItem,
  noteItem,
} from '../../viewModel/LectureNote';

export async function requestLectureNote(cubeId: string) {
  //노트 조회 api 호출
  getLectureNote(cubeId).then((result) => {
    if (result) {
      const noteItems: noteItem[] = [];

      result.noteContents
        .slice(0)
        .reverse()
        .map((item) => {
          //content enter 처리
          let convertString: string = '';
          const noteItem = initNoteItem();
          const lectureNoteItemRom = initLectureNoteItemRom();
          const lectureNoteItemNote = initLectureNoteItemNote();

          lectureNoteItemRom.cardId = result.cardId;
          lectureNoteItemRom.cardName = result.cardName;
          lectureNoteItemRom.collegeId = result.collegeId;
          lectureNoteItemRom.cubeId = result.cubeId;
          lectureNoteItemRom.cubeName = result.cubeName;

          lectureNoteItemNote.cardId = result.cardId;
          lectureNoteItemNote.collegeId = result.collegeId;
          lectureNoteItemNote.content = result.content;
          lectureNoteItemNote.registeredTime = result.registeredTime;
          lectureNoteItemNote.cubeId = result.cubeId;
          lectureNoteItemNote.cubeType = result.cubeType;
          lectureNoteItemNote.folderId = result.folderId;
          lectureNoteItemNote.id = item.id;
          lectureNoteItemNote.modifiedTime = result.modifiedTime;
          lectureNoteItemNote.type = 'default';
          lectureNoteItemNote.content = item.content;

          const stringArr = item.content.split('\n');
          stringArr.map((splitItem: string) => {
            convertString += '<p>' + splitItem + '</p>';
          });

          noteItem.convertContent = convertString;
          noteItem.type = result.cubeType;

          if (result.cubeType === 'Video' || result.cubeType === 'Audio') {
            lectureNoteItemNote.playTime = item.playSecond || 0;
          }

          noteItem.LectureNoteItemRom = lectureNoteItemRom;
          noteItem.note = lectureNoteItemNote;

          noteItems.push(noteItem);
        });

      if (result.cubeType === 'Video' || result.cubeType === 'Audio') {
        noteItems.sort((a, b) => b.note.playTime - a.note.playTime);
      } else {
        noteItems.sort(
          (a, b) =>
            (b.note.modifiedTime === 0
              ? b.note.registeredTime
              : b.note.modifiedTime) -
            (a.note.modifiedTime === 0
              ? a.note.registeredTime
              : a.note.modifiedTime)
        );
      }

      setLectureNoteItem({
        results: JSON.parse(JSON.stringify(noteItems)),
        totalCount: result.noteContents.length,
      });
      setLectureOriginNoteItem({
        results: JSON.parse(JSON.stringify(noteItems)),
        totalCount: result.noteContents.length,
      });
    }
  });
}
