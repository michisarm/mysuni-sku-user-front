import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

import myTrainingPaths from 'myTraining/routePaths';
import certificationPaths from 'certification/routePaths';
import CategoryMenuContainer from '../logic/CategoryMenuContainer';
import { Area } from 'tracker/model';
import { isExternalInstructor } from '../../../../../shared/helper/findUserRole';
import {
  getPolyglotText,
  PolyglotText,
} from '../../../../../shared/ui/logic/PolyglotText';
import { usePageElements } from '../../../../../shared/store/PageElementsStore';
import {
  setSearchInSearchInfo,
  useSearchInSearchInfo,
} from '../../../../../search/search.services';
import { Checkbox } from 'semantic-ui-react';
import { getQueryId } from '../../../../../search/search.events';
import SearchInfoModel from '../../../../../search/model/SeachInfoModel';
import { observer } from 'mobx-react';

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
  const pageElements = usePageElements();
  const isExternal = isExternalInstructor();

  return (
    <>
      {pageElements.some(
        (pagemElement) =>
          pagemElement.position === 'TopMenu' &&
          pagemElement.type === 'Category'
      ) && <CategoryMenuContainer />}
      <div className="g-menu-area">
        <div className="ui nav menu" data-area={Area.HEADER_GNB}>
          {pageElements.some(
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
          {pageElements.some(
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
  searchInfo: SearchInfoModel;
  setSearchValue: (name: string, value: any) => void;
  // focused?: boolean;
  onSearch: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FormEvent<HTMLInputElement>) => void;
  onClear?: () => void;
  isSearch?: boolean;
}

export const SearchBarView: React.FC<SearchBarViewProps> = observer(
  ({
    value,
    searchInfo,
    setSearchValue,
    // focused,
    onSearch,
    onChange,
    onBlur,
    onClick,
    onClear,
    isSearch,
    // getPolyglotText,
  }) => {
    //
    console.log(searchInfo);

    return (
      <>
        <div className="g-search-header" data-area={Area.SEARCH}>
          <div className={isSearch ? 'search_wrap show_re' : 'search_wrap'}>
            {searchInfo.inAgain ? (
              <div className="re_text">
                <span className="ellipsis">{searchInfo.recentSearchValue}</span>
              </div>
            ) : null}
            <input
              type="text"
              placeholder={getPolyglotText('Search', 'home-gnb-검색창t')}
              value={value}
              onChange={onChange}
              onClick={onClick}
              // onBlur={onBlur}
              onKeyPress={(e) => e.key === 'Enter' && onSearch()}
              className="ui input search_ipt"
            />
          </div>
          <div className="ui button b-search">
            <i
              aria-hidden="true"
              className="icon search-grey"
              onClick={onSearch}
            />
          </div>
        </div>
        {isSearch ? (
          <Checkbox
            className="again_chk on"
            label={getPolyglotText('결과 내 재검색', '통검-필레팝-재검색')}
            checked={searchInfo.inAgain}
            onClick={() => {
              if (!searchInfo?.inAgain) {
                setSearchValue('searchValue', '');
              }
              // setSearchValue('searchValue', value);
              // setSearchValue('recentSearchValue', queryId);
              setSearchValue('inAgain', !searchInfo.inAgain);
              // setSearchInSearchInfo({
              //   checkSearchInSearch: !searchInSearchInfo?.checkSearchInSearch,
              //   parentSearchValue: queryId,
              //   searchValue: value,
              // });
            }}
          />
        ) : null}
      </>
    );
  }
);

export const LearningMenuView: React.FC<MenuViewProps> =
  function LearningMenuView({ onClickMenu }) {
    const pageElements = usePageElements();
    const isExternal = isExternalInstructor();

    return (
      <>
        {pageElements.some(
          (pagemElement) =>
            pagemElement.position === 'TopMenu' &&
            pagemElement.type === 'Learning'
        ) &&
          !isExternal && (
            <div className="g-learn">
              <NavLink
                to={myTrainingPaths.learning()}
                className="go-learn"
                onClick={() => onClickMenu('Learning')}
              >
                <PolyglotText defaultString="My Learning" id="home-gnb-mtl" />
              </NavLink>
            </div>
          )}
      </>
    );
  };
