import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { mobxHelper } from '@nara.platform/accent';
import Swiper from 'react-id-swiper';
import { MainBannerWrapper } from '../MyLearningContentElementsView';
import { BannerService } from '../../../../shared/stores';
import MainBannerModal from './MainBannerModal';
import { SkProfileService } from '../../../../profile/stores';
import Image from '../../../../shared/components/Image/Image';
import ReactGA from 'react-ga';
import { originSelfPath } from 'tracker-react/utils';

enum AnchorTargetType {
  self = '_self',
  blank = '_blank',
  popup = 'popup',
  video = 'video',
}
interface BannerProps {
  index: number;
  targetUrl: string;
  target: string;
  name: string;
  imageAlt: StaticRange;
  imageUrl: string;
  onClickBanner: (
    targetUrl: string,
    target: string,
    name: string,
    index: number
  ) => void;
}

function RenderBanner(props: BannerProps) {
  const {
    index,
    imageAlt,
    imageUrl,
    name,
    target,
    targetUrl,
    onClickBanner,
  } = props;

  const getTargetUrl = originSelfPath(targetUrl);

  return (
    <div className="swiper-slide" key={`main-banner-${index}`}>
      {!/^(http|https)/.test(targetUrl) && target === AnchorTargetType.self ? (
        <Link
          className="ui image"
          title={name}
          target={target}
          to={{ pathname: getTargetUrl }}
          onClick={() => onClickBanner(targetUrl, target, name, index)}
        >
          <Image alt={imageAlt} src={imageUrl} />
        </Link>
      ) : (
        <>
          {target === AnchorTargetType.blank ||
          target === AnchorTargetType.self ? (
            <a
              className="ui image"
              title={name}
              target={target}
              href={targetUrl}
              onClick={() => onClickBanner(targetUrl, target, name, index)}
            >
              <Image alt={imageAlt} src={imageUrl} />
            </a>
          ) : (
            <div className="ui image">
              <Image alt={imageAlt} src={imageUrl} />
            </div>
          )}
        </>
      )}
    </div>
  );
}

interface Props {
  skProfileService?: SkProfileService;
  bannerService?: BannerService;
}

const MainBanner: React.FC<Props> = Props => {
  const { bannerService } = Props;
  const { banners, intervalTime } = bannerService!;

  const DEFAULT_BANNER_INTERVAL = 7000;

  useEffect(() => {
    bannerService!.findLatestBannerBundles();

    return () => {
      bannerService!.clear();
    };
  }, [bannerService]);

  const params = {
    loop: true,
    //effect: 'fade',
    autoplay: {
      delay: DEFAULT_BANNER_INTERVAL,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.navi .swiper-pagination',
      clickable: true,
    },
    navigation: {
      prevEl: '.navi .swiper-button-prev',
      nextEl: '.navi .swiper-button-next',
    },
  };

  const [clickedBanner, setClickedBanner] = useState({
    targetUrl: '',
    target: '',
    name: '',
    modalOpen: false,
  });

  // 클릭한 배너 정보
  const onClickBanner = (
    targetUrl: string,
    target: string,
    name: string,
    index: number
  ) => {
    console.log('hi', index);

    // react-ga event
    ReactGA.event({
      category: 'Banner',
      action: 'Banner Clicked',
      label: `Banner${index + 1}`,
    });

    const modalOpen =
      target === AnchorTargetType.popup || target === AnchorTargetType.video
        ? true
        : false;

    setClickedBanner({
      ...clickedBanner,
      targetUrl,
      target,
      name,
      modalOpen,
    });
  };

  // 배너 모달 닫기 시 state 초기화
  const onCloseBannerModal = () => {
    setClickedBanner({
      ...clickedBanner,
      targetUrl: '',
      target: '',
      name: '',
      modalOpen: false,
    });
  };

  return banners.length > 0 ? (
    <MainBannerWrapper>
      <div hidden={true}>{(params.autoplay.delay = intervalTime * 1000)}</div>
      <Swiper {...params}>
        {banners.map((banner, index) => (
          <RenderBanner
            index={index}
            onClickBanner={onClickBanner}
            {...banner}
          />
        ))}
      </Swiper>

      <div className="navi">
        <div className="swiper-button-prev" />
        <div className="swiper-pagination" />
        <div className="swiper-button-next" />
      </div>

      {clickedBanner.modalOpen && (
        <MainBannerModal
          includeUrl={clickedBanner.targetUrl}
          bannerTitle={clickedBanner.name}
          modalOpen={clickedBanner.modalOpen}
          onClose={onCloseBannerModal}
        />
      )}
    </MainBannerWrapper>
  ) : null;
};

export default inject(
  mobxHelper.injectFrom('shared.bannerService', 'profile.skProfileService')
)(observer(MainBanner));
