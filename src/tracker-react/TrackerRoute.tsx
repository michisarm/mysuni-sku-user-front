import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import $ from 'jquery';
import { debounce, useStateRef, useBrowserString } from './utils';
import { DATA_TYPES } from './constants';
import { TrackerProviderProps, TrackerParams, PathParams } from './types';
import { Action, ActionType } from 'tracker/model/ActionType';
import {
  ActionTrackParam,
  ActionTrackViewParam,
} from 'tracker/model/ActionTrackModel';

const TrackerRoute: React.FC<TrackerProviderProps> = ({ value }) => {
  /**
   * const TrackerRoute: React.FC<TrackerProviderProps> = ({ children, value }) => {
   * const TrackerContext = createContext<any>(null);
   */
  const history = useHistory();
  const browserString = useBrowserString();
  const [locationKeys, setLocationKeys] = useState<(string | undefined)[]>([]);

  const { valueRef } = useStateRef<TrackerParams>({});
  const { userId, trackAction, trackView } = value;

  useEffect(() => {
    // view log init
    initTrackView();

    // click event
    window.document.addEventListener('click', handleOutboundClick, {
      capture: true,
    });
    return () =>
      window.document.removeEventListener('click', handleOutboundClick, {
        capture: true,
      });
  }, []);

  /**
   * const setPathArray = useCallback(
    (path: string) => {
      const maxNumber = 5;
      const arrLength = locationPaths.length;
      setLocationPaths(paths => [path, ...paths]);
      if (arrLength > maxNumber) {
        setLocationPaths(locationPaths.splice(0, arrLength - maxNumber));
      }
    },
    [locationPaths]
  );
   */

  useEffect(() => {
    return history.listen(location => {
      const { key } = location;
      // 뒤로가기 앞으로가기 구분
      let historyAction = null;
      if (history.action === 'PUSH') {
        if (key) setLocationKeys([key]);
      }
      if (history.action === 'POP') {
        if (locationKeys[1] === key) {
          setLocationKeys(([_, ...keys]) => keys);
          historyAction = 'FORWARD';
        } else {
          setLocationKeys(keys => [key, ...keys]);
          historyAction = 'BACK';
        }
      }

      debounceHistory({
        path:
          process.env.PUBLIC_URL === '/suni-main' &&
          !/^\/suni-main/.test(location.pathname)
            ? process.env.PUBLIC_URL + location.pathname
            : location.pathname,
        search: location.search,
        data: valueRef.current,
        action: history.action,
        historyAction,
      });
    });
  }, [locationKeys, history]);

  const initTrackView = () => {
    let areaType: string | null = '';
    let area: string | null = 'INIT';
    let areaId: string | null = '';

    //외부 유입시 파라미터[ _source, _area, _areaId ]로 정보를 얻고 replace 처리
    const queryParams = new URLSearchParams(window.location.search);
    let isReplace = false;
    if (queryParams.has('_area')) {
      // area 모두 허용 - 필요시 white list 방식 처리
      // const areaList: string[] | null = Object.values(Area);
      // if (areaList.includes(queryParams.get('_area')?.toUpperCase() || '')) {
      area = queryParams.get('_area');
      queryParams.delete('_area');
      isReplace = true;
      // }
    }
    // _source=대분류::중분류::소분류::생성일,_area::영역
    if (queryParams.has('_source')) {
      // source 모두 허용 - 필요시 white list 방식 처리
      // const sourceList: string[] | null = Object.values(Source);
      // if ( sourceList.includes(queryParams.get('_source')?.toUpperCase() || '')) {
      const source = queryParams.get('_source');
      const sources = source?.split(',');
      if (sources) {
        areaId = sources[0];
        const type = areaId?.split('::')[0];
        areaType = type ? type : areaId;
        // source에 _area 있을시 적용
        if (sources?.length > 1) {
          if (/\_area\:\:(.*)/.test(sources[1])) {
            area = RegExp.$1;
          }
        }
      }
      queryParams.delete('_source');
      isReplace = true;
      // }
    }

    // parameter 제거
    if (isReplace) {
      history.replace({
        search: queryParams.toString(),
      });
    }

    trackView({
      email: userId,
      path: window.location.pathname,
      search: window.location.search,
      browser: browserString,
      areaType,
      area,
      areaId,
      init: true,
    } as ActionTrackViewParam);
  };

  const handleOutboundClick = (event: MouseEvent) => {
    const { target } = event;
    const data: TrackerParams = {};
    // click 시점의 url
    data.referer = window.location.pathname;
    data.refererSearch = window.location.search;

    // AREA data attribute 있을때만 수집!
    const areaElement =
      'closest' in document.documentElement
        ? (target as Element).closest(DATA_TYPES.AREA)
        : $(target as Element).closest(DATA_TYPES.AREA)[0];

    if (areaElement instanceof HTMLElement) {
      data.target = areaElement;
      data.area = areaElement.dataset.area;
    }
    valueRef.current = data;

    if (areaElement instanceof HTMLElement) {
      const action = areaElement.dataset.action;
      const actionName = areaElement.dataset.actionName;
      const actionType = areaElement.dataset.actionType;
      const externalLink = areaElement.dataset.actionExternalLink;
      if (!(action && actionName)) {
        return;
      }
      if (action === Action.CLICK) {
        // track click, click으로 정의된 이벤트만 수집
        trackAction({
          email: userId,
          browser: browserString,
          path: data.referer,
          search: data.refererSearch,
          area: data.area,
          actionType: actionType ? actionType : ActionType.GENERAL,
          externalLink,
          action,
          actionName,
          target: data.target,
        } as ActionTrackParam);
      } else if (action === Action.VIEW) {
        // router에 잡히지 않는 page의 view event 수집 , ex) layer popup view event 로 수집
        const page = areaElement.dataset.page;
        const pathName = areaElement.dataset.pathname;
        if (!page || !pathName) {
          return false;
        }
        trackView({
          email: userId,
          path: data.referer + page,
          pathName,
          search: data.refererSearch,
          referer: data.referer,
          refererSearch: data.refererSearch,
          browser: browserString,
          area: data.area,
          target: data.target,
        } as ActionTrackViewParam);
      }
    }
  };

  // route debounce 처리 후 view track
  const debounceHistory = useCallback(
    debounce((path: PathParams) => {
      // AREA data attribute 있을때만 수집!
      if (path.data?.target instanceof HTMLElement) {
        const referer = path.data?.referer;
        let area = path.data?.area;
        if (path.action === 'POP') {
          area = 'HISTORY_' + path.historyAction;
          valueRef.current.referer = '';
        }
        trackView({
          email: userId,
          path: path.path,
          search: path.search,
          referer,
          refererSearch: path.data?.refererSearch,
          browser: browserString,
          area,
          target: path.data?.target,
        } as ActionTrackViewParam);
      }
    }, 1000),
    []
  );

  /**
   * return (
   *  <TrackerContext.Provider value={value}>{children}</TrackerContext.Provider>
   * );
   */
  return null;
};

export default TrackerRoute;
