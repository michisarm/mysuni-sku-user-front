import { useEffect } from 'react';
import { findLatestBannerBundles } from '../api/BannerApi';
import { setTopBannerViewModel } from '../store/TopBannerStore';

export function useRequestTopBanner() {
  useEffect(() => {
    requestTopBanner();
  }, []);
}

export async function requestTopBanner() {
  const bannerBundleWithBannerRom = await findLatestBannerBundles(true);
  if (bannerBundleWithBannerRom === undefined) {
    return;
  }
  const banner = bannerBundleWithBannerRom.banners[0];
  if (banner === undefined || banner === null) {
    return;
  }

  setTopBannerViewModel({
    top: bannerBundleWithBannerRom.top,
    // topBgColor: bannerBundleWithBannerRom.topBgColor,
    target: banner.target,
    linkUrl: banner.targetUrl,
    imageUrl: banner.imageUrl,
    imageAlt: banner.imageAlt,
    bdColor: banner.bgColor,
  });
}
