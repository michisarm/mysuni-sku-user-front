import React, { Component } from 'react';
import { Button, Modal, Checkbox, Icon, Tab } from 'semantic-ui-react';
import classNames from 'classnames';
import { TutorialProps } from '../../TutorialModal';
import { Area } from 'tracker/model';

class TutorialModalKo extends Component<TutorialProps> {
  render() {
    //
    const {
      open,
      onClose,
      activeMenu,
      onChangeActiveMenu,
      isShowTutorial,
      onChangeIsShowTutorial,
    } = this.props;
    const panes2 = [
      {
        menuItem: '메뉴 간소화',
        render: () => (
          <Tab.Pane className="tab-img-wrap">
            <div className="tab-img t-img1" />
          </Tab.Pane>
        ),
      },
      {
        menuItem: '프로필 카드',
        render: () => (
          <Tab.Pane className="tab-img-wrap">
            <div className="tab-img t-img2" />
          </Tab.Pane>
        ),
      },
    ];
    const panes3 = [
      {
        menuItem: '자동완성 기능',
        render: () => (
          <Tab.Pane className="tab-img-wrap">
            <div className="tab-img t-img1" />
          </Tab.Pane>
        ),
      },
      {
        menuItem: '오타 정정 기능',
        render: () => (
          <Tab.Pane className="tab-img-wrap">
            <div className="tab-img t-img2" />
          </Tab.Pane>
        ),
      },
    ];

    const panes4 = [
      {
        menuItem: '나의 학습 현황',
        render: () => (
          <Tab.Pane className="tab-img-wrap">
            <div className="tab-img t-img1" />
          </Tab.Pane>
        ),
      },
      {
        menuItem: '학습 이어하기',
        render: () => (
          <Tab.Pane className="tab-img-wrap">
            <div className="tab-img t-img2" />
          </Tab.Pane>
        ),
      },
    ];

    const panes6 = [
      {
        menuItem: '학습 패턴 기반 추천',
        render: () => (
          <Tab.Pane className="tab-img-wrap">
            <div className="tab-img t-img1" />
          </Tab.Pane>
        ),
      },
      {
        menuItem: '유사 학습자 기반 추천',
        render: () => (
          <Tab.Pane className="tab-img-wrap">
            <div className="tab-img t-img2" />
          </Tab.Pane>
        ),
      },
      {
        menuItem: '관심 채널로 찜한 과정',
        render: () => (
          <Tab.Pane className="tab-img-wrap">
            <div className="tab-img t-img3" />
          </Tab.Pane>
        ),
      },
    ];
    const panes7 = [
      {
        menuItem: 'Hot Topic (메인)',
        render: () => (
          <Tab.Pane className="tab-img-wrap">
            <div className="tab-img t-img1" />
          </Tab.Pane>
        ),
      },
      {
        menuItem: 'Hot Topic (상세)',
        render: () => (
          <Tab.Pane className="tab-img-wrap">
            <div className="tab-img t-img2" />
          </Tab.Pane>
        ),
      },
    ];

    return (
      <>
        <Modal
          open={open}
          className="base w1000 tutorials3 front scrolling kor"
          data-area={Area.MAIN_POPBANNER}
        >
          <Modal.Header className="header3">
            <div className="right-btn">
              <Checkbox
                label="더 이상 보지 않기"
                className="base new"
                checked={isShowTutorial === 'HIDE'}
                onChange={(e, data) =>
                  onChangeIsShowTutorial(data.checked ? 'HIDE' : 'SHOW')
                }
              />
              <Button className="close" onClick={() => onClose()}>
                Close
              </Button>
            </div>
          </Modal.Header>
          <Modal.Content>
            <div className="scrolling-80vh">
              <div className="cont-wrap">
                <div className="left">
                  <div className="inner">
                    <div className="top-logo">
                      <i className="logo-new sk-login icon" />
                    </div>
                    <a
                      className={classNames(
                        'item tu1',
                        activeMenu === 'tu01' ? 'current' : ''
                      )}
                      onClick={() => onChangeActiveMenu('tu01')}
                    >
                      mySUNI가 새로워졌어요!
                    </a>
                    <a
                      className={classNames(
                        'item tu2',
                        activeMenu === 'tu02' ? 'current' : ''
                      )}
                      onClick={() => onChangeActiveMenu('tu02')}
                    >
                      간소화된 메뉴 구성
                    </a>
                    <a
                      className={classNames(
                        'item tu3',
                        activeMenu === 'tu03' ? 'current' : ''
                      )}
                      onClick={() => onChangeActiveMenu('tu03')}
                    >
                      똑똑한 검색
                    </a>
                    <a
                      className={classNames(
                        'item tu4',
                        activeMenu === 'tu04' ? 'current' : ''
                      )}
                      onClick={() => onChangeActiveMenu('tu04')}
                    >
                      편리해진 나의 학습 확인
                    </a>
                    <a
                      className={classNames(
                        'item tu5',
                        activeMenu === 'tu05' ? 'current' : ''
                      )}
                      onClick={() => onChangeActiveMenu('tu05')}
                    >
                      썸네일로 미리보는 콘텐츠
                    </a>
                    <a
                      className={classNames(
                        'item tu6',
                        activeMenu === 'tu06' ? 'current' : ''
                      )}
                      onClick={() => onChangeActiveMenu('tu06')}
                    >
                      나만을 위한 추천
                    </a>
                    <a
                      className={classNames(
                        'item tu7',
                        activeMenu === 'tu07' ? 'current' : ''
                      )}
                      onClick={() => onChangeActiveMenu('tu07')}
                    >
                      따끈한 Topic 모음
                    </a>
                  </div>
                </div>
                <div className="right">
                  {activeMenu === 'tu01' && (
                    <div className="tu-cont tu1">
                      {/* intro */}
                      <div className="inner">
                        <div className="intro-button">
                          <ul>
                            <li>
                              <a
                                className="intro"
                                onClick={() => onChangeActiveMenu('tu02')}
                              >
                                <i className="icon tuto-01" />
                                상단 메뉴
                              </a>
                            </li>
                            <li>
                              <a
                                className="intro"
                                onClick={() => onChangeActiveMenu('tu05')}
                              >
                                <i className="icon tuto-02" />
                                학습카드
                              </a>
                            </li>
                            <li>
                              <a
                                className="intro"
                                onClick={() => onChangeActiveMenu('tu06')}
                              >
                                <i className="icon tuto-03" />
                                개인별 추천
                              </a>
                            </li>
                            <li>
                              <a
                                className="intro"
                                onClick={() => onChangeActiveMenu('tu07')}
                              >
                                <i className="icon tuto-04" />
                                Hot Topic
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeMenu === 'tu02' && (
                    <div className="tu-cont tu2">
                      {/* 간소화된 메뉴 구성 */}
                      <div className="inner">
                        <div className="top-text">
                          메뉴 간소화를 통해{' '}
                          <strong>탐색/조회 영역과 나의 영역을 구분</strong>하여
                          <br />
                          편리하게 검색하고 학습에 참여할 수 있어요.
                        </div>
                        <Tab
                          menu={{ secondary: true }}
                          panes={panes2}
                          className="tab-tu"
                        />
                      </div>
                    </div>
                  )}
                  {activeMenu === 'tu03' && (
                    <div className="tu-cont tu3">
                      {/* 똑똑한 검색 */}
                      <div className="inner">
                        <div className="top-text">
                          <strong>
                            자동완성, 오타 정정 등 업그레이드된 검색 기능
                          </strong>
                          으로
                          <br />
                          학습하고 싶은 과정을 보다 쉽게 찾을 수 있어요.
                        </div>
                        <Tab
                          menu={{ secondary: true }}
                          panes={panes3}
                          className="tab-tu"
                        />
                      </div>
                    </div>
                  )}
                  {activeMenu === 'tu04' && (
                    <div className="tu-cont tu4">
                      {/* 편리해진 나의 학습 확인 */}
                      <div className="inner">
                        <div className="top-text">
                          <strong>‘나의 학습현황 보기’</strong> 클릭으로{' '}
                          <strong>학습의 요약 정보를 확인</strong>하고
                          <br />
                          <strong>최근에 학습한 과정</strong>으로 빠르게 들어갈
                          수 있어요.
                        </div>
                        <Tab
                          menu={{ secondary: true }}
                          panes={panes4}
                          className="tab-tu"
                        />
                      </div>
                    </div>
                  )}

                  {activeMenu === 'tu05' && (
                    <div className="tu-cont tu5">
                      {/* 썸네일로 미리보는 콘텐츠 */}
                      <div className="inner">
                        <div className="top-text">
                          <strong>이미지형 학습카드</strong>로 학습 내용을
                          빠르게 파악할 수 있어요.
                          <br />
                          관심 목록으로 담은 과정들은{' '}
                          <strong>My Learning</strong> 메뉴에서
                          <br />
                          모아볼 수 있어요.
                        </div>
                        <div className="tab-tu">
                          <div className="ui segment tab tab-img-wrap">
                            <div className="tab-img t-img1" />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeMenu === 'tu06' && (
                    <div className="tu-cont tu6">
                      {/* 나만을 위한 추천 */}
                      <div className="inner">
                        <div className="top-text">
                          <strong>
                            머신 러닝을 활용한 데이터 분석으로 과정
                          </strong>
                          을 추천해 드립니다.
                          <br />
                          계속 업그레이드할 예정이니 많이 기대해 주세요!
                        </div>
                        <Tab
                          menu={{ secondary: true }}
                          panes={panes6}
                          className="tab-tu"
                        />
                      </div>
                    </div>
                  )}
                  {activeMenu === 'tu07' && (
                    <div className="tu-cont tu7">
                      {/* 따끈한 Topic 모음 */}
                      <div className="inner">
                        <div className="top-text">
                          mySUNI가 엄선한{' '}
                          <strong>
                            Hot Topic을 중심으로 성장의 기반을
                            <br />
                            다져보세요.
                          </strong>
                          앞으로도 다양한 주제로 찾아뵐게요!
                        </div>
                        <Tab
                          menu={{ secondary: true }}
                          panes={panes7}
                          className="tab-tu"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Modal.Content>
        </Modal>
      </>
    );
  }
}

export default TutorialModalKo;
