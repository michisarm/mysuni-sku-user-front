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
        menuItem: 'Main Page Playlist',
        render: () => (
          <Tab.Pane className="tab-img-wrap">
            <div className="tab-img t-img1" />
          </Tab.Pane>
        ),
      },
      {
        menuItem: '3가지 유형의 Playlist',
        render: () => (
          <Tab.Pane className="tab-img-wrap">
            <div className="tab-img t-img2" />
          </Tab.Pane>
        ),
      },
    ];
    const panes3 = [
      {
        menuItem: '학습카드에서 만들기',
        render: () => (
          <Tab.Pane className="tab-img-wrap">
            <div className="tab-img t-img1" />
          </Tab.Pane>
        ),
      },
      {
        menuItem: '찜한 과정에서 만들기',
        render: () => (
          <Tab.Pane className="tab-img-wrap">
            <div className="tab-img t-img2" />
          </Tab.Pane>
        ),
      },
      {
        menuItem: 'My Page에서 만들기',
        render: () => (
          <Tab.Pane className="tab-img-wrap">
            <div className="tab-img t-img3" />
          </Tab.Pane>
        ),
      },
    ];

    const panes4 = [
      {
        menuItem: 'Playlist 상세',
        render: () => (
          <Tab.Pane className="tab-img-wrap">
            <div className="tab-img t-img1" />
          </Tab.Pane>
        ),
      },
      {
        menuItem: 'Playlist 추천하기',
        render: () => (
          <Tab.Pane className="tab-img-wrap">
            <div className="tab-img t-img2" />
          </Tab.Pane>
        ),
      },
      {
        menuItem: '추천 받은 Playlist',
        render: () => (
          <Tab.Pane className="tab-img-wrap">
            <div className="tab-img t-img3" />
          </Tab.Pane>
        ),
      },
    ];

    const panes5 = [
      {
        menuItem: '프로필 팝업을 통해 담아오기',
        render: () => (
          <Tab.Pane className="tab-img-wrap">
            <div className="tab-img t-img1" />
          </Tab.Pane>
        ),
      },
      {
        menuItem: '담아온 Playlist 확인하기',
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
          className="base w1000 tutorials4 front scrolling kor"
          data-area={Area.MAIN_POPBANNER}
        >
          <Modal.Header className="header4">
            <div className="right-btn">
              <Checkbox
                label="더 이상 보지 않기"
                className="base"
                checked={isShowTutorial === 'HIDE'}
                onChange={(e, data) =>
                  onChangeIsShowTutorial(data.checked ? 'HIDE' : 'SHOW')
                }
              />
              <Button className="close" onClick={onClose}>
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
                      구성원과 함께하는
                      <br />
                      mySUNI Playlist!
                    </a>
                    <a
                      className={classNames(
                        'item tu2',
                        activeMenu === 'tu02' ? 'current' : ''
                      )}
                      onClick={() => onChangeActiveMenu('tu02')}
                    >
                      Main Page
                    </a>
                    <a
                      className={classNames(
                        'item tu3',
                        activeMenu === 'tu03' ? 'current' : ''
                      )}
                      onClick={() => onChangeActiveMenu('tu03')}
                    >
                      Playlist 만들기
                    </a>
                    <a
                      className={classNames(
                        'item tu4',
                        activeMenu === 'tu04' ? 'current' : ''
                      )}
                      onClick={() => onChangeActiveMenu('tu04')}
                    >
                      Playlist 추천하기
                    </a>
                    <a
                      className={classNames(
                        'item tu5',
                        activeMenu === 'tu05' ? 'current' : ''
                      )}
                      onClick={() => onChangeActiveMenu('tu05')}
                    >
                      Playlist 담아오기
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
                                Main Page
                              </a>
                            </li>
                            <li>
                              <a
                                className="intro"
                                onClick={() => onChangeActiveMenu('tu03')}
                              >
                                <i className="icon tuto-02" />
                                Playlist
                                <br />
                                만들기
                              </a>
                            </li>
                            <li>
                              <a
                                className="intro"
                                onClick={() => onChangeActiveMenu('tu04')}
                              >
                                <i className="icon tuto-03" />
                                Playlist
                                <br />
                                추천하기
                              </a>
                            </li>
                            <li>
                              <a
                                className="intro"
                                onClick={() => onChangeActiveMenu('tu05')}
                              >
                                <i className="icon tuto-04" />
                                Playlist
                                <br />
                                담아오기
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                  {activeMenu === 'tu02' && (
                    <div className="tu-cont tu2">
                      {/* Main Page */}
                      <div className="inner">
                        <div className="top-text">
                          <strong>
                            3가지 유형의 Playlist (내가 만든, 추천 받은, 내가
                            담은)를
                            <br />
                            확인하고 학습할 수 있어요.
                          </strong>
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
                      {/* Playlist 만들기 */}
                      <div className="inner">
                        <div className="top-text">
                          <strong>
                            과정 상세 화면과 찜한 과정 목록, My Page에서
                            <br />
                            Playlist를 생성하고 과정을 추가할 수 있어요.
                          </strong>
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
                      {/* Playlist 추천하기 */}
                      <div className="inner">
                        <div className="top-text">
                          <strong>
                            내가 만든 Playlist를 누군가에게 추천하기도 하고,
                            <br />
                            추천도 받으면서 함께하는 학습을 경험해 보세요.
                          </strong>
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
                      {/* Playlist 담아오기 */}
                      <div className="inner">
                        <div className="top-text">
                          <strong>
                            프로필카드에 공개된 Playlist 중 마음에 드는 것은
                            <br />
                            {
                              "'Playlist 담기’를 꾹 눌러서, 구성원들과 함께 학습해보세요."
                            }
                          </strong>
                        </div>
                        <Tab
                          menu={{ secondary: true }}
                          panes={panes5}
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
