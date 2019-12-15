import React, { Component } from 'react';
import {
  Button, Form,
  Icon,
  Modal, Radio,
} from 'semantic-ui-react';

class MainCategoryModal extends React.Component {

  handleChange() {

  }

  close() {

  }

  render() {
    return (
      <Modal trigger={<Button icon className="left post delete">카테고리 선택</Button>} className="base w560">
        <Modal.Header className="res">
                    Main Category Choice
          <span className="sub f12">Please select a category</span>
        </Modal.Header>
        <Modal.Content>
          <div className="channel-change">
            <div className="table-css">
              <div className="row head">
                <div className="cell v-middle">
                  <span className="text01">Channel list</span>
                </div>
              </div>
              <div className="row">
                <div className="cell vtop">
                  <div className="select-area">
                    <div className="scrolling-60vh">
                      <div className="ui accordion channel">
                        {/* .channel */}
                        <div className="title">
                          <span className="name purple">AI</span>
                          <Icon />
                        </div>
                        <div className="content">
                          <ul>
                            <li>
                              <Radio
                                className="base"
                                label="AI 공통"
                                name="radioGroup"
                                value="value01"
                                onChange={this.handleChange}
                                defaultChecked
                              />
                            </li>
                            <li>
                              <Radio
                                className="base"
                                label="AI 공통"
                                name="radioGroup"
                                value="value01"
                                onChange={this.handleChange}
                                defaultChecked
                              />
                            </li>
                            <li>
                              <Radio
                                className="base"
                                label="AI 공통"
                                name="radioGroup"
                                value="value01"
                                onChange={this.handleChange}
                                defaultChecked
                              />
                            </li>
                          </ul>
                        </div>
                        <div className="title">
                          <span className="name violet">DT</span>
                          <Icon />
                        </div>
                        <div className="content">
                          <ul>
                            <li>
                              <Radio
                                className="base"
                                label="DT 공통"
                                name="radioGroup"
                                value="value01"
                                onChange={this.handleChange}
                                defaultChecked
                              />
                            </li>
                            <li>
                              <Radio
                                className="base"
                                label="DT 공통"
                                name="radioGroup"
                                value="value01"
                                onChange={this.handleChange}
                                defaultChecked
                              />
                            </li>
                            <li>
                              <Radio
                                className="base"
                                label="DT 공통"
                                name="radioGroup"
                                value="value01"
                                onChange={this.handleChange}
                                defaultChecked
                              />
                            </li>
                          </ul>
                        </div>
                        <div className="title">
                          <span className="name yellow">행복</span>
                          <Icon />
                        </div>
                        <div className="content">
                          <ul>
                            <li>
                              <Radio
                                className="base"
                                label="행복 공통"
                                name="radioGroup"
                                value="value01"
                                onChange={this.handleChange}
                                defaultChecked
                              />
                            </li>
                            <li>
                              <Radio
                                className="base"
                                label="행복 공통"
                                name="radioGroup"
                                value="value01"
                                onChange={this.handleChange}
                                defaultChecked
                              />
                            </li>
                            <li>
                              <Radio
                                className="base"
                                label="행복 공통"
                                name="radioGroup"
                                value="value01"
                                onChange={this.handleChange}
                                defaultChecked
                              />
                            </li>
                          </ul>
                        </div>
                        <div className="title">
                          <span className="name orange">SV</span>
                          <Icon />
                        </div>
                        <div className="content">
                          <ul>
                            <li>
                              <Radio
                                className="base"
                                label="SV 공통"
                                name="radioGroup"
                                value="value01"
                                onChange={this.handleChange}
                                defaultChecked
                              />
                            </li>
                            <li>
                              <Radio
                                className="base"
                                label="SV 공통"
                                name="radioGroup"
                                value="value01"
                                onChange={this.handleChange}
                                defaultChecked
                              />
                            </li>
                            <li>
                              <Radio
                                className="base"
                                label="SV 공통"
                                name="radioGroup"
                                value="value01"
                                onChange={this.handleChange}
                                defaultChecked
                              />
                            </li>
                          </ul>
                        </div>
                        <div className="title">
                          <span className="name red">혁신디자인</span>
                          <Icon />
                        </div>
                        <div className="content">
                          <ul>
                            <li>
                              <Radio
                                className="base"
                                label="혁신디자인 공통"
                                name="radioGroup"
                                value="value01"
                                onChange={this.handleChange}
                                defaultChecked
                              />
                            </li>
                            <li>
                              <Radio
                                className="base"
                                label="혁신디자인 공통"
                                name="radioGroup"
                                value="value01"
                                onChange={this.handleChange}
                                defaultChecked
                              />
                            </li>
                            <li>
                              <Radio
                                className="base"
                                label="혁신디자인 공통"
                                name="radioGroup"
                                value="value01"
                                onChange={this.handleChange}
                                defaultChecked
                              />
                            </li>
                          </ul>
                        </div>
                        <div className="title">
                          <span className="name green">Global</span>
                          <Icon />
                        </div>
                        <div className="content">
                          <ul>
                            <li>
                              <Radio
                                className="base"
                                label="Global 공통"
                                name="radioGroup"
                                value="value01"
                                onChange={this.handleChange}
                                defaultChecked
                              />
                            </li>
                            <li>
                              <Radio
                                className="base"
                                label="Global 공통"
                                name="radioGroup"
                                value="value01"
                                onChange={this.handleChange}
                                defaultChecked
                              />
                            </li>
                            <li>
                              <Radio
                                className="base"
                                label="Global 공통"
                                name="radioGroup"
                                value="value01"
                                onChange={this.handleChange}
                                defaultChecked
                              />
                            </li>
                          </ul>
                        </div>
                        <div className="title">
                          <span className="name blue">Leadership</span>
                          <Icon />
                        </div>
                        <div className="content">
                          <ul>
                            <li>
                              <Radio
                                className="base"
                                label="Leadership 공통"
                                name="radioGroup"
                                value="value01"
                                onChange={this.handleChange}
                                defaultChecked
                              />
                            </li>
                            <li>
                              <Radio
                                className="base"
                                label="Leadership 공통"
                                name="radioGroup"
                                value="value01"
                                onChange={this.handleChange}
                                defaultChecked
                              />
                            </li>
                            <li>
                              <Radio
                                className="base"
                                label="Leadership 공통"
                                name="radioGroup"
                                value="value01"
                                onChange={this.handleChange}
                                defaultChecked
                              />
                            </li>

                          </ul>
                        </div>
                        <div className="title">
                          <span className="name teal">Management</span>
                          <Icon />
                        </div>
                        <div className="content">
                          <ul>
                            <li>
                              <Radio
                                className="base"
                                label="Management 공통"
                                name="radioGroup"
                                value="value01"
                                onChange={this.handleChange}
                                defaultChecked
                              />
                            </li>
                            <li>
                              <Radio
                                className="base"
                                label="Management 공통"
                                name="radioGroup"
                                value="value01"
                                onChange={this.handleChange}
                                defaultChecked
                              />
                            </li>
                            <li>
                              <Radio
                                className="base"
                                label="Management 공통"
                                name="radioGroup"
                                value="value01"
                                onChange={this.handleChange}
                                defaultChecked
                              />
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Content>
        <Modal.Actions className="actions">
          <Button className="w190 pop d" onClick={this.close}>Cancel</Button>
          <Button className="w190 pop p" onClick={this.close}>OK</Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default MainCategoryModal;
