import React from 'react';

export function RedirectCommunityPage() {
  window.location.href =
    '/suni-community' + window.location.pathname.replace('/suni-main', '');

  return <></>;
}
