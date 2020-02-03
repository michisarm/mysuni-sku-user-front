
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import { Icon } from 'semantic-ui-react';
import mainRoutePaths from 'main/routePaths';
import boardRoutePaths from 'board/routePaths';
import ContentType from '../model/ContentType';
import CarouselWrapperView from '../view/CarouselWrapperView';
import CarouselItemView from '../view/CarouselItemView';


interface Props {
  autoScrolling?: boolean
}

interface State {
  activeIndex: number,
}

@reactAutobind
@observer
class CarouselContainer extends Component<Props, State> {
  //
  static defaultProps = {
    autoScrolling: false,
  };

  AUTO_NEXT_TIME = 30 * 1000;

  banners = [
    {
      type: ContentType.ExternalWindowVideo,
      title: <>구성원을 위한 자기주도학습 플랫폼<br />&#39;mySUNI&#39;에 오신 여러분 환영합니다.</>,
      description: (
        <>
          안녕하세요! &quot;mySUNI&quot;입니다.<br />
          친근하게 애칭처럼 &quot;써니&quot;라고 불러주세요!<br />
          매 주 4시간만 저와 함께 하시면, 여러분에게 놀라운 일이 생길 것이에요~<br />
          <span className="link-tag"><Icon className="arrow right" />mySUNI 소개보기</span>
        </>
      ),
      link: mainRoutePaths.introductionMySuni(),
      imageUrl: '/images/all/img_banner_01.jpg',
      mediaUrl: 'https://sku.ap.panopto.com/Panopto/Pages/BrowserNotSupported.aspx?continue=true&ReturnUrl=%2FPanopto%2FPages%2FEmbed.aspx%3Fid%3D9958d963-4a7f-4c95-810f-ab44004a786a%26offerviewer%3Dfalse%26showtitle%3Dfalse%26showbrand%3Dfalse%26interactivity%3Dfalse',
    },
    {
      type: ContentType.FileDownload,
      title: <>시스템 기획자가 알려주는<br />&#39;mySUNI&#39; 100% 활용하기!</>,
      description: (
        <>
          On-line Contents를 중심으로 Open하여 2월 중순 집합교육을 제공하고,<br />
          2월 말 모바일 학습 기능을 제공할 예정입니다.<br />
          써니는 여러분과 같이 계속 성장하는 플랫폼입니다. 기대해주세요^^<br />
          <span className="link-tag"><Icon className="arrow right" />매뉴얼 다운로드</span>
        </>
      ),
      imageUrl: '/images/all/img_banner_02.png',
      mediaUrl: 'https://mysuni.sk.com/profile/commondocs/mySUNI_User_Manual_v1_2020115.pdf',
    },
    {
      type: ContentType.ExternalWindowVideo,
      title: <>&#39;mySUNI&#39;를 통한 AI/DT 역량 근육!<br />어떻게 기르나요?<br />최적의 학습 경로! 써니가 추천합니다!</>,
      description: (
        <>
           어떤 과정부터 학습해야 할지 막막하신가요?<br />
           Target 역량에 따른 학습추천~!<br />
           써니가 제안합니다!<br />
        </>
      ),
      link: boardRoutePaths.supportNoticePost('NTC-000033'),
      imageUrl: '/images/all/img_banner_03.jpg',
      mediaUrl: 'https://sku.ap.panopto.com/Panopto/Pages/BrowserNotSupported.aspx?continue=true&returnurl=%2FPanopto%2FPages%2FEmbed.aspx%3Fid%3D917b4b5d-f487-4a84-ae05-ab4a0018d159%26offerviewer%3Dfalse%26showtitle%3Dfalse%26interactivity%3Dfalse%26showbrand%3Dfalse',
    },
    {
      type: ContentType.LinkContent,
      title: <>SK 구성원 이라면 반드시 들어야 할<br /> 핵•인•싸 (공통 권장)과정 60시간</>,
      description: (
        <>
          AI, DT 등 Future Tech 학습 과정 33시간,<br />
          SK행복경영을 더 깊이 이해 할 수 있는 학습 과정 12시간,<br />
          BM혁신을 도와주는 학습 과정 12시간, 약 60시간!<br />
          총 20개 Course 부터! SUNI Stamp에 도전해보세요~!!!
        </>
      ),
      link: boardRoutePaths.supportNoticePost('NTC-00002r'),
      imageUrl: '/images/all/img_banner_04.png',
    },
  ];

  intervalId = 0;

  state = {
    activeIndex: 0,
  };


  componentDidMount() {
    //
    this.setAutoScrolling();
  }

  componentWillUnmount(): void {
    //
    if (this.intervalId) {
      clearInterval(this.intervalId as any);
    }
  }

  setAutoScrolling() {
    //
    const { autoScrolling } = this.props;

    if (autoScrolling) {
      this.intervalId = setInterval(this.nextBanner, this.AUTO_NEXT_TIME) as any;
    }
  }

  nextBanner() {
    //
    this.setState((state) => {
      //
      const nextIndex = state.activeIndex + 1;

      return {
        activeIndex: this.banners.length <= nextIndex ? 0 : nextIndex,
      };
    });
  }

  onClickPrev() {
    //
    this.setState((prevState) => ({
      activeIndex: prevState.activeIndex - 1,
    }));
  }

  onClickNext() {
    //
    this.setState((prevState) => ({
      activeIndex: prevState.activeIndex + 1,
    }));
  }

  onClickPage(activeIndex: number) {
    this.setState({ activeIndex });
  }

  render() {
    //
    const { activeIndex } = this.state;
    const items = this.banners;
    const isFirst = activeIndex === 0;
    const isLast = activeIndex === items.length - 1;

    return (
      <CarouselWrapperView
        actions={
          <>
            <button className={`swiper-button-prev ${isFirst ? 'swiper-button-disabled' : ''}`} disabled={isFirst} onClick={this.onClickPrev} />
            <button className={`swiper-button-next ${isLast ? 'swiper-button-disabled' : ''}`} disabled={isLast} onClick={this.onClickNext} />
          </>
        }
        pages={
          <div className="swiper-pagination swiper-pagination-clickable swiper-pagination-bullets">
            {items.map((item, index) =>
              <button
                key={`carousel-${index}`}
                className={`swiper-pagination-bullet ${activeIndex === index && 'swiper-pagination-bullet-active'}`}
                aria-label={`Goto slide ${index + 1}`}
                onClick={() => this.onClickPage(index)}
              />
            )}
          </div>
        }
      >
        {items.map((item: any, index) => (
          index === activeIndex && (
            <CarouselItemView
              key={`carousel_item_${index}`}
              type={item.type}
              title={item.title}
              description={item.description}
              link={item.link}
              mediaUrl={item.mediaUrl}
              imageUrl={item.imageUrl}
            />
          )
        ))}
      </CarouselWrapperView>
    );
  }
}


export default CarouselContainer;
