import { OffsetElementList } from '@nara.platform/accent';
import NoteWithLecture from '../model/NoteWithLecture';

export default interface NoteWithLectureListItem {
  index: number;
  noteWithLectureList: OffsetElementList<NoteWithLecture>;
}

export function getNoteWithLectureListItem(
  index: number,
  noteWithLectureList: OffsetElementList<NoteWithLecture>
): NoteWithLectureListItem {
  return {
    index,
    noteWithLectureList: {
      results: noteWithLectureList.results.map((m, i) => {
        let count = 0;
        // if (m.note.playTime === 'Note') {
        //   m.note.playTime = `Note ${noteWithLectureList.results.filter(f => f.note.playTime === 'Note').length - count}`;
        //   count++;
        // }
        return m;
      }),
      totalCount: noteWithLectureList.totalCount,
    },
  };
}
