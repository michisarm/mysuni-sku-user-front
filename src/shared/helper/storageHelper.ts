import { getCookie, setCookie, deleteCookie } from '@nara.platform/accent';

// 동영상 close click 시 lectureCardId 가 다르면
// 20200717 video 멀티 시청불가~! = return true
function checkMultiVideo(lectureCardId: any) {
  function nvl(str: any, dvalue: any) {
    if (typeof str === 'undefined' || str === null || str === '') {
      str = dvalue;
    }
    return str;
  }
  const liveLectureCardId = getCookie('liveLectureCardId');
  const term = nvl(getCookie('liveLectureCardIdTime'), 0);
  let rtnLive = false;
  const after2Min = new Date();
  after2Min.setMinutes(after2Min.getMinutes() + 2);
  const nowTime = new Date().getTime();
  // console.log('1.lectureCardId', lectureCardId);
  // console.log('1.liveLectureCardId', liveLectureCardId);
  if (
    nvl(liveLectureCardId, 0) === 0 ||
    liveLectureCardId === lectureCardId ||
    (liveLectureCardId !== lectureCardId && term < nowTime)
  ) {
    deleteCookie('liveLectureCardId');
    deleteCookie('liveLectureCardIdTime');
    setCookie('liveLectureCardId', lectureCardId);
    setCookie('liveLectureCardIdTime', after2Min.getTime().toString());
    // console.log('2.local.liveLectureCardId', getCookie('liveLectureCardId'));
    // console.log('2.local.liveLectureCardIdTime', getCookie('liveLectureCardIdTime'));
  } else {
    rtnLive = true;
  }
  return rtnLive;
}

// 동영상 close click 시 lectureCardId 가 같다면
// 20200717 video 멀티 시청불가~! 해제
function deleteMultiVideo(lectureCardId: any) {
  const liveLectureCardId = getCookie('liveLectureCardId');
  // console.log('3.lectureCardId', lectureCardId);
  // console.log('3.liveLectureCardId', liveLectureCardId);
  if (lectureCardId === liveLectureCardId) {
    deleteCookie('liveLectureCardId');
    deleteCookie('liveLectureCardIdTime');
  }
}

export default {
  checkMultiVideo,
  deleteMultiVideo,
};
