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
import {
  getPolyglotText,
  PolyglotText,
} from '../../../../../shared/ui/logic/PolyglotText';

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
      <div className="g-menu-area">
        <div className="ui nav menu" data-area={Area.HEADER_GNB}>
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
        </div>
      </div>
    </>
  );
};

interface SearchBarViewProps {
  // value: string;
  // focused?: boolean;
  // onSearch: () => void;
  // onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  // onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
  // onBlur?: (e: React.FormEvent<HTMLInputElement>) => void;
  // onClear?: () => void;
}

export const SearchBarView: React.FC<SearchBarViewProps> = (
  {
    // value,
    // focused,
    // onSearch,
    // onChange,
    // onBlur,
    // onClick,
    // onClear,
    // getPolyglotText,
  }
) => (
  <div className="g-search-header" data-area={Area.SEARCH}>
    <div className="search_wrap">
      <input
        type="text"
        placeholder={getPolyglotText('Search', 'home-gnb-검색창t')}
        // value={value}
        // onChange={onChange}
        // onClick={onClick}
        // onBlur={onBlur}
        // onKeyPress={(e) => e.key === 'Enter' && onSearch()}
        className="ui input search_ipt"
      />
    </div>
    <div className="ui button b-search">
      <i
        aria-hidden="true"
        className="icon search-grey"
        //  onClick={onSearch}
      />
    </div>
  </div>
);
