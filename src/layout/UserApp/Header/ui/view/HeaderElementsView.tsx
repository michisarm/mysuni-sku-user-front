
import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import classNames from 'classnames';
import personalCubePaths from 'personalcube/routePaths';
import lecturePaths from 'lecture/routePaths';
import myTrainingPaths from 'myTraining/routePaths';


export const LogoView: React.FC = () => (
  <div className="g-logo">
    <Link to="/">
      <i className="sk-university icon">
        <span className="blind">mySUNI</span>
      </i>
    </Link>
  </div>
);


interface MenuViewProps {
}

export const MenuView: React.FC<MenuViewProps> = () => (
  <div className="g-menu">
    <div className="nav">
      <NavLink to={myTrainingPaths.learning()} className="item">Learning</NavLink>
      <NavLink to={myTrainingPaths.community()} className="item">Community</NavLink>
      <NavLink to={lecturePaths.recommend()} className="item">Recommend</NavLink>
      <NavLink to={personalCubePaths.create()} className="item">Create</NavLink>
    </div>
  </div>
);


interface SearchBarViewProps {
  value: string,
  focused?: boolean,
  onSearch: () => void,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) =>  void,
  onClick?: (e: React.MouseEvent<HTMLInputElement>) => void,
  onBlur?: (e: React.FormEvent<HTMLInputElement>) => void,
  onClear?: () => void,
}

export const SearchBarView: React.FC<SearchBarViewProps> = ({ value, focused, onSearch, onChange, onBlur, onClick, onClear }) => (
  <div className="g-search">
    <div className={classNames('ui h38 search input', { focus: focused, write: value })} style={{ display: 'block' }}>
      <input type="text" placeholder="Search" value={value} onChange={onChange} onClick={onClick} onBlur={onBlur} onKeyPress={(e) => e.key === 'Enter' && onSearch()} />
      <i aria-hidden="true" className="clear link icon" onClick={onClear} />
      <i aria-hidden="true" className="search link icon" onClick={onSearch} />
    </div>
  </div>
);
