import React from 'react';
import { includes } from 'lodash';

interface Props extends Record<string, any> {
  src: string;
}

function Image({ src, alt, className }: Props) {
  const srcParser = () => {
    // 절대경로 이거나 base64인 경우
    if (
      src === null ||
      src === undefined ||
      includes(src, 'base64') ||
      includes(src, 'http://')
    ) {
      return src;
    }

    let next = src.startsWith('/') ? src.substring(1) : src;

    if (!next.startsWith('suni-asset')) {
      next = `suni-asset/${next}`;
    }

    if (window.location.host === 'mysuni.sk.com') {
      next = `http://image.mysuni.sk.com/${next}`;
    } else {
      next = `/${next}`;
    }
    // 나머지는 상대경로 그대로 return
    return next;
  };

  if (src === null || src === undefined || src === '') {
    return null;
  }

  return <img src={srcParser()} alt={alt} className={className} />;
}

export default Image;
