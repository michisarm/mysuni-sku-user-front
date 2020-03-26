
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

  AUTO_NEXT_TIME = 5 * 1000;

  banners = [
    {
      type: ContentType.LinkContent,
      title: <>소소하지만 확실한 행복을 잡아라 ~<br />mySUNI가 드리는 플러스 알파&#44;<br />Life Style OPEN!</>,
      description: (
        <>
          일상의 소소한 즐거움을 찾고&#44; 행복을 느낄 수 있는<br />
          다양한 분야&#40;영상제작&#44; 미술&#44; Cooking&#44; 글쓰기 등&#41;의<br />
          콘텐츠가 여러분을 찾아 갑니다&#46;<br />
        </>
      ),
      link: '/lecture/college/CLG0001a/channels/pages/1',
      imageUrl: '/images/all/img_banner_lifestyle_20200322.png',
    },
    {
      type: ContentType.LinkContent,
      title: <>mySUNI mobile Open!!</>,
      description: (
        <>
          많이 기다리셨죠&#63; mySUNI mobile 설치하세요.<br />
          하나&#44; 쉬운 접속&#33;&#40;mobile SK스토어을 통해 App다운&#47;실행&#41;<br />
          둘&#44; 편리한 사용&#33;&#40;Web보다 간결한 UI&#41;<br />
          셋&#44; 언제 어디서나 학습&#33;&#40;출&#47;퇴근 길&#44; 짬날 때&#41;<br />
        </>
      ),
      link: boardRoutePaths.supportNoticePost('NTC-000037'),
      imageUrl: '/images/all/img_banner_06.jpg',
    },
    {
      type: ContentType.LinkContent,
      title: <>SKMS 알아보기</>,
      description: (
        <>
          2020년 2월 18일 우리 앞에 새롭게 선보인 New SKMS&#46;<br />
          우리는 누구인지, 우리가 믿는 것은 무엇이며&#44;<br />
          우리의 믿음을 어떻게 구현할지를 알아봅니다&#46;<br />
          <i>
          &#35;개정 취지 &#35;구성원 &#35;행복 &#35;사회적 가치
          &#35;VWBE &#35;SK와 SKMS &#35;경영철학 &#35;실행원리
          </i>
        </>
      ),

      link: '/lecture/college/CLG00017/channel/CHN0004q',
      imageUrl: '/images/all/img_banner_07.jpg',
    },
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
      type: ContentType.LinkContent,
      title: <>CES 2020의 핵심 트렌드를<br />&#8220;전지적 SK시점&#8221;으로 정리한<br />&#060;CES 2020 치트 키&#062;</>,
      description: (
        <>
          <b>#1. 찐 리뷰 – 10분 순삭!! &#39;CES 2020 핵심&#39; 정리★</b><br />
          #2. 구성원 &#39;편애&#39;리뷰 – SK 전시관 기획ᆞ운영자들의 &#39;편애&#39; 가득한 리뷰 Show<br />
          #3. SK 반, CES 반 – &#39;짬&#39;에서 나오는 리더들의 리뷰!<br />
          #4. 성큼 다가온 AI everywhere 시대! SK의 AI는 어디쯤 와있을까?
        </>
      ),

      link: '/lecture/cineroom/ne1-m2-c2/college/CLG00001/cube/CUBE-79n/lecture-card/LECTURE-CARD-55i',
      imageUrl: '/images/all/img_banner_05.jpg',
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
    /*
    // by JSM
    {
      type: ContentType.LinkContent,
      title: <>좋아하는 채널 변경 화면으로 이동</>,
      description: (
        <>
          Change my favorite channel!!!
        </>
      ),
      link: '/favorite/channel',
      imageUrl: '',
    },
    */

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
