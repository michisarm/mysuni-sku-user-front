import React, { Component } from 'react';
import {
  Button,
  Icon,
  Modal,
} from 'semantic-ui-react';

class SubCategoryChoiceModal extends React.Component {

  close() {

  }

  render() {
    return (
      <Modal trigger={<Button icon className="left post delete">카테고리 선택</Button>} className="base w1000">
        <Modal.Header className="res">
                    Sub Category Choice
          <span className="sub f12">Please select a category</span>
        </Modal.Header>
        <Modal.Content>
          <div className="channel-change">
            <div className="table-css">
              <div className="row head">
                <div className="cell v-middle">
                  <span className="text01">Channel list</span>
                </div>
                <div className="cell v-middle">
                  <span className="text01">Selected</span>
                  <span className="count"><span className="text01 add">7</span>
                    <span className="text02"> / 80 </span>
                  </span>
                  <div className="right">
                    <Button className="clear">
                      <Icon className="reset" /><span className="blind">reset</span>
                    </Button>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="cell vtop">
                  <div className="select-area">
                    <div className="scrolling-60vh">
                      {/* .search-empty */}
                      {/*
                                                <div className="search-empty">
                                                <Icon className='rocket50'/>
                                                    <div>검색된 Channel이 없습니다.</div>
                                                </div>
                                                */}
                      {/* // .search-empty */}
                      <div className="ui accordion channel">{/* .channel */}
                        <div className="title active">
                          <span className="name b1">AI</span>
                          <Icon />
                        </div>
                        <div className="content active">
                          <ul>
                            <li>
                              <div className="ui base checkbox">
                                <input type="checkbox"
                                  className="hidden"
                                  tabIndex={0}
                                />
                                <label>AI 공통</label>
                              </div>
                            </li>
                            <li>
                              <div className="ui base checkbox">
                                <input type="checkbox"
                                  className="hidden"
                                  tabIndex={0}
                                />
                                <label>AI 공통</label>
                              </div>
                            </li>
                            <li>
                              <div className="ui base checkbox">
                                <input type="checkbox"
                                  className="hidden"
                                  tabIndex={0}
                                />
                                <label>AI 공통</label>
                              </div>
                            </li>
                          </ul>
                        </div>
                        <div className="title active">
                          <span className="name b2">Mgmt</span>
                          <Icon />
                        </div>
                        <div className="content active">
                          <li>
                            <div className="ui base checkbox">
                              <input type="checkbox" className="hidden" tabIndex={0} />
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
                        <Button className="del">AI 공통 1 (이것만 검색되라)</Button>
                        <Button className="del">AI 공통 1 (이것만 검색되라)</Button>
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

export default SubCategoryChoiceModal;
