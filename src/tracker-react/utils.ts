import { useState, useEffect, useRef } from 'react';
import { useStateRefType, ErrorWithMessage } from './types';

export const debounce = (fn: Function, ms = 300) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};

export function useStateRef<T>(initialValue: T): useStateRefType<T> {
  const [value, setValue] = useState<T>(initialValue);
  const valueRef = useRef<T>(initialValue);

  useEffect(() => {
    valueRef.current = value;
    setValue(value);
  }, [value]);

  return { valueRef };
}

export const getBrowser = () => {
  let ua;
  let result = { brand: '', version: '' };
  // Chromium 기반 최신 브라우져 UA 프리징 대비
  if ((window.navigator as any).userAgentData) {
    ua = (window.navigator as any).userAgentData.brands.filter(
      (a: { brand: string }) =>
        /Google Chrome|Microsoft Edge|Whale/.test(a.brand)
    )[0];
    if (ua) {
      let brand;
      if (ua.brand === 'Google Chrome') {
        brand = 'Chrome';
      } else if (ua.brand === 'Microsoft Edge') {
        brand = 'Edge';
      } else {
        brand = ua.brand;
      }
      result = { brand, version: ua.version };
    } else {
      result = { brand: 'N/A', version: 'N/A' };
    }
  } else {
    ua = navigator.userAgent;
    let tem;
    let M =
      ua.match(
        /(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i
      ) || [];
    if (/trident/i.test(M[1])) {
      tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
      result = {
        brand: 'MSIE',
        version: tem[1] || '',
      };
    } else if (M[1] === 'Chrome') {
      tem = ua.match(/\bOPR|Edge\/(\d+)/);
      if (tem != null) {
        result = {
          brand: 'Opera',
          version: tem[1],
        };
      }
    } else {
      M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
      if ((tem = ua.match(/version\/(\d+)/i)) != null) {
        M.splice(1, 1, tem[1]);
      }
      result = {
        brand: M[0],
        version: M[1],
      };
    }
  }
  return result;
};

export const getBrowserString = () => {
  const browser = getBrowser();
  return Object.values(browser).join('::');
};

export const useBrowserString = () => {
  return getBrowserString();
};

export function lsTest() {
  const test = 'test';
  try {
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
}

export function getElementsByClassName(node: HTMLElement, classname: string) {
  const a = [];
  const re = new RegExp('(^| )' + classname + '( |$)');
  const els = node.getElementsByTagName('*');
  for (let i = 0, j = els.length; i < j; i++) {
    if (re.test(els[i].className)) {
      a.push(els[i]);
    }
  }
  return a;
}

export function originSelfPath(url: string) {
  if (/^(http|https)\:\/\/mysuni.sk.com\/suni-main\//.test(url)) {
    url = url.replace(RegExp.$1 + '://mysuni.sk.com/suni-main', '');
  } else if (/^(http:|https:)\/\/ma.mysuni.sk.com\/suni-main\//.test(url)) {
    url = url.replace(RegExp.$1 + '://ma.mysuni.sk.com/suni-main', '');
  } else if (/^(http:|https:)\/\/stg.mysuni.sk.com\/suni-main\//.test(url)) {
    url = url.replace(RegExp.$1 + '://stg.mysuni.sk.com/suni-main', '');
  } else if (url.includes(window.location.origin)) {
    url = url.replace(window.location.origin, '');
  }
  return url;
}

export function parsingPath(url: string) {
  // 절대 주소 반환
  if (/^(http|https)/.test(url)) {
    return url;
  }

  // 상대 주소 비교
  if (
    /^\/suni-community/.test(url) ||
    /^\/suni-instructor/.test(url) ||
    /^\/suni-main/.test(url) ||
    /^\/suni-asset/.test(url)
  ) {
    return url;
  } else {
    return '/suni-main' + url;
  }
}

export function utf8_to_b64(str: string) {
  return window.btoa(unescape(encodeURIComponent(str)));
}

export function b64_to_utf8(str: string) {
  return decodeURIComponent(escape(window.atob(str)));
}

export function closest(el: any, selector: string) {
  const matchesSelector =
    el.matches ||
    el.webkitMatchesSelector ||
    el.mozMatchesSelector ||
    el.msMatchesSelector;

  while (el) {
    if (matchesSelector.call(el, selector)) {
      break;
    }
    el = el.parentElement;
  }
  return el;
}

export const findLinkElement = (el: EventTarget | null): HTMLElement | null => {
  if (el instanceof HTMLAnchorElement && el.href) {
    return el;
  }
  if (el instanceof HTMLElement && el.parentElement) {
    return findLinkElement(el.parentElement);
  }
  return null;
};

function toErrorWithMessage(maybeError: unknown): ErrorWithMessage {
  if (isErrorWithMessage(maybeError)) return maybeError;

  try {
    return new Error(JSON.stringify(maybeError));
  } catch {
    return new Error(String(maybeError));
  }
}

function isErrorWithMessage(error: unknown): error is ErrorWithMessage {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof (error as Record<string, unknown>).message === 'string'
  );
}

export function getErrorMessage(error: unknown) {
  return toErrorWithMessage(error).message;
}
