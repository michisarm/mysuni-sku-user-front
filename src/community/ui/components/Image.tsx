import React from 'react';
import { includes } from 'lodash';

interface Props extends Record<string, any> {
  src: string;
}

export function Image({ src, alt, className }: Props) {
  if (src === null || src === undefined || src === '') {
    return null;
  }

  return <img src={srcParser(src)} alt={alt} className={className} />;
}

export function srcParser(src: string) {
  if (
    src === null ||
    src === undefined ||
    includes(src, 'base64') ||
    includes(src, 'http') ||
    includes(src, '/files/') ||
    includes(src, 'suni-community/')
  ) {
    return src;
  } else if (includes(src, '/profile/photo/')) {
    // https://mysuni.sk.com, 멤버 사원 이미지(gdi)
    return `https://mysuni.sk.com${src}`;
  }

  let next = src.startsWith('/') ? src.substring(1) : src;

  if (next.startsWith('suni-community')) {
    next = next;
  } else if (!next.startsWith('suni-asset')) {
    next = `suni-asset/${next}`;
  }

  if (window.location.host === 'mysuni.sk.com') {
    next = `https://image.mysuni.sk.com/${next}`;
  } else {
    next = `/${next}`;
  }
  // 나머지는 상대경로 그대로 return
  return next;
}
