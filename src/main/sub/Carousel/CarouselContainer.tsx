
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import depot, { DepotFileViewModel } from '@nara.drama/depot';
import { observer } from 'mobx-react';

import CarouselWrapperView from './CarouselWrapperView';
import CarouselItemView from './CarouselItemView';


interface Props {
}

interface State {
  activeIndex: number,
}

@reactAutobind
@observer
class CarouselContainer extends Component<Props, State> {
  //
  banners = [
    {
      title: <>구성원을 위한 자기주도학습 플랫폼<br />&#39;mySUNI&#39;에 오신 여러분 환영합니다.</>,
      description: (
        <>
          안녕하세요! &quot;mySUNI&quot;입니다.<br />
          친근하게 애칭처럼 &quot;써니&quot;라고 불러주세요!<br />
          매 주 4시간만 저와 함께 하시면,<br />
          여러분에게 놀라운 일이 생길 것이에요~
        </>
      ),
      content: (
        <a href="">
          <div className="panopto">
            <iframe
              title="video type"
              src="https://sku.ap.panopto.com/Panopto/Pages/BrowserNotSupported.aspx?continue=true&ReturnUrl=%2FPanopto%2FPages%2FEmbed.aspx%3Fid%3D61add621-ef7f-4348-82ff-ab43004266f6"
              width="600"
              height="420"
              style={{ padding: '0px', border: '0px' }}
              frameBorder="0"
              allowFullScreen
              // offerviewer={false}
              // allow="autoplay"
            />
          </div>
          {/*<Image src='/images/all/main_banner_Rolling01.jpg' alt=''/>*/}
        </a>
      ),
    },
    {
      title: <>시스템 기획자가 알려주는<br />&#39;mySUNI&#39; 100% 활용하기!</>,
      description: (
        <>
          On-line Contents를 중심으로 Open하여 2월 중순 집합교육을 제공하고,<br />
          2월 말 모바일 학습 기능을 제공할 예정입니다.<br />
          써니는 여러분과 같이 계속 성장하는 플랫폼입니다. 기대해주세요^^<br />
          <a onClick={this.onDownloadManual}> 메뉴얼 다운로드</a>
        </>
      ),
      imageName: '/images/all/img_banner_02.png',
    },
    {
      title: <>SK 구성원 이라면 반드시 들어야 할<br /> 핵•인•싸 (공통 권장)과정 60시간</>,
      description: (
        <>
          AI, DT 등 Future Tech 학습 과정 32시간,<br />
          SK행복경영을 더 깊이 이해 할 수 있는 과정 16시간,<br />
          BM혁신을 도와주는 과정 12시간, 총 14개 Course로<br />
          제일 먼저 SUNI Stamp에 도전해보세요~!!(메인페이지 필수과정에서 확인)
        </>
      ),
      imageName: '/images/all/img_banner_03_a.png',
      link: '/board/support/notice-detail/NTC-00002r',
    },
  ];

  state = {
    activeIndex: 0,
  };


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

  async onDownloadManual() {
    //
    const depotFile: any = await depot.getDepotFiles('dn-3', true);

    if (depotFile) {
      depot.downloadDepotFile(depotFile.id);
    }
    else {
      console.warn('[mySUNI] 매뉴얼 파일이 없습니다.');
    }
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
            <button
              className={`swiper-pagination-bullet ${activeIndex === 0 && 'swiper-pagination-bullet-active'}`}
              aria-label="Go to slide 1"
              onClick={() => this.onClickPage(0)}
            />
            <button
              className={`swiper-pagination-bullet ${activeIndex === 1 && 'swiper-pagination-bullet-active'}`}
              aria-label="Go to slide 2"
              onClick={() => this.onClickPage(1)}
            />
            <button
              className={`swiper-pagination-bullet ${activeIndex === 2 && 'swiper-pagination-bullet-active'}`}
              aria-label="Go to slide 3"
              onClick={() => this.onClickPage(2)}
            />
          </div>
        }
      >
        {items.map((item: any, index) => (
          index === activeIndex && (
            <CarouselItemView
              key={`carousel_item_${index}`}
              title={item.title}
              description={item.description}
              image={item.imageName}
              content={item.content}
              link={item.link}
            />
          )
        ))}
      </CarouselWrapperView>
    );
  }
}


export default CarouselContainer;
