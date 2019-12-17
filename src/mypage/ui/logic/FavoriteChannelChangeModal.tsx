import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { Button, Icon, Modal } from 'semantic-ui-react';
import { inject, observer } from 'mobx-react';

interface Props {
  size?: 'mini' | 'tiny' | 'small' | 'large' | 'fullscreen'
}
interface States {
  open : boolean
}

@inject('skProfileService')
@observer
@reactAutobind
class FavoriteChannelChangeModal extends Component<Props, States> {


  constructor(props:Props) {
    super(props);
    this.state = {
      open: true,
    };
  }

  show() {
    this.setState({
      open: true,
    });
  }

  close() {
    this.setState({ open: false });
  }

  render() {
    const { size } = this.props;
    const { open } = this.state;

    return (
      <Modal size={size} open={open} onClose={this.close} className="base w1000">

        <Modal.Header className="res">
          관심 Channel 변경
          <span className="sub f12">맞춤형 학습카드 추천을 위한 관심 채널을 3개 이상 선택해주세요.</span>
        </Modal.Header>
        <Modal.Content>
          <div className="channel-change">

            <div className="table-css">
              <div className="row head">
                <div className="cell v-middle">
                  <span className="text01">Channel list</span>
                  <div className="right">
                    <div className="ui h30 search input">
                      <input type="text" placeholder="Search" />
                      <i aria-hidden="true" className="clear link icon" />
                      <i aria-hidden="true" className="search link icon" />
                    </div>
                  </div>
                </div>
                {/* 검색  결과  없는 경우 */}

                {/*검색 결과 있는 경우 */}
                <div className="cell v-middle">
                  <span className="text01">Selected</span>
                  <span className="count">
                    <span className="text01">7</span>
                    <span className="text02"> / 80 </span>
                  </span>
                  <div className="right">
                    <button className="clear">
                      <i className="icon reset">
                        <span className="blind"> reset </span>
                      </i>
                    </button>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="cell vtop">
                  <div className="select-area">
                    <div className="scrolling-60vh">
                      {/* .search-empty */}
                      {/*
                                                <div class="search-empty">
                                                    <i class="icon rocket50"></i>
                                                    <div>검색된 Channel이 없습니다.</div>
                                                </div>
                                                */}
                      {/* // .search-empty */}
                      <div className="ui accordion channel">{/* .channel */}
                        <div className="title">
                          <span className="name b1">AI</span>
                          <i className="icon" />
                        </div>
                        <div className="content">
                          <ul>
                            <li> {/* collage list map*/}
                              <div className="ui base checkbox">
                                <input type="checkbox"
                                  className="hidden"
                                />
                                <label>AI 공통</label>
                              </div>
                            </li>
                          </ul>
                        </div>
                        <div className="title">
                          <span className="name b2">Mgmt</span>
                          <i className="icon" />
                        </div>
                        <div className="content">
                          <li>
                            <div className="ui base checkbox">
                              <input type="checkbox" className="hidden"  />
                              <label>AI 공통</label>
                            </div>
                          </li>
                          <li>
                            <div className="ui base checkbox">
                              <input type="checkbox" className="hidden"  />
                              <label>AI 공통</label>
                            </div>
                          </li>
                          <li>
                            <div className="ui base checkbox">
                              <input type="checkbox" className="hidden" />
                              <label>AI 공통</label>
                            </div>
                          </li>
                        </div>
                        <div className="title">
                          <span className="name b3">Leadership</span>
                          <i className="icon" />
                        </div>
                        <div className="content">
                          <li>
                            <div className="ui base checkbox">
                              <input type="checkbox" className="hidden"  />
                              <label>AI 공통</label>
                            </div>
                          </li>
                          <li>
                            <div className="ui base checkbox">
                              <input type="checkbox" className="hidden"  />
                              <label>AI 공통</label>
                            </div>
                          </li>
                          <li>
                            <div className="ui base checkbox">
                              <input type="checkbox" className="hidden"  />
                              <label>AI 공통</label>
                            </div>
                          </li>
                        </div>
                        <div className="title">
                          <span className="name b4">혁신 Design</span>
                          <i className="icon" />
                        </div>
                        <div className="content">
                          <li>
                            <div className="ui base checkbox">
                              <input type="checkbox" className="hidden"  />
                              <label>AI 공통</label>
                            </div>
                          </li>
                          <li>
                            <div className="ui base checkbox">
                              <input type="checkbox" className="hidden"  />
                              <label>AI 공통</label>
                            </div>
                          </li>
                          <li>
                            <div className="ui base checkbox">
                              <input type="checkbox" className="hidden"  />
                              <label>AI 공통</label>
                            </div>
                          </li>
                        </div>
                        <div className="title">
                          <span className="name b5">DT</span>
                          <i className="icon" />
                        </div>
                        <div className="content">
                          <li>
                            <div className="ui base checkbox">
                              <input type="checkbox" className="hidden"  />
                              <label>AI 공통</label>
                            </div>
                          </li>
                          <li>
                            <div className="ui base checkbox">
                              <input type="checkbox" className="hidden"  />
                              <label>AI 공통</label>
                            </div>
                          </li>
                          <li>
                            <div className="ui base checkbox">
                              <input type="checkbox" className="hidden"  />
                              <label>AI 공통</label>
                            </div>
                          </li>
                        </div>
                        <div className="title">
                          <span className="name b6">Global</span>
                          <i className="icon" />
                        </div>
                        <div className="content">
                          <li>
                            <div className="ui base checkbox">
                              <input type="checkbox" className="hidden"  />
                              <label>AI 공통</label>
                            </div>
                          </li>
                          <li>
                            <div className="ui base checkbox">
                              <input type="checkbox" className="hidden"  />
                              <label>AI 공통</label>
                            </div>
                          </li>
                          <li>
                            <div className="ui base checkbox">
                              <input type="checkbox" className="hidden"  />
                              <label>AI 공통</label>
                            </div>
                          </li>
                        </div>
                        <div className="title">
                          <span className="name b7">행복</span>
                          <i className="icon" />
                        </div>
                        <div className="content">
                          <li>
                            <div className="ui base checkbox">
                              <input type="checkbox" className="hidden"  />
                              <label>AI 공통</label>
                            </div>
                          </li>
                          <li>
                            <div className="ui base checkbox">
                              <input type="checkbox" className="hidden"  />
                              <label>AI 공통</label>
                            </div>
                          </li>
                          <li>
                            <div className="ui base checkbox">
                              <input type="checkbox" className="hidden"  />
                              <label>AI 공통</label>
                            </div>
                          </li>
                        </div>
                        <div className="title">
                          <span className="name b8">SV</span>
                          <i className="icon" />
                        </div>
                        <div className="content">
                          <li>
                            <div className="ui base checkbox">
                              <input type="checkbox" className="hidden"  />
                              <label>AI 공통</label>
                            </div>
                          </li>
                          <li>
                            <div className="ui base checkbox">
                              <input type="checkbox" className="hidden"  />
                              <label>AI 공통</label>
                            </div>
                          </li>
                          <li>
                            <div className="ui base checkbox">
                              <input type="checkbox" className="hidden"  />
                              <label>AI 공통</label>
                            </div>
                          </li>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="cell vtop">
                  <div className="select-area">
                    <div className="scrolling-60vh">
                      {/* .select-empty */}
                      {/*<div className="select-empty">*/}
                      {/*    Not Selected*/}
                      {/*</div>*/}
                      {/* // .select-empty */}
                      {/* .select-item */}

                      <div className="select-item">
                        <button className="ui button del">Cloud Developing</button>
                        <button className="ui button del">Cloud Developing</button>
                        <button className="ui button del">Cloud Developing</button>
                        <button className="ui button del">Cloud Developing</button>
                        <button className="ui button del">Cloud Developing</button>
                        <button className="ui button del">Cloud Developing</button>
                        <button className="ui button del">Cloud Developing</button>
                      </div>

                      {/* // .select-item */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Content>
        <Modal.Actions className="actions">
          <Button className="w190 pop d" onClick={this.close}>Cancel</Button>
          <Button className="w190 pop p" onClick={this.close}>Confirm</Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default FavoriteChannelChangeModal;
