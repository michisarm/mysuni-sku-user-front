import React, { useEffect } from 'react';
import {
  requestFieldList,
  requestOpenCommunityList,
} from '../../service/useOpenCommunityIntro/utility/requestOpenCommunityIntro';
import OpenCommunityView from '../view/OpenCommunityView';

function OpenCommunityPage() {
  useEffect(() => {
    requestFieldList();
    requestOpenCommunityList();
  }, []);
  return <OpenCommunityView />;
}

export default OpenCommunityPage;
