import React, { useCallback, useState } from 'react';
import { useRequestTopBanner } from '../../service/useRequestTopBanner';
import { useTopBannerViewModel } from '../../store/TopBannerStore';
import { TopBannerView } from '../view/TopBannerView';

export function TopBannerContainer() {
  useRequestTopBanner();
  const topBanner = useTopBannerViewModel();
  const [openTopBanner, setOpenTopBanner] = useState<boolean>(true);
  const onClickClose = useCallback(() => {
    setOpenTopBanner(false);
  }, [setOpenTopBanner]);

  const displayTopBanner = topBanner !== undefined && openTopBanner === true;

  return (
    <>
      {topBanner !== undefined && displayTopBanner && (
        <TopBannerView
          target={topBanner.target}
          linkUrl={topBanner.linkUrl}
          imageUrl={topBanner.imageUrl}
          backgroundColor={topBanner.bdColor}
          onClose={onClickClose}
        />
      )}
    </>
  );
}
