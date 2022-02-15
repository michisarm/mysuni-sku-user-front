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
import {
  parsePolyglotString,
  PolyglotString,
} from 'shared/viewmodel/PolyglotString';
import { getDefaultLang, LangSupport } from 'lecture/model/LangSupport';
import { Icon } from 'semantic-ui-react';

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
  bgColor?: string;
  imageAlt: PolyglotString;
  imageUrl: PolyglotString;
  langSupports: LangSupport[];
  onClickBanner: (
    targetUrl: string,
    target: string,
    name: string,
    index: number
  ) => void;
}

// 김민준 메인 배너
function RenderBanner(props: BannerProps) {
  const {
    index,
    imageAlt,
    imageUrl,
    name,
    target,
    targetUrl,
    langSupports,
    onClickBanner,
    bgColor = '#ffffff',
  } = props;

  const getTargetUrl = originSelfPath(targetUrl);

  return (
    <div
      key={`main-banner-${index}`}
      className="swiper-slide"
      style={{ backgroundColor: bgColor }}
    >
      {!/^(http|https)/.test(targetUrl) && target === AnchorTargetType.self ? (
        <Link
          title={name}
          target={target}
          to={{ pathname: getTargetUrl }}
          onClick={() => onClickBanner(targetUrl, target, name, index)}
        >
          <Image
            className="ui image"
            alt={parsePolyglotString(imageAlt, getDefaultLang(langSupports))}
            src={parsePolyglotString(imageUrl, getDefaultLang(langSupports))}
          />
        </Link>
      ) : (
        <>
          {target === AnchorTargetType.blank ||
          target === AnchorTargetType.self ? (
            <a
              title={name}
              target={target}
              href={targetUrl}
              onClick={() => onClickBanner(targetUrl, target, name, index)}
            >
              <Image
                className="ui image"
                alt={parsePolyglotString(
                  imageAlt,
                  getDefaultLang(langSupports)
                )}
                src={parsePolyglotString(
                  imageUrl,
                  getDefaultLang(langSupports)
                )}
              />
            </a>
          ) : (
            <Image
              className="ui image"
              alt={parsePolyglotString(imageAlt, getDefaultLang(langSupports))}
              src={parsePolyglotString(imageUrl, getDefaultLang(langSupports))}
            />
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

const MainBanner: React.FC<Props> = (Props) => {
  const { bannerService } = Props;
  const { banners, intervalTime } = bannerService!;

  // swiper instance
  const [swiper, setSwiper] = useState<any>(null);
  const [play, setPlay] = useState(true); // auto play 기준

  const DEFAULT_BANNER_INTERVAL = 7000;

  useEffect(() => {
    bannerService!.findLatestBannerBundles();

    return () => {
      bannerService!.clear();
    };
  }, [bannerService]);

  const params = {
    loop: false,
    effect: 'slide',
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
    getSwiper: setSwiper,
    speed: 500, // 여기 추가 하시면 될거 같아요
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

  useEffect(() => {
    if (
      swiper !== null &&
      swiper.autoplay !== undefined &&
      typeof swiper === 'object'
    ) {
      if (play) {
        swiper.autoplay.start();
      } else {
        swiper.autoplay.stop();
      }
    }
  }, [swiper, play]);

  const onClickAutoPlayBtn = () => {
    setPlay(!play);
  };

  return banners.length > 0 ? (
    <MainBannerWrapper>
      <div hidden={true}>{(params.autoplay.delay = intervalTime * 1000)}</div>
      <Swiper {...params}>
        {banners.map((banner, index) => (
          <RenderBanner
            key={banner.id}
            index={index}
            onClickBanner={onClickBanner}
            {...banner}
          />
        ))}
      </Swiper>

      <div className="navi">
        <div className="swiper-navi-wrap">
          <div className="swiper-pagination" />
          <div className="btn-play">
            {!play && <Icon name="play" onClick={onClickAutoPlayBtn} />}
            {play && <Icon name="pause" onClick={onClickAutoPlayBtn} />}
          </div>
        </div>
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
