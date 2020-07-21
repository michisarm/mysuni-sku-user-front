
import { axiosApi } from '@nara.platform/accent';
import BannerModel from '../../model/BannerModel';


// by JSM
class BannerApi {
  //
  static instance: BannerApi;

  baseUrl = process.env.REACT_APP_ENVIRONMENT === undefined || process.env.REACT_APP_ENVIRONMENT === 'server' ||
            process.env.REACT_APP_ARRANGE_API === undefined || process.env.REACT_APP_ARRANGE_API === '' ?
    '/api/arrange' : process.env.REACT_APP_ARRANGE_API;

  /*
  respBanner: BannerModel = new BannerModel({
    'code': '200',     // 응답 코드
    'message': 'banner list',   // 응답 메시지
    'id': 0,           //
    'language': 0,     //
    'area': 0,         //
    'company': 0,      //
    'originId': 0,     //
    'startDate': '',   //
    'endDate': '',     //
    'state': '',       //
    'name': '',        //
    'intervalTime': 3, // 배너 인터벌 타임 (초)
    'isUse': '',       //
    'creatorId': '',   // 생성자 이메일
    'creatorName': '', // 생성자 이름
    'creationTime': '',// 생성일
    'totalCount': 5,   // 검색된 배너 총 개수
    'bannerList': [
      {
        'id': 0,             // 배너 고유 식별 ID
        'language': 1,       // 적용되어 있는 배너의 언어
        'originId': 0,       // 최초 작성시 현재 배너의 ID이며, 수정 시 수정전 ID
        'name': 'mySUNI 고도화 오픈 안내 및 주요 핵심 사항 전달',
        'imageUrl': '/images/all/img-promotion.jpg',
        'imageAlt': 'alt 설명',
        'targetUrl': 'http',  //mysuni.sk.com',
        'target': '_blank',
        'imageVersion': '',   // 이미지 버전 0': base64, 1': url
        'isUse': '',          // 사용 유무 0': 사용안함, 1': 사용
        'creatorId': '',      // 생성자 이메일
        'creatorName': '',    // 생성자 이름
        'creationTime': '',   // 생성일
      },
      {
        'id': 1,             // 배너 고유 식별 ID
        'language': 1,       // 적용되어 있는 배너의 언어
        'originId': 1,       // 최초 작성시 현재 배너의 ID이며, 수정 시 수정전 ID
        'name': 'mySUNI 고도화 오픈 안내 및 주요 핵심 사항 전달',
        'imageUrl': '/images/all/img-promotion-02.jpg',
        'imageAlt': 'alt 설명',
        'targetUrl': 'https://mysuni.sk.com/suni-main/lecture/college/CLG00001/channels/pages/1',
        'target': '_self',
        'imageVersion': '',   // 이미지 버전 0: base64, 1: url
        'isUse': '',          // 사용 유무 0: 사용안함, 1: 사용
        'creatorId': '',      // 생성자 이메일
        'creatorName': '',    // 생성자 이름
        'creationTime': '',  // 생성일
      },
      {
        'id': 2,             // 배너 고유 식별 ID
        'language': 1,       // 적용되어 있는 배너의 언어
        'originId': 2,       // 최초 작성시 현재 배너의 ID이며, 수정 시 수정전 ID
        'name': 'mySUNI 고도화 오픈 안내 및 주요 핵심 사항 전달',
        'imageUrl': '/images/all/img-promotion.jpg',
        'imageAlt': 'alt 설명',
        'targetUrl': 'http://mysuni.sk.com',
        'target': 'video',
        'imageVersion': '',   // 이미지 버전 0: base64, 1: url
        'isUse': '',          // 사용 유무 0: 사용안함, 1: 사용
        'creatorId': '',      // 생성자 이메일
        'creatorName': '',    // 생성자 이름
        'creationTime': '',  // 생성일
      },
      {
        'id': 3,             // 배너 고유 식별 ID
        'language': 1,       // 적용되어 있는 배너의 언어
        'originId': 3,       // 최초 작성시 현재 배너의 ID이며, 수정 시 수정전 ID
        'name': 'mySUNI 고도화 오픈 안내 및 주요 핵심 사항 전달',
        'imageUrl': '/images/all/img-promotion-02.jpg',
        'imageAlt': 'alt 설명',
        'targetUrl': 'https://mysuni.sk.com/suni-main/lecture/college/CLG00001/channels/pages/1',
        'target': 'popup',
        'imageVersion': '',   // 이미지 버전 0: base64, 1: url
        'isUse': '',          // 사용 유무 0: 사용안함, 1: 사용
        'creatorId': '',      // 생성자 이메일
        'creatorName': '',    // 생성자 이름
        'creationTime': '',  // 생성일
      },
      {
        'id': 4,             // 배너 고유 식별 ID
        'language': 1,       // 적용되어 있는 배너의 언어
        'originId': 4,       // 최초 작성시 현재 배너의 ID이며, 수정 시 수정전 ID
        'name': 'mySUNI 고도화 오픈 안내 및 주요 핵심 사항 전달',
        'imageUrl': 'https://mysuni.sk.com/profile/photo/skcc/05503.jpg',
        'imageAlt': 'alt 설명',
        'targetUrl': 'http://mysuni.sk.com',
        'target': '_blank',
        'imageVersion': '',   // 이미지 버전 0: base64, 1: url
        'isUse': '',          // 사용 유무 0: 사용안함, 1: 사용
        'creatorId': '',      // 생성자 이메일
        'creatorName': '',    // 생성자 이름
        'creationTime': '',  // 생성일
      },
    ]
  });
  */

  findShowingBanners(company: string | undefined) {
    //
    const params = {
      company,
    };

    return axiosApi.get<BannerModel>(this.baseUrl + '/arranges/banners', {params})
      .then(response => response && response.data &&
        response.data.bannerList.length > 0 && new BannerModel(response.data) || null);
  }
}

BannerApi.instance = new BannerApi();

export default BannerApi;
