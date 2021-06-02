import { OffsetElementList } from "@nara.platform/accent";
import NoteWithLecture from "../model/NoteWithLecture";

export default interface NoteWithLectureListItem {
  index: number;
  noteWithLectureList: OffsetElementList<NoteWithLecture>
}

export function getNoteWithLectureListItem(index: number, noteWithLectureList: OffsetElementList<NoteWithLecture>): NoteWithLectureListItem {
  return {
    index,
    noteWithLectureList
  };
}