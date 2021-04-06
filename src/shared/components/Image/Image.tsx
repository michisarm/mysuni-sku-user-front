import React from 'react';
import { includes } from 'lodash';

interface Props {
  src: string;
  alt?: string;
  className?: string;
}

function Image({
  src,
  alt,
  className  
}:Props) {

  const srcParser = () => {
    // 절대경로 이거나 base64인 경우
    if(includes(src, "base64") || includes(src, "http://")) {
      return src;
    }
    
    // file 로 시작하지 않고 suni-asset으로 시작하지 않고 
    // host가 mysuni.sk.com 인 경우 
    if(
      src.indexOf("file", 1) === -1 && 
      src.indexOf("suni-asset",1) === -1 &&
      process.env.HOST === "mysuni.sk.com"
      ) {
      return `/suni-asset/${src}`;
    }

    // 나머지는 상대경로 그대로 return
    return src;
  }
  
  return (
    <img src={srcParser()} alt={alt} className={className}/>
  )
}

export default Image;