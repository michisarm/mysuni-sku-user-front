import React, { useEffect, useState } from 'react';
import { inject, observer } from 'mobx-react';
import { mobxHelper } from '@nara.platform/accent';
import Swiper from 'react-id-swiper';
import { Image } from 'semantic-ui-react';
import { MainBannerWrapper } from '../MyLearningContentElementsView';
import { BannerService } from '../../../../shared/stores';
import MainBannerModal from './MainBannerModal';

enum AnchorTargetType {
  self = '_self',
  blank = '_blank',
  popup = 'popup',
  video = 'video'
}

interface Props {
  bannerService?: BannerService,
}


const MainBanner : React.FC<Props> = (Props) => {
  //
  const { bannerService } = Props;
  const { banners, intervalTime } = bannerService!;

  const DEFAULT_BANNER_INTERVAL = 7000;


  // myTrainingService 변경  실행
  useEffect(() => {
    getShowingBanners();
  }, [setInterval]);

  const getShowingBanners = async () => {
    //
    bannerService!.clear();
    bannerService!.findShowingBanners();
  };

  const params = {
    loop: false,
    effect: 'fade',
    autoplay: {
      delay: DEFAULT_BANNER_INTERVAL,
      disableOnInteraction: false
    },
    pagination: {
      el: '.navi .swiper-pagination',
      clickable: true
    },
    navigation: {
      prevEl: '.navi .swiper-button-prev',
      nextEl: '.navi .swiper-button-next'
    }
  };

  const [ clickedBanner, setClickedBanner ] = useState({
    targetUrl: '',
    target: '',
    name: '',
    modalOpen: false
  });

  // 클릭한 배너 정보
  const onClickBanner = (targetUrl:string, target:string, name:string) => {

    const modalOpen = ( target === AnchorTargetType.popup || target === AnchorTargetType.video ) ? true : false;

    setClickedBanner({
      ...clickedBanner,
      targetUrl,
      target,
      name,
      modalOpen
    });
  };

  // 배너 모달 닫기 시 state 초기화
  const onCloseBannerModal = () => {
    setClickedBanner({
      ...clickedBanner,
      targetUrl: '',
      target: '',
      name: '',
      modalOpen: false
    });
  };


  return (
    banners.length > 0 ?
      <MainBannerWrapper>
        <div hidden={true}>{(params.autoplay.delay = intervalTime * 1000)}</div>
        <Swiper {...params}>
          { banners.map( (banner, index) => (
            <div className="swiper-slide" key={`main-banner-${index}`}>
              <Image
                src={banner.imageUrl}
                alt={banner.imageAlt}
                title={banner.name}
                as="a"
                target={banner.target}
                href={
                  (banner.target === AnchorTargetType.blank || banner.target === AnchorTargetType.self ) ?
                    banner.targetUrl
                    :
                    undefined
                }
                onClick={()=> onClickBanner(banner.targetUrl, banner.target, banner.name)}
              />
            </div>
          ))}
        </Swiper>

        <div className="navi">
          <div className="swiper-button-prev"/>
          <div className="swiper-pagination"/>
          <div className="swiper-button-next"/>
        </div>

        { clickedBanner.modalOpen &&
          <MainBannerModal includeUrl={clickedBanner.targetUrl} bannerTitle={clickedBanner.name} modalOpen={clickedBanner.modalOpen} onClose={onCloseBannerModal}/>
        }

      </MainBannerWrapper>
      :
      null
  );
};

export default inject(mobxHelper.injectFrom(
  'shared.bannerService',
))(observer(MainBanner));
