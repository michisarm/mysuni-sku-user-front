import React, { useCallback, useState } from 'react';
import Image from '../../../../../shared/components/Image';
import { requestTempTopBanner } from '../../service/useRequestTopBanner';

export function TempTopBannerContainer() {
  const bannerData = {
    imageUrl:
      'https://image.mysuni.sk.com/suni-asset/public/images/all/event-choosoo-banner.png',
    backGroundColor: '#984AEE',
  };
  const [openTopBanner, setOpenTopBanner] = useState<boolean>(true);
  const onClickClose = useCallback(() => {
    setOpenTopBanner(false);
  }, [setOpenTopBanner]);

  const displayTopBanner = openTopBanner && bannerData && bannerData.imageUrl;

  const onClickBanner = async () => {
    const encryptValue = await requestTempTopBanner();
    if (encryptValue) {
      window.open(
        `https://mysuni-giftevent.live04-tester.kr/Auth/Index?q=${encryptValue}`,
        '_blank'
      );
    } else {
      window.open(
        'https://mysuni-giftevent.live04-tester.kr/Auth/Index?q=Hm1WQe/vpFhsI3QWn872MPT6c2fnSqaI4DEDYd22bt0=',
        '_blank'
      );
    }
  };

  return (
    <>
      {displayTopBanner && (
        <TopBannerView
          imageUrl={bannerData.imageUrl}
          backgroundColor={bannerData.backGroundColor}
          onClickBanner={onClickBanner}
          onClose={onClickClose}
        />
      )}
    </>
  );
}

interface TopBannerViewProps {
  imageUrl: string;
  backgroundColor: string;
  onClickBanner: () => void;
  onClose: () => void;
}

export function TopBannerView({
  imageUrl,
  backgroundColor,
  onClickBanner,
  onClose,
}: TopBannerViewProps) {
  return (
    <section className="top_banner" style={{ background: backgroundColor }}>
      <div className="inner">
        <a onClick={onClickBanner}>
          <Image src={imageUrl} />
        </a>
        <button className="ui button b_close" onClick={onClose}>
          <img
            className="ui image"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeBAMAAADJHrORAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAtUExURUdwTP////////////////////////////////////////b29lpaWiUlJdPT040VmdsAAAAKdFJOUwDqiFPZCHa/PKhgsmw2AAAArElEQVQY02NgAIGmEkF3DQYYYE1cBQJiAVC+4SoIEIZwmVbBgAKYPwvOX4kqDVFghcRfDDRcCom/MICBDUit2wUkVr8CEgkMjEDy7WkgsecekBBg6AIx7+xatfosSHAFgxZIKZANElu1ahFD1Sqwgt1g6VXLGbxWgRWcAUuvWsIAsW7P3dMQCzH46OrRzUO3D9096O5F9w+6f9HDAyO80MMTI7zR4wMjvpDjEwCjU+prGKKtcwAAAABJRU5ErkJggg=="
            alt="닫기"
          />
        </button>
      </div>
    </section>
  );
}
