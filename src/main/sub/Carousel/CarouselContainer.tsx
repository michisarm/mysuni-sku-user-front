
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import CarouselWrapperView from './CarouselWrapperView';
import CarouselItemView from './CarouselItemView';


const mock = [
  { title: '구성원을 위한 자기주도학습\n플랫폼 ‘mySUNI’에 오신 여러분\n환영합니다.', content: '안녕하세요! “mySUNI”입니다. 친근하게 애칭처럼 “써니”라고 불러주세요! \n매 주 4시간만 저와 함께 하시면, 여러분에게 놀라운 변화가 생길겁니다.', imageName: 'main_banner_Rolling01.jpg' },
  { title: '\'mySUNI\' 여러분과 함께\n성장하는 플랫폼입니다!', content: '여러분께서 소중한 의견을 주시면, 더 큰 도움이 됩니다!\n향후 컨텐츠는 순차적으로 업데이트 될 예정이며, \n집합교육은 2월 중순부터 신청이 가능합니다.\n또한, 모바일 학습은 2월 말 제공되니 기대하세요^^', imageName: 'main_banner_Rolling02.jpg' },
  // { title: 'Mock title', content: 'Mock content' },
];


interface Props {
}

interface State {
  activeIndex: number,
}

@reactAutobind
@observer
class CarouselContainer extends Component<Props, State> {
  //
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

  render() {
    //
    const { activeIndex } = this.state;
    const items = mock;
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
          (
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
            </div>
          )
        }
      >
        {items.map((item, index) => (
          index === activeIndex && (
            <CarouselItemView
              key={`carousel_item_${index}`}
              title={item.title}
              content={item.content}
              image={item.imageName}
            />
          )
        ))}
      </CarouselWrapperView>
    );
  }
}


export default CarouselContainer;
