import React, { Component } from 'react';
import { Button, Modal, Checkbox, Tab } from 'semantic-ui-react';
import classNames from 'classnames';
import { TutorialProps } from '../../TutorialModal';
import { Area } from 'tracker/model';

class TutorialModalZh extends Component<TutorialProps> {
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
        menuItem: '菜单简化',
        render: () => (
          <Tab.Pane className="tab-img-wrap">
            <div className="tab-img t-img1" />
          </Tab.Pane>
        ),
      },
      {
        menuItem: '个人资料卡',
        render: () => (
          <Tab.Pane className="tab-img-wrap">
            <div className="tab-img t-img2" />
          </Tab.Pane>
        ),
      },
    ];

    const panes4 = [
      {
        menuItem: '我的学习现状',
        render: () => (
          <Tab.Pane className="tab-img-wrap">
            <div className="tab-img t-img1" />
          </Tab.Pane>
        ),
      },
      {
        menuItem: '继续下一个学习课程',
        render: () => (
          <Tab.Pane className="tab-img-wrap">
            <div className="tab-img t-img2" />
          </Tab.Pane>
        ),
      },
    ];

    const panes6 = [
      {
        menuItem: '按照学习模式推荐',
        render: () => (
          <Tab.Pane className="tab-img-wrap">
            <div className="tab-img t-img1" />
          </Tab.Pane>
        ),
      },
      {
        menuItem: '基于类似学习者的推荐',
        render: () => (
          <Tab.Pane className="tab-img-wrap">
            <div className="tab-img t-img2" />
          </Tab.Pane>
        ),
      },
      {
        menuItem: '收藏至关注频道的课程',
        render: () => (
          <Tab.Pane className="tab-img-wrap">
            <div className="tab-img t-img3" />
          </Tab.Pane>
        ),
      },
    ];

    return (
      <>
        <Modal
          open={open}
          className="base w1000 tutorials3 front scrolling chn"
          data-area={Area.MAIN_POPBANNER}
        >
          <Modal.Header className="header3">
            <div className="right-btn">
              <Checkbox
                label="不再显示"
                className="base"
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
                      mySUNI全新改版啦！
                    </a>
                    <a
                      className={classNames(
                        'item tu2',
                        activeMenu === 'tu02' ? 'current' : ''
                      )}
                      onClick={() => onChangeActiveMenu('tu02')}
                    >
                      简化后的菜单选项
                    </a>
                    <a
                      className={classNames(
                        'item tu3',
                        activeMenu === 'tu03' ? 'current' : ''
                      )}
                      onClick={() => onChangeActiveMenu('tu03')}
                    >
                      智能化搜索
                    </a>
                    <a
                      className={classNames(
                        'item tu4',
                        activeMenu === 'tu04' ? 'current' : ''
                      )}
                      onClick={() => onChangeActiveMenu('tu04')}
                    >
                      更便捷地查看我的学习现状
                    </a>
                    <a
                      className={classNames(
                        'item tu5',
                        activeMenu === 'tu05' ? 'current' : ''
                      )}
                      onClick={() => onChangeActiveMenu('tu05')}
                    >
                      可预览学习内容的缩略图
                    </a>
                    <a
                      className={classNames(
                        'item tu6',
                        activeMenu === 'tu06' ? 'current' : ''
                      )}
                      onClick={() => onChangeActiveMenu('tu06')}
                    >
                      个性化推荐
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
                                顶部菜单
                              </a>
                            </li>
                            <li>
                              <a
                                className="intro"
                                onClick={() => onChangeActiveMenu('tu05')}
                              >
                                <i className="icon tuto-02" />
                                学习卡
                              </a>
                            </li>
                            <li>
                              <a
                                className="intro"
                                onClick={() => onChangeActiveMenu('tu06')}
                              >
                                <i className="icon tuto-03" />
                                个性化推荐
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
                          菜单简化后，
                          <strong>搜索/查询区域和我的区域得以分离，</strong>
                          <br />
                          搜索与学习变得更加容易。
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
                            搜索栏升级后具有自动补全、智能纠错等功能，
                          </strong>
                          <br />
                          可更加便捷地查询我想学的课程。
                        </div>
                        <div className="tab-tu">
                          <div className="ui segment tab tab-img-wrap">
                            <div className="tab-img t-img1" />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {activeMenu === 'tu04' && (
                    <div className="tu-cont tu4">
                      {/* 편리해진 나의 학습 확인 */}
                      <div className="inner">
                        <div className="top-text">
                          点击<strong>“查看我的学习现状”</strong>即可
                          <strong>
                            快速查看学习相关的
                            <br />
                            简略信息，
                          </strong>
                          并可快捷进入<strong>我最近学习的课程。</strong>
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
                          <strong>通过图片型学习卡</strong>可快速了解学习内容。
                          <br />
                          关注目录中的课程可以通过<strong>My Learning</strong>
                          菜单批量查看。
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
                            利用机器学习分析相关数据，为您推荐课程。
                          </strong>
                          <br />
                          敬请期待今后更多的升级内容！
                        </div>
                        <Tab
                          menu={{ secondary: true }}
                          panes={panes6}
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

export default TutorialModalZh;
