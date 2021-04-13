import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { getAxios } from 'shared/api/Axios';
import { AxiosReturn } from 'shared/api/AxiosReturn';

import findAvailablePageElements from '../../../../../lecture/shared/api/arrangeApi';

import classNames from 'classnames';
import lecturePaths from 'lecture/routePaths';
import myTrainingPaths from 'myTraining/routePaths';
import certificationPaths from 'certification/routePaths';
import personalCubePaths from 'personalcube/routePaths';
import communityPaths from 'community/routePaths';
import { PageElement } from '../../../../../lecture/shared/model/PageElement';
import CategoryMenuContainer from '../logic/CategoryMenuContainer';
import { Area } from 'tracker/model';

interface LogoViewProps {
  onClickMenu: (menuName: string) => void;
}

export const LogoView: React.FC<LogoViewProps> = ({ onClickMenu }) => (
  <div className="g-logo" data-area={Area.HEADER_LOGO}>
    <Link to="/" onClick={() => onClickMenu('mySUNI')}>
      <i className="sk-university icon">
        <span className="blind">mySUNI</span>
      </i>
    </Link>
  </div>
);

interface MenuViewProps {
  onClickMenu: (menuName: string) => void;
}

export const MenuView: React.FC<MenuViewProps> = ({ onClickMenu }) => {
  const [menuAuth, setMenuAuth] = useState<PageElement[]>([]);
  useEffect(() => {
    const axios = getAxios();
    const fetchMenu = async () => {
      const response = await findAvailablePageElements();
      setMenuAuth(response);
    };
    fetchMenu();
  }, []);

  return (
    <>
      {menuAuth.some(
        pagemElement =>
          pagemElement.position === 'TopMenu' &&
          pagemElement.type === 'Category'
      ) && <CategoryMenuContainer />}
      <div className="g-menu">
        <div className="nav" data-area={Area.HEADER_GNB}>
          {menuAuth.some(
            pagemElement =>
              pagemElement.position === 'TopMenu' &&
              pagemElement.type === 'Learning'
          ) && (
            <NavLink
              to={myTrainingPaths.learning()}
              className="item"
              onClick={() => onClickMenu('Learning')}
            >
              Learning
            </NavLink>
          )}
          {menuAuth.some(
            pagemElement =>
              pagemElement.position === 'TopMenu' &&
              pagemElement.type === 'Recommend'
          ) && (
            <NavLink
              to={lecturePaths.recommend()}
              className="item"
              onClick={() => onClickMenu('Recommend')}
            >
              Recommend
            </NavLink>
          )}
          {menuAuth.some(
            pagemElement =>
              pagemElement.position === 'TopMenu' &&
              pagemElement.type === 'Create'
          ) && (
            <NavLink
              to={personalCubePaths.create()}
              className="item"
              onClick={() => onClickMenu('Create')}
            >
              Create
            </NavLink>
          )}
          {menuAuth.some(
            pagemElement =>
              pagemElement.position === 'TopMenu' &&
              pagemElement.type === 'Certification'
          ) && (
            <NavLink
              to={certificationPaths.badge()}
              className="item"
              onClick={() => onClickMenu('Certification')}
            >
              Certification
            </NavLink>
          )}
          {menuAuth.some(
            pagemElement =>
              pagemElement.position === 'TopMenu' &&
              pagemElement.type === 'Community'
          ) && (
            <NavLink
              to={communityPaths.community()}
              className="item"
              onClick={() => onClickMenu('Community')}
            >
              Community
            </NavLink>
          )}
        </div>
      </div>
    </>
  );
};

interface SearchBarViewProps {
  value: string;
  focused?: boolean;
  onSearch: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FormEvent<HTMLInputElement>) => void;
  onClear?: () => void;
}

export const SearchBarView: React.FC<SearchBarViewProps> = ({
  value,
  focused,
  onSearch,
  onChange,
  onBlur,
  onClick,
  onClear,
}) => (
  <div className="g-search" data-area={Area.HEADER_SEARCH}>
    <div
      className={classNames('ui h38 search input', {
        focus: focused,
        write: value,
      })}
      style={{ display: 'block' }}
    >
      <input
        type="text"
        placeholder="Search"
        value={value}
        onChange={onChange}
        onClick={onClick}
        onBlur={onBlur}
        onKeyPress={e => e.key === 'Enter' && onSearch()}
      />
      <i aria-hidden="true" className="clear link icon" onClick={onClear} />
      <i aria-hidden="true" className="search link icon" onClick={onSearch} />
    </div>
  </div>
);
