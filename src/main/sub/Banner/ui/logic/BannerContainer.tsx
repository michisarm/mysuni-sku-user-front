
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';

import Swiper from 'react-id-swiper';
import { Segment, Image } from 'semantic-ui-react';


@reactAutobind
class BannerContainer extends Component {
  //
  swiperProps = {
    className: 'swiper-container',
    effect: 'fade',
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  };

  render() {
    //
    return (
      <div className="middle-swiper">
        <Segment className="full">
          <div className="swiper-test swiper-section type2">

            <Swiper {...this.swiperProps}>
              <div className="swiper-slide">
                <div
                  style={{
                    display: 'block',
                    width: '100%',
                    height: '240px',
                    background: '#333',
                    color: '#fff',
                  }}
                >
                  <Image src={`${process.env.PUBLIC_URL}/images/all/img-promotion.jpg`} alt="Promotion" />
                </div>
              </div>
            </Swiper>
          </div>
        </Segment>
      </div>
    );
  }
}

export default BannerContainer;
