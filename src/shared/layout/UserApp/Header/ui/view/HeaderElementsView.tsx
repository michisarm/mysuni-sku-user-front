
import React from 'react';
import { Image } from 'semantic-ui-react';

import profileImage from '../../../../../../style/images/all/profile-38-px.png';


interface LogoViewProps {
}

export const LogoView: React.FC<LogoViewProps> = () => (
  <div className="g-logo">
    <i className="sk-university icon">
      <span className="blind">SK university</span>
    </i>
  </div>
);


interface MenuViewProps {
}

export const MenuView: React.FC<MenuViewProps> = () => (
  <div className="g-menu">
    <div className="nav">
      <a className="item active">Learning</a>
      <a className="item">Community</a>
      <a className="item">Recommend</a>
      <a className="item">Create</a>
    </div>
  </div>
);


interface SearchBarViewProps {
}

export const SearchBarView: React.FC<SearchBarViewProps> = () => (
  <div className="g-search">
    <div className="ui h38 search input">
      <input type="text" placeholder="Search" />
      <i aria-hidden="true" className="clear link icon" />
      <i aria-hidden="true" className="search link icon" />
    </div>
  </div>
);


interface ProfileViewProps {
}

export const ProfileView: React.FC<ProfileViewProps> = () => (
  <div className="g-info">
    <button className="ui user image label">
      <span className="name">김지우</span>
      <span className="affiliation">SK C&C  플랫폼 개발 1팀</span>
      <Image src={profileImage} alt="profile" />
    </button>
  </div>
);


interface BreadcrumbsViewProps {
}

export const BreadcrumbsView: React.FC<BreadcrumbsViewProps> = () => (
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
);
