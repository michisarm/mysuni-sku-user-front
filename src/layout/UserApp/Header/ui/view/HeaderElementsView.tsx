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
import { isExternalInstructor } from '../../../../../shared/helper/findUserRole';
import { PolyglotText } from '../../../../../shared/ui/logic/PolyglotText';

interface LogoViewProps {
  onClickMenu: (menuName: string) => void;
}

export const LogoView: React.FC<LogoViewProps> = ({ onClickMenu }) => {
  const isExternal = isExternalInstructor();

  return (
    <div className="g-logo" data-area={Area.HEADER_LOGO}>
      {isExternal ? (
        <i className="sk-university icon">
          <span className="blind">mySUNI</span>
        </i>
      ) : (
        <Link to="/" onClick={() => onClickMenu('mySUNI')}>
          <i className="sk-university icon">
            <span className="blind">mySUNI</span>
          </i>
        </Link>
      )}
    </div>
  );
};
interface MenuViewProps {
  onClickMenu: (menuName: string) => void;
}

export const MenuView: React.FC<MenuViewProps> = ({ onClickMenu }) => {
  const [menuAuth, setMenuAuth] = useState<PageElement[]>([]);
  const isExternal = isExternalInstructor();

  useEffect(() => {
    //const axios = getAxios();
    const fetchMenu = async () => {
      const response = await findAvailablePageElements();
      setMenuAuth(response);
    };
    fetchMenu();
  }, []);

  return (
    <>
      {menuAuth.some(
        (pagemElement) =>
          pagemElement.position === 'TopMenu' &&
          pagemElement.type === 'Category'
      ) && <CategoryMenuContainer />}
      <div className="g-menu">
        <div className="nav" data-area={Area.HEADER_GNB}>
          {menuAuth.some(
            (pagemElement) =>
              pagemElement.position === 'TopMenu' &&
              pagemElement.type === 'Learning'
          ) &&
            !isExternal && (
              <NavLink
                to={myTrainingPaths.learning()}
                className="item"
                onClick={() => onClickMenu('Learning')}
              >
                <PolyglotText defaultString="Learning" id="home-gnb-mtl" />
              </NavLink>
            )}
          {menuAuth.some(
            (pagemElement) =>
              pagemElement.position === 'TopMenu' &&
              pagemElement.type === 'Recommend'
          ) &&
            !isExternal && (
              <NavLink
                to={lecturePaths.recommend()}
                className="item"
                onClick={() => onClickMenu('Recommend')}
              >
                <PolyglotText defaultString="Recommend" id="home-gnb-mtr" />
              </NavLink>
            )}
          {menuAuth.some(
            (pagemElement) =>
              pagemElement.position === 'TopMenu' &&
              pagemElement.type === 'Create'
          ) &&
            !isExternal && (
              <NavLink
                to={personalCubePaths.create()}
                className="item"
                onClick={() => onClickMenu('Create')}
              >
                <PolyglotText defaultString="Create" id="home-gnb-mtc" />
              </NavLink>
            )}
          {menuAuth.some(
            (pagemElement) =>
              pagemElement.position === 'TopMenu' &&
              pagemElement.type === 'Certification'
          ) &&
            !isExternal && (
              <NavLink
                to={certificationPaths.badge()}
                className="item"
                onClick={() => onClickMenu('Certification')}
              >
                <PolyglotText defaultString="Certification" id="home-gnb-mtf" />
              </NavLink>
            )}
          {menuAuth.some(
            (pagemElement) =>
              pagemElement.position === 'TopMenu' &&
              pagemElement.type === 'Community'
          ) && (
            <Link
              to="#"
              className="item"
              onClick={() =>
                (window.location.href = `${window.location.origin}/suni-community/`)
              }
            >
              <PolyglotText defaultString="Community" id="home-gnb-mtm" />
            </Link>
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
  getPolyglotText: (defaultValue: string, id: string) => string;
}

export const SearchBarView: React.FC<SearchBarViewProps> = ({
  value,
  focused,
  onSearch,
  onChange,
  onBlur,
  onClick,
  onClear,
  getPolyglotText,
}) => (
  <div className="g-search g-ab" data-area={Area.HEADER_SEARCH}>
    <div
      className={classNames('ui h38 search input', {
        focus: focused,
        write: value,
      })}
      style={{ display: 'block' }}
    >
      <input
        type="text"
        placeholder={getPolyglotText('Search', 'home-gnb-검색창t')}
        value={value}
        onChange={onChange}
        onClick={onClick}
        onBlur={onBlur}
        onKeyPress={(e) => e.key === 'Enter' && onSearch()}
      />
      <i aria-hidden="true" className="clear link icon" onClick={onClear} />
      <i aria-hidden="true" className="search link icon" onClick={onSearch} />
    </div>
  </div>
);
