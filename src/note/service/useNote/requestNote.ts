import {
  findNoteList,
  findNoteById,
  findCubeList,
  findAllCollege
} from '../../api/noteApi';
import { setNote } from '../../store/NoteStore';
import { SearchBox } from '../../model/SearchBox';
import { setNoteList } from '../../store/NoteListStore';
import { OffsetElementList } from '@nara.platform/accent';
import Note from '../../model/Note';

export function requestNote(noteId: string) {
  findNoteById(noteId).then(async result => {
    if (result) {
      setNote(result);
    }
  });
}

// export function requestNoteList(searchBox: SearchBox) {
export function requestNoteList(
  cardId: string,
  cubeId: string,
  limit: string,
  offset: string,) {
  return findNoteList(cardId, cubeId, limit, offset).then(async result => {
    if (result) {
      // setNoteList(result);
      return result;
    }
  });
}

export function requestCubeList(searchBox: SearchBox) {
  findCubeList(searchBox).then(async result => {
    if (result) {
      // note or cube 명칭 정리
      setNoteList(result);
    }
  });
}

export function requestColleges() {
  return findAllCollege().then(async result => {
    if (result) {
      // note or cube 명칭 정리
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
