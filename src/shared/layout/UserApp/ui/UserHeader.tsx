
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { Image } from 'semantic-ui-react';


@reactAutobind
class UserHeader extends Component {
  // state = {activeItem: 'home'};
  //
  // handleItemClick = (e, {name}) => this.setState({activeItem: name});

  render() {
    // const {activeItem} = this.state

    return (
      <section className="header">
        <div className="group">
          <div className="cont-inner">
            <div className="g-logo">
              <i className="sk-university icon"><span className="blind">SK university</span></i>
            </div>
            <div className="g-menu">
              <div className="nav">
                <a className="item active">Learning</a>
                <a className="item">Community</a>
                <a className="item">Recommend</a>
                <a className="item">Create</a>
              </div>
            </div>
            <div className="g-search">
              <div className="ui h38 search input">
                <input type="text" placeholder="Search" />
                <i aria-hidden="true" className="clear link icon" />
                <i aria-hidden="true" className="search link icon" />
              </div>
            </div>
            <div className="g-info">
              <button className="ui user image label">
                <span className="name">김지우</span>
                <span className="affiliation">SK C&C  플랫폼 개발 1팀</span>
                <Image src="/images/all/profile-38-px.png" alt="profile" />
              </button>
            </div>
          </div>
        </div>
        <div className="breadcrumbs">
          <div className="cont-inner">
            <div className="ui standard breadcrumb">
              <a className="section">Home</a>
              <i className="right chevron icon divider" />
              <a className="section">depth1</a>
              <i className="right chevron icon divider" />
              <div className="active section">depth2</div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default UserHeader;
