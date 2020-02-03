
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { Segment } from 'semantic-ui-react';


interface Props {
  children: React.ReactNode,
  actions: React.ReactNode,
  pages: React.ReactNode,
}

@reactAutobind
class CarouselWrapperView extends Component<Props> {
  //
  render() {
    //
    const { actions, children, pages } = this.props;

    return (
      <div className="top-swiper">
        <Segment className="full">
          {/* .swiper-section .type1 */}
          <div className="swiper-section type1">
            {/* Swiper */}
            <div className="swiper-container">
              <div className="swiper-wrapper">
                {children}
              </div>

              {/* Add Arrows */}
              {actions}
              {pages}

              {/* Add Pagination */}
              <div className="swiper-pagination" />
            </div>
          </div>
          {/* .swiper-section .type1 */}
        </Segment>
      </div>
    );
  }
}

export default CarouselWrapperView;
