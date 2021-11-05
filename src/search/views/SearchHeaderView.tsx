import React, { useEffect, useState } from 'react';
import { Menu } from 'semantic-ui-react';
import { useParams } from 'react-router-dom';
import { SearchParam } from '../search.models';
import { getQueryId } from '../search.events';
import { getCurrentHistory } from '../../shared/store/HistoryStore';
import {
  getMenuAuth,
  setMenuAuth,
  setSearchInSearchInfo,
  useSearchInSearchInfo,
  useSearchRelatedList,
} from '../search.services';
import { PolyglotText } from '../../shared/ui/logic/PolyglotText';
import findAvailablePageElements from 'lecture/shared/api/arrangeApi';
import { Area } from 'tracker/model';

export function SearchHeaderView() {
  const [activeItem, setActiveItem] = useState<string>('');
  const [write, setWrite] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const queryId = getQueryId();
  const searchInSearchInfo = useSearchInSearchInfo();

  const handleMenuClick = (e: any, { name }: any) => {
    //search(queryId, name === 'all' ? undefined : name);
    const history = getCurrentHistory();
    if (name === 'all') {
      history?.push(`/search?query=${queryId}`);
    } else {
      history?.push(`/search/${name}?query=${queryId}`);
    }
  };

  const params = useParams<SearchParam>();
  useEffect(() => {
    if (params !== undefined && params.searchType !== undefined) {
      setActiveItem(params.searchType);
    } else {
      setActiveItem('all');
    }
    handleClose();

    if (searchInSearchInfo?.checkSearchInSearch) {
      setWrite(searchInSearchInfo.searchValue);
    } else {
      setWrite(getQueryId());
    }
  }, [params]);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const handleClose = () => {
    setIsOpen(false);
  };
  const searchSetting = (searchValue?: string) => {
    if (searchValue !== undefined) {
      setWrite(searchValue);
      setSearchInSearchInfo({
        checkSearchInSearch: searchInSearchInfo?.checkSearchInSearch || false,
        parentSearchValue: queryId,
        searchValue,
      });
    }
    handleClose();
  };

  //const isExternal = isExternalInstructor();

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
      {/*<div className="top_search_area" data-area={Area.SEARCH}></div>*/}

      <div className="tab_search_inner">
        <Menu className="tab_search_title">
          <Menu.Item
            name="all"
            active={activeItem === 'all'}
            onClick={handleMenuClick}
          >
            <PolyglotText id="cmm-cfl-전체" defaultString="전체" />
          </Menu.Item>
          <Menu.Item
            name="lecture"
            active={activeItem === 'lecture'}
            onClick={handleMenuClick}
          >
            <PolyglotText id="통검-요약정보-과정탭" defaultString="과정" />
          </Menu.Item>
          <Menu.Item
            name="badge"
            active={activeItem === 'badge'}
            onClick={handleMenuClick}
          >
            <PolyglotText id="통검-필레팝-뱃지" defaultString="Badge" />
          </Menu.Item>
          {getMenuAuth()?.some(
            (pagemElement) =>
              pagemElement.position === 'TopMenu' &&
              pagemElement.type === 'Community'
          ) && (
            <Menu.Item
              name="community"
              active={activeItem === 'community'}
              onClick={handleMenuClick}
            >
              <PolyglotText id="cmm-prfr-커뮤" defaultString="Community" />
            </Menu.Item>
          )}
          <Menu.Item
            name="instructor"
            active={activeItem === 'instructor'}
            onClick={handleMenuClick}
          >
            <PolyglotText id="통검-전학강-강사" defaultString="강사" />
          </Menu.Item>
        </Menu>
      </div>
    </>
  );
}
