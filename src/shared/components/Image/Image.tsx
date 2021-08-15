import React from 'react';
import { includes } from 'lodash';
import {
  parsePolyglotString,
  PolyglotString,
} from 'shared/viewmodel/PolyglotString';
import { observer } from 'mobx-react';

interface Props extends Record<string, any> {
  src: string | PolyglotString;
}

export default function Image({ src, alt, className }: Props) {
  if (src === null || src === undefined || src === '') {
    return null;
  }

  return <img src={srcParser(src)} alt={alt} className={className} />;
}

export const srcParser = (src: string | PolyglotString) => {
  src = typeof src === 'string' ? src : parsePolyglotString(src);
  // 절대경로 이거나 base64인 경우
  if (
    src === null ||
    src === undefined ||
    includes(src, 'base64') ||
    includes(src, 'http') ||
    includes(src, '/files/') ||
    includes(src, '/static/')
  ) {
    return src;
  } else if (includes(src, '/profile/photo/')) {
    // https://mysuni.sk.com, 멤버 사원 이미지(gdi)
    return `${process.env.REACT_APP_SK_IM_ROOT_URL}${src}`;
  }

  let next = src.startsWith('/') ? src.substring(1) : src;

  if (!next.startsWith('suni-asset')) {
    next = `suni-asset/${next}`;
  }

  if (window.location.host === 'mysuni.sk.com') {
    next = `https://image.mysuni.sk.com/${next}`;
  } else {
    next = `/${next}`;
  }
  // 나머지는 상대경로 그대로 return
  return next;
};
