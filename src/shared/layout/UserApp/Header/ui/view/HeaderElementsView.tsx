import React from 'react';
import { Link } from 'react-router-dom';
import { Image } from 'semantic-ui-react';

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
      {/* Todo: 임시 링크, 개발 완료되면 url 교체 */}
      <Link to="/design/learning/my-learning" className="item active">Learning</Link>
      <Link to="/community" className="item">Community</Link>
      <Link to="/recommend" className="item">Recommend</Link>
      <Link to="/personalcube/create" className="item">Create</Link>
    </div>
  </div>
);


export const SearchBarView: React.FC = () => (
  <div className="g-search">
    <div className="ui h38 search input">
      <input type="text" placeholder="Search"  />
      <i aria-hidden="true" className="clear link icon" />
      <i aria-hidden="true" className="search link icon" />
    </div>
  </div>
);


export const ProfileView: React.FC = () => (
  <div className="g-info">
    <button className="ui user image label">
      <span className="name">김지우</span>
      <span className="affiliation">SK C&C  플랫폼 개발 1팀</span>
      <Image src={`${process.env.PUBLIC_URL}/images/all/profile-38-px.png`} alt="profile" />
    </button>
  </div>
);
