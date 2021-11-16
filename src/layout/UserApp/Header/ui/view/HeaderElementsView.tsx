import React, {
  createRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
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
import { Button, Checkbox, Icon } from 'semantic-ui-react';
import SearchInfoModel from '../../../../../search/model/SeachInfoModel';
import { observer } from 'mobx-react';
import _ from 'lodash';
import { debounce } from '../../../../../tracker-react/utils';

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
            <NavLink
              to="/community"
              className="item"
              onClick={() => onClickMenu('community')}
            >
              <PolyglotText defaultString="Community" id="home-gnb-mtm" />
            </NavLink>
          )}
        </div>
      </div>
    </>
  );
};

interface SearchBarViewProps {
  searchInfo: SearchInfoModel;
  setSearchValue: (name: string, value: any) => void;
  // focused?: boolean;
  onSearch: () => void;
  onChange: (value: string) => void;
  findAutoCompleteValues: (value: string) => void;
  onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FormEvent<HTMLInputElement>) => void;
  onClear?: () => void;
  isSearch?: boolean;
  closeSearch?: () => void;
}

export const SearchBarView: React.FC<SearchBarViewProps> = observer(
  ({
    searchInfo,
    setSearchValue,
    // focused,
    onSearch,
    findAutoCompleteValues,
    onChange,
    onBlur,
    onClick,
    onClear,
    isSearch,
    // getPolyglotText,
    closeSearch,
  }) => {
    //
    const inputRef = createRef<HTMLInputElement>();

    const delayedChangeEvent = useRef(
      _.debounce((q) => findAutoCompleteValues(q), 500)
    ).current;

    const delayedOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange(event.target.value);
      delayedChangeEvent(event.target.value);
    };

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
              ref={inputRef}
              placeholder={getPolyglotText(
                '무엇을 배우고 싶으신가요?.',
                'gnb-search-placeholder'
              )}
              value={searchInfo.searchValue}
              onChange={(e) => delayedOnChange(e)}
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
                setSearchValue('recentSearchValue', searchInfo.searchValue);
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
        <Button className="b-cl" icon onClick={closeSearch}>
          <Icon className="b-cl" />
        </Button>
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
                <PolyglotText defaultString="My Learning" id="gnb-mylearning" />
              </NavLink>
            </div>
          )}
      </>
    );
  };
