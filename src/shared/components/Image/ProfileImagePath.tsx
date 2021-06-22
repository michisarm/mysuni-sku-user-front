import React from 'react';
import { includes } from 'lodash';

function ProfileImagePath(src : any) {
  if (src === null || src === undefined || src === '') {
    return null;
  }

  if (
    includes(src, 'base64') ||
    includes(src, 'http') ||
    includes(src, 'profile/photo')
  ) {
    return src;
  }else if (includes(src, '/profile/') &&
      !src.startsWith('suni-asset')
  ) {
    return `/suni-asset/${src}`;
  }

  return `/files/community/${src}`;
}

export default ProfileImagePath;
