
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import CarouselWrapperView from './CarouselWrapperView';
import CarouselItemView from './CarouselItemView';


const mock = [
  { title: 'What is SUNI ? SUNI Learning Port', content: 'SUNI에서는 모든 사용자들이 특정 분야 최고의 전문가들을 육성해내기 위해 양질의 학습 콘텐츠는 물론 다양한 세미나를 개최하고 참가할 수 있도록 도와주는 차세대 Learning Portal Platform입니다.' },
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
      >
        {items.map((item, index) => (
          index === activeIndex && (
            <CarouselItemView
              key={`carousel_item_${index}`}
              title={item.title}
              content={item.content}
            />
          )
        ))}
      </CarouselWrapperView>
    );
  }
}


export default CarouselContainer;
