import { getCookie, setCookie } from '@nara.platform/accent';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { Button, Checkbox, Image, Modal } from 'semantic-ui-react';
import Swiper from 'react-id-swiper';

const TutorialModalViewV3 = () => {
  //

  const [modalOpen, setModalOpen] = useState(false);
  const [noMoreModal, setNoMoreModal] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState('tu1');

  useEffect(() => {
    const mainModal = getCookie('mainModal');

    if (mainModal === null || mainModal === '' || mainModal === 'SHOW') {
      setModalOpen(true);
    } else {
      setModalOpen(false);
    }
  }, []);

  const ModalClose = () => {
    setCookie('mainModal', noMoreModal ? 'HIDE' : 'SHOW');
    setModalOpen(!modalOpen);
  };

  const onHandleChange = () => {
    setNoMoreModal(!noMoreModal);
  };

  const params = {
    loop: true,
    autoplay: {
      delay: 7000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  }

  return (
    <Modal open={modalOpen} close={ModalClose} className="base w1000 tutorials2 front scrolling">
      <Modal.Header className="header2">
        <div className="right-btn">
          <Checkbox label="더 이상 보지 않기" className="base" onChange={onHandleChange} />
          <Button className="close" onClick={ModalClose}>Close</Button>
        </div>
      </Modal.Header>
      <Modal.Content>
        <div className="scrolling-80vh">
          <div className="cont-wrap">
            <div className="left">
              <div className="inner">
                <Link to="#tu1" className={activeSubMenu === 'tu1' ? 'current' : ''} onClick={() => setActiveSubMenu('tu1')}>업데이트 사항 소개</Link>
                <Link to="#tu2" className={activeSubMenu === 'tu2' ? 'current' : ''} onClick={() => setActiveSubMenu('tu2')}>Note</Link>
                <Link to="#tu3" className={activeSubMenu === 'tu3' ? 'current' : ''} onClick={() => setActiveSubMenu('tu3')}>프로필 통합</Link>
                <Link to="#tu4" className={activeSubMenu === 'tu4' ? 'current' : ''} onClick={() => setActiveSubMenu('tu4')}>My Page </Link>
              </div>
            </div>
            <div className="right">
              {activeSubMenu === 'tu1' && (
                <div id="tu1" className="tu-cont current">
                  <div className="title top">
                    <div className="tit1">구성원 여러분의 보다 편리하고 효과적인 학습을 돕는 <br />mySUNI의 신규 기능을 소개합니다.</div>
                  </div>
                  <div className="tu1-main">
                    <div className="btn-list">
                      <Link to="#tu2" className="icon01" onClick={() => setActiveSubMenu('tu2')}><strong>Note 기능 생성</strong><p>학습을 하며 Note를 작성하고 모아보기, 폴더 지정을 통해<br /> 작성한 Note를 관리하는 기능 제공</p></Link>
                      <Link to="#tu3" className="icon02" onClick={() => setActiveSubMenu('tu3')}><strong>LMS/Community 프로필 통합</strong><p>Community를 포함한 mySUNI 전체에서 실명과<br />닉네임을 자유롭게 선택할 수 있는 기능 제공</p></Link>
                      <Link to="#tu4" className="icon03" onClick={() => setActiveSubMenu('tu4')}><strong>My Page 개편</strong><p>프로필 설정, Badge 및 이수 과정을 확인하고<br />작성된 학습 Note를 관리하는 기능 제공</p></Link>
                    </div>
                  </div>
                </div>
              )}

              {activeSubMenu === 'tu2' && (
                <div id="tu2" className="tu-cont">
                  {/*.swiper-section */}
                  <Swiper {...params} >

                    <div className="swiper-slide">
                      <div className="title top">
                        <div className="tit1">효과적인 학습이 될 수 있도록 <br />중요 Point와 나의 Lesson-learned 등을 Note로 기록해 보세요. </div>
                      </div>
                      <div className="sub-img">
                        <Image src={`${process.env.PUBLIC_URL}/images/all/Detail_img_02_01.png`} alt="효과적인 학습이 될 수 있도록 중요 Point와 나의 Lesson-learned 등을 Note로 기록해 보세요. " />
                      </div>
                    </div>

                    <div className="swiper-slide">
                      <div className="title top">
                        <div className="tit1">모든 학습 유형에서 Note 기능이 제공되며, <br />Video 및 Audio 학습 유형에서는 특정 Play Time도 함께 기록됩니다. </div>
                      </div>
                      <div className="sub-img">
                        <Image src={`${process.env.PUBLIC_URL}/images/all/Detail_img_02_02.png`} alt="모든 학습 유형에서 Note 기능이 제공되며,Video 및 Audio 학습 유형에서는 특정 Play Time도 함께 기록됩니다. " />
                      </div>
                    </div>
                    <div className="swiper-slide">
                      <div className="title top">
                        <div className="tit1">작성했던 Note를 My Page에서 한 눈에 모아 볼 수 있습니다. <br />나의 학습 목표나 내용별로 노트에 대한 폴더 지정도 가능합니다.</div>
                      </div>
                      <div className="sub-img">
                        <Image src={`${process.env.PUBLIC_URL}/images/all/Detail_img_02_03.png`} alt="작성했던 Note를 My Page에서 한 눈에 모아 볼 수 있습니다. 나의 학습 목표나 내용별로 노트에 대한 폴더 지정도 가능합니다." />
                      </div>
                    </div>

                  </Swiper>
                </div>
              )}

              {activeSubMenu === 'tu3' && (
                <div id="tu3" className="tu-cont">
                  {/*.swiper-section */}
                  <Swiper {...params} >

                    <div className="swiper-slide">
                      <div className="title top">
                        <div className="tit1">이제 Community 뿐 아니라, mySUNI 전체에 통합된 프로필이 제공됩니다. <br />원하는 이름을 설정하여 자유롭게 활동해 보세요.</div>
                      </div>
                      <div className="sub-img">
                        <Image src={`${process.env.PUBLIC_URL}/images/all/Detail_img_03_00.png`} alt="이제 Community 뿐 아니라, mySUNI 전체에 통합된 프로필이 제공됩니다. 원하는 이름을 설정하여 자유롭게 활동해 보세요" />
                      </div>
                    </div>
                    <div className="swiper-slide">
                      <div className="title top">
                        <div className="tit1">다른 사람의 상세 프로필을 조회하면, 상대방의 학습 현황,<br />Community 작성 글 등을 살펴볼 수 있습니다. Follow도 해보세요!</div>
                      </div>
                      <div className="sub-img">
                        <Image src={`${process.env.PUBLIC_URL}/images/all/Detail_img_03_01.png`} alt="다른 사람의 상세 프로필을 조회하면, 상대방의 학습 현황, Badge 현황, Community 작성 글 등을 살펴볼 수 있습니다. Follow도 해보세요!" />
                      </div>
                    </div>
                  </Swiper>
                </div>
              )}

              {activeSubMenu === 'tu4' && (
                <div id="tu4" className="tu-cont">
                  <Swiper {...params} >
                    <div className="swiper-slide">
                      <div className="title top">
                        <div className="tit1">나만의 프로필! My Page에서 멋지게 꾸며 보세요. <br />닉네임 설정, 자기소개 키워드, 이미지 등을 설정할 수 있습니다.</div>
                      </div>
                      <div className="sub-img">
                        <Image src={`${process.env.PUBLIC_URL}/images/all/Detail_img_04_01.png`} alt="나만의 프로필! My Page에서 멋지게 꾸며 보세요. 닉네임 설정, 자기소개 키워드, 이미지 등을 설정할 수 있습니다." />
                      </div>
                    </div>
                    <div className="swiper-slide">
                      <div className="title top">
                        <div className="tit1">내가 획득한 Badge 현황을 확인할 수 있습니다.<br />Badge별로 인증서를 파일로 내려 받거나 인쇄도 할 수 있습니다. </div>
                      </div>
                      <div className="sub-img">
                        <Image src={`${process.env.PUBLIC_URL}/images/all/Detail_img_04_02.png`} alt="내가 획득한 Badge 현황을 확인할 수 있습니다. Badge별로 인증서를 파일로 내려 받거나 인쇄도 할 수 있습니다. " />
                      </div>
                    </div>
                    <div className="swiper-slide">
                      <div className="title top">
                        <div className="tit1">내가 획득한 Stamp 현황을 확인할 수 있습니다.</div>
                      </div>
                      <div className="sub-img">
                        <Image src={`${process.env.PUBLIC_URL}/images/all/Detail_img_04_03.png`} alt="내가 획득한 Stamp 현황을 확인할 수 있습니다." />
                      </div>
                    </div>
                  </Swiper>
                </div>
              )}
            </div>
          </div>
        </div>
      </Modal.Content>
    </Modal>
  );
};

export default TutorialModalViewV3;
