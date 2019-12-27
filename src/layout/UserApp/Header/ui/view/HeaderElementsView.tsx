
import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import classNames from 'classnames';
import { Image } from 'semantic-ui-react';
import { InputWrapper } from 'shared';

// import profileImage from 'style/images/all/profile-38-px.png';


export const LogoView: React.FC = () => (
  <div className="g-logo">
    <Link to="/">
      <i className="sk-university icon">
        <span className="blind">SUNI</span>
      </i>
    </Link>
  </div>
);


interface MenuViewProps {
}

export const MenuView: React.FC<MenuViewProps> = () => (
  <div className="g-menu">
    <div className="nav">
      <NavLink to="/my-training" className="item">Learning</NavLink>
      <NavLink to="/community" className="item">Community</NavLink>
      <NavLink to="/recommend" className="item">Recommend</NavLink>
      <NavLink to="/personalcube/create" className="item">Create</NavLink>
    </div>
  </div>
);


export const SearchBarView: React.FC = () => (
  <div className="g-search">
    <InputWrapper>
      {({ value, focused, onChange, onBlur, onClick, onClear }) => (
        <div className={classNames('ui h38 search input', { focus: focused, write: value })}>
          <input type="text" placeholder="Search" value={value} onChange={onChange} onClick={onClick} onBlur={onBlur} />
          <i aria-hidden="true" className="clear link icon" onClick={onClear} />
          <i aria-hidden="true" className="search link icon" />
        </div>
      )}
    </InputWrapper>
  </div>
);


export const ProfileView: React.FC = () => (
  <div className="g-info">
    <button className="ui user image label">
      <span className="name">작업중</span>
      <span className="affiliation">SK C&C  플랫폼 개발 1팀</span>
      <Image src={`${process.env.PUBLIC_URL}/images/all/profile-38-px.png`} alt="profile" />
    </button>
  </div>
);
