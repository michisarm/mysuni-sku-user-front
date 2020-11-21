import React,{useEffect} from 'react';
import Swiper from 'react-id-swiper';

import TuStep02_01_img from '../../../../style/media/tu2-step1-img1.png';
import TuStep02_01_04_img from '../../../../style/media/tu2-step1-img4.png';
import TuStep02_01_Point01_img from '../../../../style/media/tu2-step1-point1.png';
import TuStep02_01_Point02_img from '../../../../style/media/tu2-step1-point2.png';
import TuStep02_01_Point03_img from '../../../../style/media/tu2-step1-point3.png';
import TuStep02_01_Point04_img from '../../../../style/media/tu2-step1-point4.png';
import TuStep02_01_Point05_img from '../../../../style/media/tu2-step1-point5.png';
import TuStep02_01_Point06_img from '../../../../style/media/tu2-step1-point6.png';
import TuStep02_02_01_img from '../../../../style/media/tu2-step2-img1.png';
import TuStep02_02_02_img from '../../../../style/media/tu2-step2-img1.png';
import TuStep02_02_Point01_img from '../../../../style/media/tu2-step2-point1.png';
import TuStep02_02_Point02_img from '../../../../style/media/tu2-step2-point2.png';
import TuStep03_01_img from '../../../../style/media/tu3-step-img.png';
import TuStep03_Point01_img from '../../../../style/media/tu3-step-point1.png';
import TuStep03_Point02_img from '../../../../style/media/tu3-step-point2.png';
import TuStep03_Point03_img from '../../../../style/media/tu3-step-point3.png';
import TuStep04_01_img from '../../../../style/media/tu4-img.png';

const tu2Step1Page = ["학습List","선수 과정","학습상세정보","강사정보","관련Badge","관련과정"];
const tu2Step2Page = ["Embedded Player","자막(캡션)"];
const tu3StepPage = ["표형태로 UI변경","전체 혹은 코스만 보기","목록제거 기능"];

export const Tutorial02 = () => {

  const Tu02 = {
    touchRatio: 0,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  }

  const Tu02Step01 = {
    autoplay: {
      delay: 3142,
      disableOnInteraction: true,
    },
    pagination: {
      el: '.tu2-step1-pagination',
      clickable: true,
      renderBullet: (index:number, className:string) => {
        return '<span class="' + className + '"><em>'+ (index+1) +'</em><span>' + tu2Step1Page[index] + '</span></span>';
      }
    },
  }

  const Tu02Step02 = {
    autoplay: {
      delay: 3142,
      disableOnInteraction: true,
    },
    pagination: {
      el: '.tu2-step2-pagination',
      clickable: true,
      renderBullet: (index:number, className:string) => {
        return '<span class="' + className + '"><em>'+ (index+1) +'</em><span>' + tu2Step2Page[index] + '</span></span>';
      }
    },
  }
  
  useEffect(() => {
    const Tu2Step01Pagination = document.querySelector('.tu2-step1-pagination');
    const Tu2Step02Pagination = document.querySelector('.tu2-step2-pagination');

    if(Tu2Step01Pagination){
      Tu2Step01Pagination.classList.add('swiper-sub-pagenation')
    }
    if(Tu2Step02Pagination){
      Tu2Step02Pagination.classList.add('swiper-sub-pagenation')
    }
  },[])

  return (
    <div id="tu2" className="tu-cont">
      {/* <!-- .swiper-section --> */}
      <div className="swiper-section tu2-swiper">
        {/* <!-- Swiper --> */}
        <Swiper {...Tu02}>
          <div className="swiper-slide" >
            <div className="title">
              <div className="tit1">편안하고 효과적인 학습 환경을 지원하는<br />이러닝 방식으로 개편하였습니다.</div>
            </div>
            <div className="tu2-main">
              <ul>
                <li>
                  <dl>
                    <dt>학습 Navigating</dt>
                    <dd>Learning Path에 따라 순서대로 학습하기 편안한<br />직관적인 UI 제공</dd>
                  </dl>
                </li>
                <li>
                  <dl>
                    <dt>다양한 학습방법</dt>
                    <dd>VOD 학습 뿐 아니라 문헌 학습, 토론, 테스트 등<br />다양한 형태의 학습 방식을 유연하게 지원</dd>
                  </dl>
                </li>
                <li>
                  <dl>
                    <dt>학습정보 보강</dt>
                    <dd>과정 Overview, 강의 스크립트, 강사 정보, 관련 Badge,<br />관련 과정 등 다양한 강의 정보 제공</dd>
                  </dl>
                </li>
              </ul>
            </div>
          </div>

          <div className="swiper-slide" >
            <div className="title">
              <div className="tit1">이러닝 페이지는 직관적인 화면 구성으로<br />전체 학습 리스트와 정보를 파악하기에 용이해졌습니다.</div>
            </div>
            <div className="swiper-section swiper-sub tu2-step1" >
              <Swiper {...Tu02Step01}>
                <div className="swiper-slide">
                  <div className="sub-img tu2-step1-1">
                    <img src={TuStep02_01_img} alt=""/>
                    <div className="pointLine"><img src={TuStep02_01_Point01_img} alt=""/></div>
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="sub-img tu2-step1-2">
                    <img src={TuStep02_01_img} alt=""/>
                    <div className="pointLine"><img src={TuStep02_01_Point02_img} alt=""/></div>
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="sub-img tu2-step1-3">
                    <img src={TuStep02_01_img} alt=""/>
                    <div className="pointLine"><img src={TuStep02_01_Point03_img} alt=""/></div>
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="sub-img tu2-step1-4">
                    <img src={TuStep02_01_04_img} alt=""/>
                    <div className="pointLine"><img src={TuStep02_01_Point04_img} alt=""/></div>
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="sub-img tu2-step1-5">
                    <img src={TuStep02_01_04_img} alt=""/>
                    <div className="pointLine"><img src={TuStep02_01_Point05_img} alt=""/></div>
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="sub-img tu2-step1-6">
                    <img src={TuStep02_01_04_img} alt=""/>
                    <div className="pointLine"><img src={TuStep02_01_Point06_img} alt=""/></div>
                  </div>
                </div>
              </Swiper>
            </div>
          </div>

          <div className="swiper-slide" >
            <div className="title">
              <div className="tit1">동영상 플레이어 Embed, 자막(캡션) 등으로<br />사용자 편의성을 높였습니다.</div>
            </div>
            <div className="swiper-section swiper-sub tu2-step2">
              <Swiper {...Tu02Step02}>
                <div className="swiper-slide">
                  <div className="sub-img tu2-step2-1">
                    <img src={TuStep02_02_01_img} alt=""/>
                    <div className="pointLine"><img src={TuStep02_02_Point01_img} alt=""/></div>
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="sub-img tu2-step2-2">
                    <img src={TuStep02_02_02_img} alt=""/>
                    <div className="pointLine"><img src={TuStep02_02_Point02_img} alt=""/></div>
                  </div>
                </div>
              </Swiper>
            </div>
          </div>
        </Swiper>
      </div>
    </div>
  )
} 

export const Tutorial03 = () => {

  const Tu03 = {
    autoplay: {
      delay: 3142,
      disableOnInteraction: true,
    },
    pagination: {
      el: '.tu3-step-pagination',
      clickable: true,
      renderBullet: (index:number, className:string) => {
        return '<span class="' + className + '"><em>'+ (index+1) +'</em><span>' + tu3StepPage[index] + '</span></span>';
      }
    },
  }

  useEffect(() => {
    const Tu3Pagination = document.querySelector('.tu3-step-pagination');
    if(Tu3Pagination){
      Tu3Pagination.classList.add('swiper-sub-pagenation')
    }
  }, [])

  return (
    <div id="tu3" className="tu-cont">
      <div className="title">
        <div className="tit1">My Learning 학습 리스트를 심플한 표 형태로 변경하였으며,<br />코스만 보기 및 목록 제거 기능을 추가하였습니다.</div>
      </div>
      {/* <!-- .swiper-section --> */}
      <div className="swiper-section swiper-sub tu3-step">
        {/* <!-- Swiper --> */}
        <Swiper {...Tu03}>
          <div className="swiper-slide">
            <div className="sub-img tu3-step1">
              <img src={TuStep03_01_img} alt=""/>
              <div className="pointLine"><img src={TuStep03_Point01_img} alt=""/></div>
            </div>
          </div>
          <div className="swiper-slide">
            <div className="sub-img tu3-step2">
              <img src={TuStep03_01_img} alt=""/>
              <div className="pointLine"><img src={TuStep03_Point02_img} alt=""/></div>
            </div>
          </div>
          <div className="swiper-slide">
            <div className="sub-img tu3-step3">
              <img src={TuStep03_01_img} alt=""/>
              <div className="pointLine"><img src={TuStep03_Point03_img} alt=""/></div>
            </div>
          </div>
        </Swiper>
      </div>
    </div>
  )
}

export const Tutorial04 = () => {
  return (
    <div id="tu4" className="tu-cont">
      <div className="title">
        <div className="tit1">학습자 친화적인 맞춤형 검색 기능을 지원합니다.</div>
        <div className="tit2">난이도별 모아보기, 학습 시간에 따라 구분해서 보기,<br />핵인싸 과정만 모아보기 등 <strong>섬세한 검색 필터</strong>로<br />사용자 편의성을 높였습니다.</div>
      </div>
      <div className="tu4-main">
        <div className="img"><img src={TuStep04_01_img} alt=""/></div>
      </div>
    </div>
  )
}
