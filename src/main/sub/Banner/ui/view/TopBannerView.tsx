import React from 'react';
import Image from '../../../../../shared/components/Image';

interface TopBannerViewProps {
  linkUrl: string;
  imageUrl: string;
  backgroundColor: string;
  onClose: () => void;
}

export function TopBannerView({
  linkUrl,
  imageUrl,
  backgroundColor,
  onClose,
}: TopBannerViewProps) {
  return (
    <section className="top_banner" style={{ background: backgroundColor }}>
      <div className="inner">
        <a href={linkUrl}>
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
