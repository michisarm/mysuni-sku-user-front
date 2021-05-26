import {
  findNoteList,
  findNoteById,
  findCubeList,
  findAllCollege,
  findNoteCount,
  findNoteExcelList
} from '../../api/noteApi';
import { setNote } from '../../store/NoteStore';
import { SearchBox, getEmptySearchBox } from '../../model/SearchBox';
import { setNoteList, getNoteList } from '../../store/NoteListStore';
import { OffsetElementList } from '@nara.platform/accent';
import Note from '../../model/Note';
import { setNoteCount } from '../../store/NoteCountStore';
import { getSearchBox } from '../../store/SearchBoxStore';
import moment from 'moment';
import { setColleges } from '../../store/CollegesStore';

export function requestNote(noteId: string) {
  findNoteById(noteId).then(async result => {
    if (result) {
      setNote(result);
    }
  });
}

// export function requestNoteList(searchBox: SearchBox) {
export function requestNoteList() {

  const searchBox: SearchBox = getSearchBox() || getEmptySearchBox();

  // return findNoteList(cardId, cubeId, limit, offset).then(async result => {
  return findNoteList(searchBox).then(async result => {

    if (result) {
      // setNoteList(result);
      return result;
    }
  });
}

export function requestCubeList() {
  let searchBox: SearchBox = getSearchBox() || getEmptySearchBox();

  if (searchBox.content === undefined) {
    searchBox = getEmptySearchBox();
  }

  findCubeList(searchBox).then(async result => {
    if (result) {
      // note or cube 명칭 정리
      setNoteList(result);
    }
  });
}

export function requestAppendCubeList() {
  const searchBox: SearchBox = getSearchBox() || getEmptySearchBox();

  findCubeList(searchBox).then(async result => {
    if (result) {
      // note or cube 명칭 정리
      const noteList = getNoteList();
      noteList && setNoteList({ ...noteList, results: noteList?.results.concat(result.results) });
    }
  });
}

export function requestNoteExcelList() {
  return findNoteExcelList().then(async result => {
    if (result) {
      return result;
    }
  });
}

export function requestColleges() {
  return findAllCollege().then(async result => {
    if (result) {
      // note or cube 명칭 정리
      // return result;
      setColleges(result);
    }
  });
}

export function requestNoteCount(flag?: string) {
  let searchBox: SearchBox = getSearchBox() || getEmptySearchBox();

  if (searchBox.createStartDate === undefined) {
    searchBox = getEmptySearchBox();
  }

  return findNoteCount(flag && flag === 'searchBox' ? searchBox : undefined).then(async result => {
    if (result) {
      // setNoteList(result);
      setNoteCount(result);
      return result;
    }
  });
}


// export function requestNote(noteId: string) {
//   findNoteById(noteId).then(async result => {
//     if (result) {
//       setNote(result);
//     }
//   });
// }


// export function requestCommunity(communityId: string) {
//   findCommunityView(communityId).then(async community => {
//     await findNoticePostViews(communityId,'createdTime',0,1,true).then((recentNotice) => { // 공지사항메뉴에 New 표시를 위해 최근 공지 게시글 조회
//       if (community !== undefined && recentNotice !== undefined && recentNotice.results.length > 0) {
//         community.lastNoticePostTime = recentNotice?.results[0].createdTime;
//       }
//     });
//     const communityHome = getCommunityHome() || getEmptyCommunityHome();
//     setCommunityHome({ ...communityHome, community });
//   });
// }

// export function requestCommunityMenus(communityId: string) {
//   findMyMenus(communityId).then(menus => {
//     const communityHome = getCommunityHome() || getEmptyCommunityHome();
//     setCommunityHome({
//       ...communityHome,
//       menus: menus === undefined ? [] : menus,
//     });
//   });
// }
