import { useState, useEffect, useRef } from 'react'
import { useStateRefType } from './types'

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

export function lsTest(){
  const test = 'test';
  try {
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
  } catch(e) {
      return false;
  }
}

export function getElementsByClassName(node: HTMLElement, classname: string) {
  const a = [];
  const re = new RegExp('(^| )'+classname+'( |$)');
  const els = node.getElementsByTagName("*");
  for(let i=0,j=els.length; i<j; i++){
    if(re.test(els[i].className)){
      a.push(els[i]);
    }
  }
  return a;
}

export function originSelfPath(url: string){
  if(/^(http|https)\:\/\/mysuni.sk.com\/suni-main\//.test(url)){
    url = url.replace(RegExp.$1+'://mysuni.sk.com/suni-main','');
  }else if(/^(http:|https:)\/\/ma.university.sk.com\/suni-main\//.test(url)){
    url = url.replace(RegExp.$1+'://ma.university.sk.com/suni-main','');
  }else if(/^(http:|https:)\/\/muniversity.sk.com\/suni-main\//.test(url)){
    url = url.replace(RegExp.$1+'://university.sk.com/suni-main','');
  }else if(url.includes(window.location.origin)){
    url = url.replace(window.location.origin,'');
  }
  return url;
}