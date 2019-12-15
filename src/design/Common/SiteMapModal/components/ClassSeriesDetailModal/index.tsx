import React, { Component } from 'react';
import {
  Button,
  Modal,
  Icon,
  Table, Popup,
} from 'semantic-ui-react';

interface Props {

}

interface States {
  open : boolean
  size? : 'mini' | 'tiny' | 'small' | 'large' | 'fullscreen'
  value? : any
}

class ClassSeriesDetailModal extends React.Component<Props, States> {
  constructor(props: Props) {
    super(props);
    this.state = {
      open: true,
    };
  }

  handleChange = (e:any, { value }:any) => this.setState({ value });

  show(size : 'mini' | 'tiny' | 'small' | 'large' | 'fullscreen') {
    this.setState({
      size,
      open: true,
    });
  }

  close() {
    this.setState({
      open: false,
    });
  }

  render() {
    const { open, size, value } = this.state;

    return (
      <>
        {/*<Button onClick={this.show('fullscreen')} basic>보기</Button>*/}

        <Modal size={size} open={open} onClose={this.close} className="base w1000">

          <Modal.Header>
            SK University Site Map
            <div className="right-btn">
              <Button icon className="btn-blue2"><Icon className="homelink" />Home</Button>
            </div>
          </Modal.Header>
          <Modal.Content>
            <div className="site-map">
              <ul>
                <li>
                  <span>Category</span>
                  <ul>
                    <li>
                      <a href="#">
                        <span className="underline">AI</span>
                        <span className="count">(<em>24</em>)</span>
                        <Icon className="new16 icon" /><span className="blind">new</span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <span className="underline">DT</span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <span className="underline">행복</span>
                        <span className="count">(<em>2</em>)</span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <span className="underline">SV</span>
                        <span className="count">(<em>12</em>)</span>
                      </a>
                    </li>
                    <li>
                      <a href="#"><span className="underline">혁신디자인</span></a>
                    </li>
                    <li>
                      <a href="#"><span className="underline">Global</span></a>
                    </li>
                    <li>
                      <a href="#"><span className="underline">Leadership</span></a>
                    </li>
                    <li>
                      <a href="#"><span className="underline">Management</span></a>
                    </li>
                  </ul>
                </li>
                <li>
                  <span>Learning</span>
                  <ul>
                    <li>
                      <a href="#"><span className="underline">In progress</span></a>
                    </li>
                    <li>
                      <a href="#"><span className="underline">In My List</span></a>
                    </li>
                    <li>
                      <a href="#"><span className="underline">Enrolled</span></a>
                    </li>
                    <li>
                      <a href="#"><span className="underline">Required</span></a>
                    </li>
                    <li>
                      <a href="#"><span className="underline">Completed List</span></a>
                    </li>
                    <li>
                      <a href="#"><span className="underline">Retry</span></a>
                    </li>
                  </ul>
                </li>
                <li>
                  <span>Recommend</span>
                  <ul>
                    <li>
                      <a href="#"><span className="underline">Recommend</span></a>
                    </li>
                  </ul>
                </li>
                <li>
                  <span>Community</span>
                  <ul>
                    <li>
                      <a href="#"><span className="underline">My Community</span></a>
                    </li>
                    <li>
                      <a href="#"><span className="underline">My Created Community</span></a>
                    </li>
                    <li>
                      <a href="#"><span className="underline">My Feed</span></a>
                    </li>
                  </ul>
                </li>
              </ul>
              <ul>
                <li>
                  <span>Introduction</span>
                  <ul>
                    <li>
                      <a href="#"><span className="underline">SK University 소개</span></a>
                    </li>
                    <li>
                      <a href="#"><span className="underline">College 소개</span></a>
                    </li>
                  </ul>
                </li>
                <li>
                  <span>Create</span>
                  <ul>
                    <li>
                      <a href="#"><span className="underline">Create</span></a>
                    </li>
                    <li>
                      <a href="#">
                        <span className="underline">Shared</span>
                        <span className="count">(24)</span>
                      </a>
                    </li>
                  </ul>
                </li>
                <li>
                  <span>My Page</span>
                  <ul>
                    <li>
                      <a href="#">
                        <span className="underline">Completed List</span>
                        <span className="count">(<em>11</em>)</span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <span className="underline">Earned Stamp List</span>
                        <span className="count">(<em>2</em>)</span>
                        <Icon className="new16 icon" /><span className="blind">new</span>
                      </a>
                    </li>
                  </ul>
                </li>
                <li>
                  <span>Support</span>
                  <ul>
                    <li>
                      <a href="#"><span className="underline">Notice</span></a>
                    </li>
                    <li>
                      <a href="#"><span className="underline">FAQ</span></a>
                    </li>
                    <li>
                      <a href="#"><span className="underline">Q&amp;A</span></a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </Modal.Content>
          <Modal.Actions className="actions">
            <Button className="w190 pop d" onClick={this.close}>Close</Button>
          </Modal.Actions>
        </Modal>
      </>
    );
  }
}

export default ClassSeriesDetailModal;
