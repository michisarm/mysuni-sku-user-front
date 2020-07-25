
import { decorate, observable } from 'mobx';


class BannerModel {
  //
  /*
  // code: string = '';        // 응답 코드
  // message: string = '';     // 응답 메시지
  id: number = 0;           //
  language: number = 0;     //
  area: number = 0;         //
  company: number = 0;      //
  originId: number = 0;     //
  startDate: string = '';   //
  endDate: string = '';     //
  state: string = '';       //
  name: string = '';        //
  isUse: string = '';       //
  creatorId: string = '';   // 생성자 이메일
  creatorName: string = ''; // 생성자 이름
  creationTime: string = '';// 생성일
  totalCount: number = 0;   // 검색된 배너 총 개수
  */
  intervalTime: number = 7; // 배너 인터벌 타임 (초)
  results: {             // List<object> : 검색된 배너 목록
    id: number;             // 배너 고유 식별 ID
    language: number;       // 적용되어 있는 배너의 언어
    originId: number;       // 최초 작성시 현재 배너의 ID이며, 수정 시 수정전 ID
    name: string;           // 배너의 제목
    imageUrl: string;       // 배너 이미지 주소
    imageAlt: string;       // 배너의 ALT 내용
    target: string;         // _self, _blank, ...
    targetUrl: string;      // 배너 클릭 시 이동될 주소
    imageVersion: string;   // 이미지 버전 0: base64, 1: url
    isUse: string;          // 사용 유무 0: 사용안함, 1: 사용
    creatorId: string;      // 생성자 이메일
    creatorName: string;    // 생성자 이름
    creationTime: string;   // 생성일
  }[] = [];

  constructor(banner?: BannerModel) {
    if (banner) {
      Object.assign(this, banner);
    }
  }
}

decorate(BannerModel, {
  // totalCount: observable,
  results: observable,
});

export default BannerModel;
