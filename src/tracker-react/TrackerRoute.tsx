import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import {
  debounce,
  useStateRef,
  useBrowserString,
  closest,
  getErrorMessage,
} from './utils';
import { DATA_TYPES } from './constants';
import { TrackerProviderProps, TrackerParams, PathParams } from './types';
import { Action, ActionType, ActionLogType } from 'tracker/model/ActionType';
import {
  ActionTrackParam,
  ActionTrackViewParam,
  ActionLog,
} from 'tracker/model/ActionTrackModel';
import { pvInitSave, logger } from 'tracker/present/logic/ActionTrackService';

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
    try {
      logger({
        type: ActionLogType.PV_LOG,
        email: userId,
        browser: browserString,
        message: 'PV_INIT',
      } as ActionLog);

      initTrackView();
    } catch (e) {
      logger({
        type: ActionLogType.ERROR_PV_VIEW_INIT,
        email: userId,
        browser: browserString,
        message: getErrorMessage(e),
      } as ActionLog);
    }

    // click event
    window.document.addEventListener('click', handleOutboundClick, {
      capture: true,
    });
    return () => {
      logger({
        type: ActionLogType.PV_LOG,
        email: userId,
        browser: browserString,
        message: 'PV_INIT_END',
      } as ActionLog);
      window.document.removeEventListener('click', handleOutboundClick, {
        capture: true,
      });
    };
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
    return history.listen((location) => {
      const { key } = location;
      // ???????????? ??????????????? ??????
      let historyAction = null;
      if (history.action === 'PUSH') {
        if (key) setLocationKeys([key]);
      }
      if (history.action === 'POP') {
        if (locationKeys[1] === key) {
          setLocationKeys(([_, ...keys]) => keys);
          historyAction = 'FORWARD';
        } else {
          setLocationKeys((keys) => [key, ...keys]);
          historyAction = 'BACK';
        }
      }
      // search history push??? event target ??????
      if (
        location.pathname.includes('/search') &&
        valueRef.current.target === undefined
      ) {
        const area = 'SEARCH';
        const areaElement = document.createElement('div');
        areaElement.setAttribute('data-area', area);
        valueRef.current.target = areaElement;
        valueRef.current.area = area;
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

    //?????? ????????? ????????????[ _source, _area, _areaId ]??? ????????? ?????? replace ??????
    const queryParams = new URLSearchParams(window.location.search);
    let isReplace = false;
    if (queryParams.has('_area')) {
      // area ?????? ?????? - ????????? white list ?????? ??????
      // const areaList: string[] | null = Object.values(Area);
      // if (areaList.includes(queryParams.get('_area')?.toUpperCase() || '')) {
      area = queryParams.get('_area');
      queryParams.delete('_area');
      isReplace = true;
      // }
    }
    // _source=?????????::?????????::?????????::?????????,_area::??????
    if (queryParams.has('_source')) {
      // source ?????? ?????? - ????????? white list ?????? ??????
      // const sourceList: string[] | null = Object.values(Source);
      // if ( sourceList.includes(queryParams.get('_source')?.toUpperCase() || '')) {
      const source = queryParams.get('_source');
      const sources = source?.split(',');
      if (sources) {
        areaId = sources[0];
        const type = areaId?.split('::')[0];
        areaType = type ? type : areaId;
        // source??? _area ????????? ??????
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

    // parameter ??????
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
    // click ????????? url
    data.referer = window.location.pathname;
    data.refererSearch = window.location.search;

    // AREA data attribute ???????????? ??????!
    const areaElement =
      'closest' in document.documentElement
        ? (target as Element).closest(DATA_TYPES.AREA)
        : closest(target, DATA_TYPES.AREA);

    if (areaElement instanceof HTMLElement) {
      data.target = areaElement;
      data.area = areaElement.dataset.area;
    }

    // target=_blank, <a> ????????? ??????
    if (target && data.area) {
      pvInitSave(target, data.area, data.referer, data.refererSearch);
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
        // track click, click?????? ????????? ???????????? ??????
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
        // router??? ????????? ?????? page??? view event ?????? , ex) layer popup view event ??? ??????
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

  // route debounce ?????? ??? view track
  const debounceHistory = useCallback(
    debounce((path: PathParams) => {
      // AREA data attribute ???????????? ??????!
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
  return <div style={{ display: 'none' }}>pv</div>;
};

export default TrackerRoute;
